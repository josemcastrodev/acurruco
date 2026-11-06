# Selección a mano de regalos por edad desde el catálogo de Carrefour.
# Cada entrada es un id o una expresión regular (primer producto en stock, el más barato).
import json, glob, re, os
byid = {}
for f in glob.glob('C:/bebes/site/src/data/catalog/*.json'):
    if f.endswith('index.json'): continue
    for p in json.load(open(f, encoding='utf-8')): byid[p['id']] = p
instock = [p for p in byid.values() if p.get('stock', True)]

PICKS = {
    'recien-nacido': [
        '46130930553',                      # Doudou Sophie la Girafe
        '43960402925',                      # Gimnasio Black & White Gymini
        '42271547420',                      # Saco de dormir newborn Sleepee
        '42995957024',                      # Muselinas Jollein 2 ud
        '45787432206',                      # Peluche proyector Sophie
        '44938674624',                      # Manta de actividades Chipolino
        r'Vigilabeb. Dream Machine',        # Motorola
        r'Mochila Porta Beb. Mini Babybj',  # Babybjörn Mini
        r'Hamaca Kinderkraft Mimi',
        r'Vigilabeb.s de Audio Digitalk Projector',
        r'Saco de Dormir de Muselina de Bamb',
    ],
    '3-6-meses': [
        '44103817035',                      # Gymini Rock With Me
        '46455323025',                      # Set sonajero Sophie
        '46072198359',                      # 3 pelotas sensoriales Ludi
        '43246385093',                      # Alfombra puzle Infantino
        r'Robot Juega y Crece',             # Lamaze
        '46637393010',                      # Cojín de actividades Fisher-Price
        r'Arco Cochecito Sunny Stroll',
        r'Dynamic Gymini Farmers',
        '42995957247',                      # Tazas mordedores Playgro
        r'Hamaca para Bebe con Vibraciones',
        r'Gimnasio de Actividades Fold and Go',
        r'Hamaca Beb. 18 Kg Rosy Rainbow',
    ],
    '6-12-meses': [
        '44941938669',                      # Juguete de baño de pesca Munchkin
        '46422224015',                      # Vasos de baño Munchkin
        r'Andador Madera Push & Play',
        r'Mesa Actividades Madera Farmers',
        '45990516167',                      # Bloques Viga 68 piezas
        '45395472923',                      # Soft Clemmy carrito
        r'Correpasillos Mi Primera Vespa',
        r'Trona de Viaje Chicco Bento Vanilla',
        '43583029799',                      # Carrito 17 bloques Janod
        r'Piano M.gico Notes',              # Hape
        '44675456997',                      # Parque Defieltro
        r'Trona 2 en 1 Dinnly',
        r'M.vil Divertido para Ba.o',       # Yookidoo
    ],
    '1-ano': [
        r'Correpasillos Mi Primera Vespa',
        r'Rolly Coup',                      # Chicco coche R/C
        r'Correpasillos Off Road',
        '45189621286',                      # Triciclo Qplay
        '43183247439',                      # Escalera y balancín Chipolino
        '39301763160',                      # Cocina Janod
        r'Tren de Paseo Abc',
        '45081701248',                      # Puzzle 9 piezas Viga
        '46067079949',                      # Torre educativa Chipolino
        '43855491279',                      # Andador Montessori Mamabrum
        '45015607902',                      # Step2 caballo balancín
        r'Tut Tut Bolidos la Casa',
        '44240811734',                      # Caballito Martinho
        r'Carrito 17 Bloques',
    ],
    'navidad': [
        '46130930553', '44103817035', '44941938669', r'Correpasillos Mi Primera Vespa', '45189621286',
        '39301763160', r'Piano M.gico Notes', '43583029799', r'Mochila Porta Beb. Mini Babybj', '46067079949',
        '46072198359', r'Tren de Paseo Abc', '45990516167', r'Hamaca Kinderkraft Mimi',
    ],
}

out_path = 'C:/bebes/site/src/data/regalos.json'
R = json.load(open(out_path, encoding='utf-8')) if os.path.exists(out_path) else {}
for slug, wants in PICKS.items():
    ids = []
    for w in wants:
        if w in byid:
            p = byid[w]
            if not p.get('stock', True): print('  sin stock:', slug, p['name'][:50]); continue
            ids.append(w)
        else:
            m = sorted((p for p in instock if re.search(w, p['name'], re.I)), key=lambda p: p['price'])
            if not m: print('  sin match:', slug, w); continue
            ids.append(m[0]['id'])
    seen = set(); ids = [i for i in ids if not (i in seen or seen.add(i))]
    R.setdefault(slug, {})['ids'] = ids
    bands = [sum(1 for i in ids if byid[i]['price'] <= 60), sum(1 for i in ids if byid[i]['price'] > 60)]
    print(slug, len(ids), 'mid/high', bands)
json.dump(R, open(out_path, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
