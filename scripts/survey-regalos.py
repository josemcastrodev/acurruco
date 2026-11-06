import json, glob, re, os, sys
byid = {}
for f in glob.glob('C:/bebes/site/src/data/catalog/*.json'):
    if f.endswith('index.json'): continue
    cat = os.path.basename(f)[:-5]
    for p in json.load(open(f, encoding='utf-8')):
        p['cat'] = cat; byid[p['id']] = p
items = [p for p in byid.values() if p.get('stock', True)]
print(sorted(set(p['cat'] for p in items)))
kw = {'mordedor': r'mordedor', 'sonajero': r'sonajero', 'libro': r'libro', 'muselina': r'muselina', 'apilable': r'apilab|anillas',
      'cubos': r'cubos|bloques', 'puzle': r'puzzle|puzle|encaj', 'arrastre': r'arrastre|correpasillos|andador', 'pelota': r'pelota|bal[oó]n',
      'peluche': r'peluche|doudou', 'gimnasio': r'gimnasio|alfombra de activ|manta de activ', 'baño': r'ba[ñn]o', 'proyector': r'proyector',
      'musica': r'xil[oó]fono|piano|tambor|music', 'triciclo': r'triciclo|balanc[ií]n', 'saco': r'saco de dormir', 'cocina': r'cocina|imitaci',
      'madera': r'madera', 'montessori': r'montessori|sensorial|arco iris|torre'}
for k, rx in kw.items():
    m = [p for p in items if re.search(rx, p['name'], re.I) and p['cat'] not in ('panales', 'toallitas', 'alimentacion', 'cremas', 'ropa')]
    cheap = [p for p in m if p['price'] <= 25]; mid = [p for p in m if 25 < p['price'] <= 60]; hi = [p for p in m if p['price'] > 60]
    print(f"{k:10} total {len(m):3}  <=25:{len(cheap):3} 25-60:{len(mid):3} >60:{len(hi):3}  cats:{sorted(set(p['cat'] for p in m))[:6]}")
    for p in sorted(m, key=lambda p: p['price'])[:7]: print('      ', p['price'], p['brand'], '|', p['name'][:70], '|', p['id'])
