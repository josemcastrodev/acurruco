"""Construye el catálogo de Acurruco a partir de los feeds de Carrefour (Awin), con limpieza.

Uso:  python -I scripts/build-catalog.py <carpeta con feed_*.csv>
Escribe src/data/catalog/<categoria>.json, src/data/catalog/index.json y public/data/catalogo/*.json,
y descarga las imágenes que Carrefour no deja enlazar (static.carrefour.es) a public/img/catalog/.

La categoría de Carrefour sólo orienta: cada producto entra por su nombre (lo que debe decir y lo que no),
y la marca se normaliza. Preferimos menos productos y que tengan sentido.
"""
import csv, json, os, re, sys, subprocess, concurrent.futures as cf

csv.field_size_limit(10**9)
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FEEDS = sys.argv[1]
OUT = os.path.join(ROOT, "src", "data", "catalog")
PUB = os.path.join(ROOT, "public", "data", "catalogo")
IMG = os.path.join(ROOT, "public", "img", "catalog")
for d in (OUT, PUB, IMG): os.makedirs(d, exist_ok=True)

R = lambda s: re.compile(s, re.I)
# Lo que no es un producto de bebé aunque Carrefour lo meta en Bebé y Mamá
# Vendedores de marketplace y productos que no son para bebés (peluches tipo Labubu, reborn, coches eléctricos, merchandising).
BAD_BRANDS = {s.lower() for s in ["Gog Store", "Red String", "Ocio Stock", "B.active", "Sluban", "Byox", "Mochtoys", "Leantoys", "Muñecas Antonio Juan", "Arias", "Muñecas Arias", "Liangjun Trading", "Pangivo", "Northio", "Qiyun Elec"]}
BASURA = R(r"labub|bubble ?mart|burbuja mart|pop ?mart|mu[ñn]eco de burbujas|reborn|r/c|rc|radiocontrol|bater[ií]a para|kart|coche el[eé]ctrico|trampol[ií]n|casita de jard[ií]n|harry potter|pusheen|loungefly|caja ciega|douyin|labubu|funko|figura coleccionable|coleccionable|vino|cerveza|whisky|ginebra|ron |licor|perro|gato|mascota|reptil|terrario|smartwatch|tablet|switch|playstation|xbox|tel[eé]fono|m[oó]vil samsung|iphone|portátil|impresora|bicicleta de adulto|patinete el[eé]ctrico|disfraz adulto|sex|er[oó]tic")

