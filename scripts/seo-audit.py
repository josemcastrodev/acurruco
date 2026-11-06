# Auditoría SEO del sitio generado en dist/: titles, descriptions, canonical, h1, lang, alt, JSON-LD (Product sin offers, etc.)
import os, re, json, collections, html, sys
root = 'C:/bebes/site/dist'
issues = collections.Counter(); examples = collections.defaultdict(list)
titles = collections.Counter(); descs = collections.Counter(); n = 0
def add(k, path):
    issues[k] += 1
    if len(examples[k]) < 3: examples[k].append(path)
for dp, dn, fn in os.walk(root):
    for f in fn:
        if not f.endswith('.html'): continue
        path = os.path.join(dp, f); rel = os.path.relpath(path, root).replace('\\', '/')
        u = open(path, encoding='utf-8').read(); n += 1
        t = re.search(r'<title>(.*?)</title>', u, re.S); t = html.unescape(t.group(1).strip()) if t else ''
        d = re.search(r'<meta name="description" content="(.*?)"', u); d = html.unescape(d.group(1)) if d else ''
        c = re.search(r'<link rel="canonical" href="(.*?)"', u); c = c.group(1) if c else ''
        if not t: add('sin title', rel)
        elif len(t) > 70: add('title > 70', rel)
        if not d: add('sin description', rel)
        elif len(d) < 70: add('description < 70', rel)
        elif len(d) > 165: add('description > 165', rel)
        if not c: add('sin canonical', rel)
        else:
            exp = 'https://acurruco.com/' + ('' if rel == 'index.html' else rel.replace('index.html', ''))
            if c != exp: add('canonical != url', rel + ' -> ' + c)
        titles[t] += 1; descs[d] += 1
        h1 = len(re.findall(r'<h1[\s>]', u))
        if h1 != 1: add(f'h1 x{h1}', rel)
        if 'lang="es"' not in u[:300]: add('sin lang=es', rel)
        if 'og:title' not in u: add('sin og:title', rel)
        if 'og:image' not in u: add('sin og:image', rel)
        imgs = re.findall(r'<img\b[^>]*>', u)
        for im in imgs:
            if ' alt=' not in im: add('img sin alt', rel); break
        if 'noindex' in u: add('noindex', rel)
        for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', u, re.S):
            try: data = json.loads(m.group(1))
            except Exception as e: add('json-ld inválido', rel); continue
            nodes = data.get('@graph', [data]) if isinstance(data, dict) else data
            for node in nodes:
                ty = node.get('@type')
                if ty == 'Product':
                    if not (node.get('offers') or node.get('review') or node.get('aggregateRating')): add('Product sin offers/review/rating', rel)
                    o = node.get('offers') or {}
                    if o:
                        for k in ('price', 'priceCurrency', 'availability'):
                            if o.get(k) in (None, ''): add(f'Offer sin {k}', rel)
                    img = node.get('image')
                    if isinstance(img, str) and not img.startswith('http'): add('Product image relativa', rel)
                    if not node.get('description'): add('Product sin description', rel)
                    if not node.get('sku') and not node.get('gtin13'): add('Product sin sku/gtin', rel)
                if ty == 'BreadcrumbList':
                    for it in node.get('itemListElement', []):
                        if 'item' in it and not str(it['item']).startswith('http'): add('Breadcrumb item relativo', rel)
                if ty == 'Article' and not node.get('datePublished'): add('Article sin datePublished', rel)
                if ty == 'FAQPage':
                    for q in node.get('mainEntity', []):
                        if not q.get('acceptedAnswer', {}).get('text'): add('FAQ sin respuesta', rel)
print('páginas', n)
for k, v in issues.most_common(): print(f'{v:6}  {k}   e.g. {examples[k]}')
dup_t = [(t, c) for t, c in titles.items() if c > 1]; dup_d = [(d, c) for d, c in descs.items() if c > 1]
print('titles duplicados', len(dup_t), dup_t[:5]); print('descriptions duplicadas', len(dup_d), [(d[:60], c) for d, c in dup_d[:5]])
print('robots.txt' , os.path.exists(root + '/robots.txt'), 'sitemap', os.path.exists(root + '/sitemap-index.xml'))
