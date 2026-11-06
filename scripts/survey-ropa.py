import csv, sys, re, collections
csv.field_size_limit(10**9)
base = 'C:/Users/jose1/AppData/Local/Temp/claude/080c4d94464cf648/5f6d5435-80dc-4bfa-b8c3-346402eef8d6/scratchpad/awin/'
RX = re.compile(r'\b(body|bodies|pijama|pelele|ranita|conjunto beb|chaqueta beb|leggin|camiseta beb|calcetines beb|gorro beb|manoplas|patucos|vestido beb|peto beb|ropa de beb|reci[eé]n nacido|tex beb|0-3 meses|3-6 meses|6-9 meses|9-12 meses|12-18 meses|talla 56|talla 62|talla 68|talla 74|talla 80|talla 86)', re.I)
cats = collections.Counter(); samples = collections.defaultdict(list); n = 0
for fid in ('76395', '84214', '98228'):
    with open(base + f'feed_{fid}.csv', encoding='utf-8', newline='') as f:
        r = csv.DictReader(f)
        for row in r:
            name = row['product_name']; path = row.get('merchant_product_category_path', '') or ''; cat = row.get('merchant_category', '') or ''
            hay = name + ' | ' + path + ' | ' + cat
            if re.search(r'ropa|moda|textil|beb[eé] y mam[aá]', path + ' ' + cat, re.I) or RX.search(name):
                if re.search(r'cuna|cama|colch|saco|capazo|silla|carrito|pañal|toallit|juguete|peluche|biber|chupete|crema|gel |champ|mueble|barrera|bañera|cambiador|hamaca|trona|vigila|manta|muselina|cojín|sábana|funda|sabanas|protector|edred|nórdico|colcha|perro|gato|mascota|disfraz', hay, re.I):
                    continue
                key = (path or cat)[:90]
                cats[key] += 1; n += 1
                if len(samples[key]) < 4: samples[key].append((row['brand_name'], name[:80], row['search_price'], row['in_stock'], fid))
print('total candidatos', n)
for k, c in cats.most_common(40):
    print(f'{c:5}  {k}')
    for s in samples[k]: print('        ', s)