# taxonomía: slug → (título, grupo, patrones de la ruta de Carrefour, lo que debe decir el nombre, lo que no debe decir)
TAXO = [
    ("sillas-de-coche", "Sillas de coche", "coche", ["Sillas de coche > Sillas de Coche"], R(r"silla|i-?size|isofix|portabeb|grupo ?[0123]|elevador|alzador|asiento"), R(r"carrito|cochecito|trio|cesta|basket|organizador|contenedor de pa|sombrilla|espiral|funda|protector|espejo|parasol|cubre|cojín|cojin|reductor|juguete|saco|torre|taburete|^base |base isofix|base con isofix")),
    ("accesorios-coche", "Accesorios para el coche", "coche", ["Sillas de coche > Accesorios", "Sillas de coche > Sillas de Coche"], R(r"funda|protector|espejo|parasol|cubre|organizador|bolsa|base isofix|reductor|cojín|cojin"), R(r"^silla|i-?size.*silla")),
    ("carritos", "Carritos de bebé", "paseo", ["Carritos de beb", "Sillas de coche > Sillas de Coche"], R(r"carrito|cochecito|trio|tr[ií]o|d[uú]o|3 en 1|2 en 1|capazo|gemelar|sistema de viaje"), R(r"juguete|muñec|mu.eca|funda|saco|bolso|organizador|cubre|protector|mosquitera|sombrilla|adaptador|reposapi|patín|patin|plataforma|cesta|cadena|arco|móvil|movil")),
    ("sillas-de-paseo", "Sillas de paseo", "paseo", ["Sillas de paseo"], R(r"silla|buggy|paseo|ligera|compacta|plegable"), R(r"juguete|muñec|mu.eca|funda|saco|bolso|organizador|cubre|protector|mosquitera|sombrilla|adaptador|reposapi|patín|patin|plataforma|cesta|cadena|arco|coche|auto|i-?size")),
    ("accesorios-paseo", "Accesorios de paseo", "paseo", ["Accesorios de Paseo", "Carritos de beb", "Sillas de paseo"], R(r"saco|funda|bolso|bolsa|organizador|cubre|protector|mosquitera|sombrilla|adaptador|reposapi|patín|patin|plataforma|cesta|manoplas|burbuja|cambiador|ganchos|gancho|portavasos"), R(r"maleta|trolley|mochila escolar|equipaje|neceser de viaje")),
    ("portabebes", "Portabebés y mochilas", "paseo", ["Mochilas Portabeb"], R(r"portabeb|mochila|fular|bandolera|mei ?tai|onbuhimo"), R(r"escolar|trolley|maleta")),
    ("cunas", "Cunas y minicunas", "dormir", ["del bebé > Cunas", "del beb? > Cunas"], R(r"cuna|minicuna|colecho|mois[eé]s|moises|capazo|nido"), R(r"peluche|m[oó]vil|proyector|l[aá]mpara|s[aá]bana|sabana|colch[oó]n|protector|barrera|mosquitera|juguete|edred|chichonera|funda|doudou|manta|saco|vinilo|cojín|cojin|cambiador|cesta|organizador|carrusel")),
    ("colchones", "Colchones y almohadas", "dormir", ["Colchones y Almohadas", "del bebé > Cunas", "del beb? > Cunas"], R(r"colch[oó]n|colchon|almohada|cojín antivuelco|protector de colch|cubrecolch|topper"), R(r"juguete|peluche|cuna de viaje")),
    ("ropa-de-cuna", "Ropa de cuna", "dormir", ["Ropa de cuna", "del bebé > Cunas", "del beb? > Cunas"], R(r"s[aá]bana|sabana|edred|n[oó]rdico|nordico|saco de dormir|arrullo|muselina|manta|chichonera|funda n[oó]rdica|juego de cama|colcha"), R(r"juguete|peluche|cesta")),
    ("muebles", "Muebles y decoración", "dormir", ["Muebles Auxiliares"], R(r"c[oó]moda|comoda|estanter|armario|cambiador|mueble|mesa|silla|escritorio|cajonera|l[aá]mpara|lampara|vinilo|alfombra|papel pintado|perchero|cesta|organizador|luz nocturna|quitamiedos|decoraci"), R(r"peluche|juguete|cuna de viaje")),
    ("hamacas-y-parques", "Hamacas y parques", "casa", ["Hamacas y parques"], R(r"hamaca|balanc[ií]n|balancin|columpio|parque|mecedora|bouncer|saltador|centro de actividades"), R(r"peluche|juguete de|puzzle|bloques|sonajero")),
    ("tronas", "Tronas", "comer", ["> Tronas"], R(r"trona|asiento elevador|silla de comer|silla evolutiva|elevador de silla"), R(r"peluche|juguete|cojín|cojin|funda")),
    ("andadores", "Andadores y correpasillos", "casa", ["Andadores"], R(r"andador|correpasillos|tacat[aá]|tacata|primeros pasos|triciclo|balance"), R(r"peluche|puzzle")),
    ("seguridad", "Seguridad en casa", "casa", ["Seguridad infantil"], R(r"barrera|protector|cierre|bloqueo|seguridad|enchufe|esquinera|puerta|escalera|cinta|red|arn[eé]s|anticaída|valla|tope"), R(r"vigilabeb|c[aá]mara|peluche|juguete|silla de coche|carrito")),
    ("vigilabebes", "Vigilabebés", "casa", ["Seguridad infantil", "Accesorios de Paseo", "Habitaci"], R(r"vigilabeb|intercomunicador|monitor de beb|baby monitor|cámara para beb|camara para beb"), R(r"peluche")),
    ("juguetes", "Juguetes para bebés", "jugar", ["Juguetes para beb"], R(r"."), R(r"labubu|figura|coleccion|lego|playmobil|nerf|videojuego|disfraz|patinete|bicicleta|drone|dron|r[eé]plica|replica|puzzle 1000|puzzle 500")),
    ("baneras-y-cambiadores", "Bañeras y cambiadores", "cuidado", ["eras y cambiadores"], R(r"ba[ñn]era|banera|cambiador|asiento de ba|hamaca de ba|cubo|termómetro de ba|termometro de ba"), R(r"peluche|juguete")),
    ("bano", "Accesorios de baño", "cuidado", ["Accesorios de ba"], R(r"."), R(r"labubu|figura")),
    ("cuidado", "Cremas e higiene", "cuidado", ["Productos de higiene para beb", "Parafarmacia > Para el beb", "para beb? > Nebulizadores", "para beb? > Term?metros", "para beb? > Humidificadores", "Cuidado e Higiene Infantil", "Parafarmacia > Beb? > Cuidado", "Parafarmacia para el Beb", "Protegecamas"], R(r"."), R(r"labubu|figura")),
    ("panales", "Pañales", "cuidado", ["Bebé > Pañales", "Beb? > Pa?ales"], R(r"pa[ñn]al|panal|dodot|huggies|braguita|calzoncito"), R(r"cubo|contenedor|bolsa|crema")),
    ("toallitas", "Toallitas", "cuidado", ["Bebé > Toallitas", "Beb? > Toallitas"], R(r"toallita"), R(r"")),
    ("lactancia", "Lactancia", "comer", ["Lactancia Materna"], R(r"."), R(r"labubu")),
    ("embarazo", "Embarazo y posparto", "comer", ["Embarazo y Post Parto"], R(r"."), R(r"labubu")),
    ("esterilizadores", "Esterilizadores y calientabiberones", "comer", ["Esterilizadores"], R(r"esteriliz|calienta|calentador|robot de cocina|cocedor|procesador"), R(r"")),
    ("biberones-y-menaje", "Biberones, chupetes y menaje", "comer", ["Menaje y Termos", "Baberos", "Chupetes y biberones", "Chupetes, biberones"], R(r"biber|tetina|chupete|termo|vaso|plato|cuchara|babero|menaje|set de|portachupete|mordedor|bolsa t[eé]rmica|fiambrera|botella"), R(r"vino|cerveza|caf[eé]|cocktail|coctel|copa|whisky")),
    ("alimentacion-infantil", "Alimentación infantil", "comer", ["Alimentación infantil", "Alimentaci?n infantil", "Alimentación para beb", "Parafarmacia > Beb? > Leche infantil", "Cereales infantiles", "Snacks y galletas"], R(r"."), R(r"")),
]
SLUGS = [t[0] for t in TAXO]

