# Comprobación diaria de acurruco.com en vivo: cada producto mostrado lleva a una ficha que existe,
# no hay enlaces a buscadores, y lo básico de SEO/IA (robots, sitemap, llms.txt, JSON-LD de producto) responde.
# Uso: python scripts/daily-check.py  → imprime un informe corto y sale con código 1 si hay fallos.
import re, sys, json, urllib.request, urllib.error, random, html

SITE = "https://acurruco.com"
UA = "Mozilla/5.0 (compatible; acurruco-check/1.0)"
fails, notes = [], []

def get(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)

# 1. Básicos
for path, must in [("/", "<h1"), ("/robots.txt", "Sitemap:"), ("/llms.txt", "# Acurruco"), ("/sitemap-index.xml", "<sitemapindex")]:
    st, body = get(SITE + path)
    if st != 200 or must not in body: fails.append(f"{path} → {st} o sin contenido esperado")
st, body = get(SITE + "/esto-no-existe-" + str(random.randint(1000, 9999)) + "/")
if st != 404: fails.append(f"una URL inexistente devuelve {st} en vez de 404")

# 2. Enlaces a fichas en las páginas que muestran productos
pages = ["/", "/comparativas/sillas-de-coche-i-size/", "/comparativas/cunas-de-colecho/", "/comparativas/panales/", "/comparativas/cremas-de-panal/",
         "/regalos/recien-nacido/", "/regalos/3-6-meses/", "/regalos/6-12-meses/", "/regalos/1-ano/", "/regalos/navidad/",
         "/guias/que-necesita-un-recien-nacido/", "/guias/bolsa-del-hospital/", "/guias/elegir-carrito/", "/guias/juguetes-sensoriales/", "/guias/juguetes-montessori/",
         "/herramientas/", "/lista-de-nacimiento/", "/herramientas/presupuesto-primer-ano/", "/herramientas/cuanto-biberon/", "/herramientas/que-silla-de-coche/", "/herramientas/que-saco-tog/",
         "/herramientas/semana-de-embarazo/", "/herramientas/percentiles/", "/herramientas/ventanas-de-sueno/", "/herramientas/talla-de-panal-y-ropa/", "/herramientas/calendario-de-vacunas/", "/herramientas/calculadora-de-panales/"]
fichas = set(); searches = 0
for p in pages:
    st, body = get(SITE + p)
    if st != 200: fails.append(f"{p} → {st}"); continue
    if "amazon.es/s?k" in body: searches += 1; fails.append(f"{p} enlaza a un buscador de Amazon")
    fichas.update(re.findall(r'href="(/p/(?:a/)?[A-Za-z0-9]+/)"', body))
    # celdas de tabla sin imagen o sin botón
    for cell in re.findall(r'<td class="cmp__img"[^>]*>(.*?)</td>', body, re.S):
        if "<img" not in cell: fails.append(f"{p}: fila de tabla sin imagen")
    for cell in re.findall(r'<td class="cmp__where"[^>]*>(.*?)</td>', body, re.S):
        if "<a" not in cell: fails.append(f"{p}: fila de tabla sin enlace a ficha")
notes.append(f"{len(fichas)} fichas enlazadas desde {len(pages)} páginas; buscadores: {searches}")
ok = 0
for f in sorted(fichas):
    st, body = get(SITE + f)
    if st != 200: fails.append(f"ficha {f} → {st}"); continue
    if "/p/a/" not in f and '"@type":"Product"' not in body.replace(" ", ""): fails.append(f"ficha {f} sin JSON-LD Product")
    if 'rel="sponsored' not in body: fails.append(f"ficha {f} sin enlace de compra")
    ok += 1
notes.append(f"{ok} fichas responden y tienen enlace de compra")

# 3. Muestra del catálogo: 40 fichas al azar del sitemap deben responder 200
st, sm = get(SITE + "/sitemap-0.xml")
urls = re.findall(r"<loc>(https://acurruco\.com/p/\d+/)</loc>", sm)
sample = random.sample(urls, min(40, len(urls))) if urls else []
bad = [u for u in sample if get(u)[0] != 200]
notes.append(f"catálogo en sitemap: {len(urls)} fichas; muestra de {len(sample)}: {len(bad)} fallan")
fails += [f"ficha de catálogo {u} no responde" for u in bad]

print("INFORME acurruco.com")
for n in notes: print(" ·", n)
if fails:
    print(f"FALLOS ({len(fails)}):")
    for f in fails[:40]: print(" ✗", f)
    sys.exit(1)
print("Sin fallos.")
