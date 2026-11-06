import json, glob, re, os
byid = {}
for f in glob.glob('C:/bebes/site/src/data/catalog/*.json'):
    if f.endswith('index.json'): continue
    cat = os.path.basename(f)[:-5]
    for p in json.load(open(f, encoding='utf-8')):
        p['cat'] = cat; byid[p['id']] = p
items = [p for p in byid.values() if p.get('stock', True)]
Q = {
 'bolsa': [r'Dodot.*reci[eé]n nacido|Dodot.*talla 1\b|Dodot.*Sensitive.*1', r'toallitas.*(agua|WaterWipes|Aqua Pure)', r'saco de dormir.*(newborn|0-4|0-6|60 cm)', r'muselina', r'chupete.*0', r'crema.*(culito|pañal|Mitosyl|Bepanthol)', r'termómetro', r'bodies|body ', r'disco.*lactancia|discos absorbentes', r'cojín de lactancia|almohada de lactancia', r'faja|bragas.*parto|compresas.*posparto', r'gorro', r'manta.*(bebé|cuna)'],
 'recien': [r'minicuna|colecho', r'saco de dormir.*(newborn|0-4|0-6)', r'bañera', r'cambiador', r'Dodot.*talla 1\b|Dodot.*reci[eé]n', r'toallitas', r'termómetro', r'aspirador nasal|suero', r'esterilizador', r'biber[oó]n.*(reci[eé]n|0m|natural)', r'portabeb[eé]s|fular', r'vigilabeb'],
 'carrito': [r'(Bugaboo|Cybex|Joie|Chicco|Jané|Maxi-Cosi|Kinderkraft|Baby Monsters).*(3 en 1|tr[ií]o|d[uú]o|2 en 1)', r'silla de paseo.*(ligera|compacta)|Yoyo|Joie Pact|Cybex Beezy|Libelle', r'saco.*(silla|capazo)', r'burbuja|plástico de lluvia', r'organizador.*carrito|bolso.*carrito', r'arco.*cochecito'],
 'sensorial': [r'sensorial', r'Lamaze|Freddie', r'pelotas? sensorial', r'libro de tela|libro blando', r'espejo', r'gimnasio.*(black|blanco y negro|b&w)', r'sonajero', r'mordedor', r'manta de actividades|alfombra de activ', r'cubos? sensorial'],
 'montessori': [r'montessori', r'torre.*(aprendizaje|educativa)', r'madera.*(apilable|bloques|cubos)', r'arco iris', r'puzzle.*madera|puzle.*madera', r'andador.*madera', r'cocina.*madera', r'anillas', r'encajable|encaje', r'arrastre.*madera', r'balancín.*madera|escalera.*madera'],
}
for g, rxs in Q.items():
    print('\n####', g)
    for rx in rxs:
        m = sorted((p for p in items if re.search(rx, p['name'], re.I) and p['cat'] not in ('alimentacion-infantil',)), key=lambda p: p['price'])
        print(f'  [{rx}] {len(m)}')
        for p in m[:5]: print('     ', p['id'], p['price'], p['brand'], '|', p['name'][:72], '|', p['cat'])