BRANDS = {  # normalización de marcas
    "kikkaboo": "Kikka Boo", "kikka boo": "Kikka Boo", "babybjörn": "BabyBjörn", "babybjorn": "BabyBjörn", "bebe confort": "Bébé Confort", "bebeconfort": "Bébé Confort",
    "maxicosi": "Maxi-Cosi", "maxi cosi": "Maxi-Cosi", "maxi-cosi": "Maxi-Cosi", "chicco": "Chicco", "jane": "Jané", "jané": "Jané", "cybex": "Cybex", "joie": "Joie", "nuna": "Nuna",
    "kinderkraft": "Kinderkraft", "kiderkraft": "Kinderkraft", "lorelli": "Lorelli", "chipolino": "Chipolino", "roba": "Roba", "moni": "Moni", "asalvo": "Asalvo", "lionelo": "Lionelo",
    "dodot": "Dodot", "dodot sensitive": "Dodot", "dodot bebe seco": "Dodot", "dodot activity": "Dodot", "dodot activity extra": "Dodot", "dodot sensitive extra": "Dodot", "dodot basico": "Dodot",
    "carrefour baby": "Carrefour Baby", "carrefour": "Carrefour", "carrefour baby ultra dry": "Carrefour Baby", "carrefour baby ultra protect": "Carrefour Baby", "carrefour baby soft & protect": "Carrefour Baby",
    "huggies": "Huggies", "drynites": "DryNites", "tommee tippee": "Tommee Tippee", "philips avent": "Philips Avent", "avent": "Philips Avent", "suavinex": "Suavinex", "nuk": "NUK", "mam": "MAM",
    "tiny love": "Tiny Love", "fisher-price": "Fisher-Price", "fisher price": "Fisher-Price", "sophie la girafe": "Sophie la Girafe", "vulli": "Sophie la Girafe", "miniland": "Miniland", "miniland baby": "Miniland",
    "hauck": "Hauck", "safety 1st": "Safety 1st", "babymoov": "Babymoov", "beaba": "Béaba", "béaba": "Béaba", "ergobaby": "Ergobaby", "boba": "Boba", "medela": "Medela", "nenuco": "Nenuco",
    "hero": "Hero Baby", "hero baby": "Hero Baby", "hero solo": "Hero Solo", "nestle": "Nestlé", "nestlé": "Nestlé", "nutriben": "Nutribén", "almiron": "Almirón", "hipp": "HiPP", "blevit": "Blevit",
    "mustela": "Mustela", "weleda": "Weleda", "isdin": "Isdin", "bepanthol": "Bepanthol", "eryplast": "Eryplast", "mitosyl": "Mitosyl", "sebamed": "Sebamed", "waterwipes": "WaterWipes",
}
def brand_of(b):
    b = re.sub(r"\s+", " ", b or "").strip()
    if not b: return "Sin marca"
    key = b.lower()
    if key in BRANDS: return BRANDS[key]
    for k, v in BRANDS.items():
        if key.startswith(k + " "): return v
    if b.isupper() or b.islower(): return " ".join(w[:1].upper() + w[1:].lower() for w in b.split(" "))
    return b

SMALL = {"de", "del", "la", "el", "los", "las", "y", "con", "para", "sin", "en", "a", "o", "un", "una", "e", "al", "por"}
def fixname(s):
    s = re.sub(r"\s+", " ", s.replace(" ", " ")).strip().rstrip(".")
    out = []
    for i, w in enumerate(s.split(" ")):
        lw = w.lower()
        if i == 0: out.append(w[:1].upper() + w[1:]); continue
        if lw in SMALL: out.append(lw); continue
        if w.isupper() and len(w) > 3 and not re.match(r"^[A-Z0-9\-]+$", w): out.append(w[:1] + w[1:].lower()); continue
        if w.isupper() and len(w) > 4: out.append(w[:1] + w[1:].lower()); continue
        out.append(w)
    return " ".join(out)

def tramo_silla(low):
    """Tramo de una silla de coche a partir del nombre (cm o grupo)."""
    m = re.search(r"(\d{2,3})\s*[-–/a]\s*(\d{2,3})\s*cm", low)
    if m:
        a, b = int(m.group(1)), int(m.group(2))
        if a <= 45 and b <= 90: return "Portabebés (40–87 cm)"
        if a <= 45 and b >= 100: return "Evolutiva desde nacimiento (40–105/150 cm)"
        if 55 <= a <= 80 and b <= 110: return "De 61 a 105 cm (9 meses a 4 años)"
        if a >= 70 and b >= 125: return "De 76/100 a 150 cm (3 a 12 años)"
    m = re.search(r"(\d+(?:[.,]\d+)?)\s*m\s*-\s*(\d+)\s*a", low)  # "3.5m-12a", "15m-12a"
    if m:
        a, b = float(m.group(1).replace(",", ".")), int(m.group(2))
        if a <= 6 and b >= 10: return "Evolutiva desde nacimiento (40–105/150 cm)"
        if a <= 6: return "Portabebés (40–87 cm)"
        if a >= 9 and b <= 5: return "De 61 a 105 cm (9 meses a 4 años)"
        if a >= 9: return "De 76/100 a 150 cm (3 a 12 años)"
    if re.search(r"grupo ?0\+?(?!\s*[/-]?\s*[123])|portabeb", low): return "Portabebés (40–87 cm)"
    if re.search(r"grupo ?0\+?\s*[/-]?\s*1\s*[/-]?\s*2\s*[/-]?\s*3|0 ?\+ ?1 ?\+ ?2 ?\+ ?3", low): return "Evolutiva desde nacimiento (40–105/150 cm)"
    if re.search(r"grupo ?1\s*[/-]?\s*2\s*[/-]?\s*3|grupo ?1(?![\d])", low): return "De 61 a 105 cm (9 meses a 4 años)"
    if re.search(r"grupo ?2\s*[/-]?\s*3|elevador|alzador", low): return "De 76/100 a 150 cm (3 a 12 años)"
    return None

def classify(path, name):
    low = name.lower()
    if BASURA.search(low): return None
    cands = []
    for slug, _, _, pats, must, never in TAXO:
        if not any(re.search(re.escape(p).replace("\\?", "."), path) for p in pats): continue
        if never.pattern and never.search(low): continue
        if not must.search(low): continue
        cands.append(slug)
    if not cands: return None
    # el primero de la taxonomía que acepta el producto gana, salvo los accesorios, que ceden ante la categoría principal
    return cands[0]

products = {}
for f in sorted(os.listdir(FEEDS)):
    if not f.startswith("feed_") or not f.endswith(".csv"): continue
    with open(os.path.join(FEEDS, f), encoding="utf-8", errors="replace", newline="") as fh:
        for row in csv.DictReader(fh):
            path = row.get("merchant_product_category_path") or ""
            name = row.get("product_name") or ""
            if "�" in name: name = name.replace("�", "")
            if (row.get("brand_name") or "").strip().lower() in BAD_BRANDS: continue
            slug = classify(path, name)
            if not slug: continue
            pid = row["aw_product_id"]
            if pid in products: continue
            try: price = float(row.get("search_price") or 0)
            except ValueError: price = 0
            if price <= 0 or not row.get("merchant_image_url"): continue
            old = row.get("product_price_old") or ""
            tags = []
            if slug == "sillas-de-coche":
                t = tramo_silla(name.lower())
                if t: tags.append(t)
                if re.search(r"i-?size", name, re.I): tags.append("i-Size (R129)")
                if re.search(r"isofix", name, re.I): tags.append("Isofix")
                if re.search(r"girator|360", name, re.I): tags.append("Giratoria")
            if slug in ("carritos", "sillas-de-paseo"):
                if re.search(r"3 en 1|tr[ií]o|trio", name, re.I): tags.append("Trío (3 piezas)")
                elif re.search(r"2 en 1|d[uú]o|duo", name, re.I): tags.append("Dúo (2 piezas)")
                if re.search(r"gemelar|doble", name, re.I): tags.append("Gemelar")
                if re.search(r"ligera|compact|plegado|cabina|avión|avion", name, re.I): tags.append("Compacta")
            if slug == "cunas":
                if re.search(r"colecho", name, re.I): tags.append("Colecho")
                elif re.search(r"minicuna|mois[eé]s|moises|nido", name, re.I): tags.append("Minicuna")
                elif re.search(r"viaje|plegable", name, re.I): tags.append("De viaje")
                elif re.search(r"evolutiva|convertible|cama", name, re.I): tags.append("Evolutiva")
                if re.search(r"madera|haya|pino", name, re.I): tags.append("Madera")
            if slug == "panales":
                m = re.search(r"\bt(?:alla)?\s?(\d)\b", name, re.I)
                if m: tags.append(f"Talla {m.group(1)}")
            products[pid] = {
                "id": pid, "name": fixname(name), "brand": brand_of(row.get("brand_name")),
                "price": price, "old": float(old) if re.match(r"^\d+(\.\d+)?$", old) and float(old) > price else None,
                "img": row["merchant_image_url"], "link": row["aw_deep_link"], "cat": slug, "ean": row.get("ean") or "",
                "stock": (row.get("in_stock") or "1") == "1", "tags": tags,
            }

# imágenes que no se pueden enlazar: se descargan una vez
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
todo = []
for p in products.values():
    if "static.carrefour.es" in p["img"]:
        dest = os.path.join(IMG, p["id"] + ".jpg")
        src = p["img"].replace("hd_350x_", "hd_510x_")
        p["img"] = "/img/catalog/" + p["id"] + ".jpg"
        if not os.path.exists(dest): todo.append((src, dest))
    else:
        p["img"] = p["img"].replace("hd_350x_", "hd_510x_")
def fetch(job):
    url, dest = job
    r = subprocess.run(["curl", "-s", "-L", "-A", UA, "-H", "Referer: https://www.carrefour.es/", "-m", "30", "-o", dest, "-w", "%{http_code}", url], capture_output=True, text=True)
    if r.stdout.strip() != "200" and os.path.exists(dest): os.remove(dest)
    return r.stdout.strip()
if todo:
    with cf.ThreadPoolExecutor(8) as ex: codes = list(ex.map(fetch, todo))
    print("imágenes descargadas:", codes.count("200"), "de", len(todo))

bycat = {}
for p in products.values(): bycat.setdefault(p["cat"], []).append(p)
index = []
for slug, title, group, *_ in TAXO:
    items = sorted(bycat.get(slug, []), key=lambda p: (not p["stock"], p["price"]))
    with open(os.path.join(OUT, slug + ".json"), "w", encoding="utf-8") as fh: json.dump(items, fh, ensure_ascii=False)
    with open(os.path.join(PUB, slug + ".json"), "w", encoding="utf-8") as fh:
        json.dump([[p["id"], p["name"], p["brand"], p["price"], p["old"] or 0, p["img"], 1 if p["stock"] else 0, p["tags"]] for p in items], fh, ensure_ascii=False)
    brands = {}; tags = {}
    for p in items:
        brands[p["brand"]] = brands.get(p["brand"], 0) + 1
        for t in p["tags"]: tags[t] = tags.get(t, 0) + 1
    index.append({"slug": slug, "title": title, "group": group, "count": len(items),
                  "min": min((p["price"] for p in items), default=0),
                  "brands": sorted(brands.items(), key=lambda kv: (-kv[1], kv[0])),
                  "tags": sorted(tags.items(), key=lambda kv: -kv[1])})
    print(f"{len(items):5d}  {slug}")
with open(os.path.join(OUT, "index.json"), "w", encoding="utf-8") as fh: json.dump(index, fh, ensure_ascii=False, indent=1)
print("total", len(products))
