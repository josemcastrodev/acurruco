t = 'C:/bebes/site/src/pages/comparativas/[slug].astro'
u = open(t, encoding='utf-8').read()
u = u.replace('import { comparativas, asinImg } from "../../data/comparativas";', 'import { comparativas, asinImg } from "../../data/comparativas";\nimport amazon from "../../data/amazon.json";\nconst A = amazon as Record<string, { price: number | null }>;\nconst eurN = (n: number) => n.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";')
# nota ADAC sin caja: texto con un punto de color
u = u.replace('''{r.cells.map((cell, i) => <td class="nums">{c.columns[i + 1] === "Nota ADAC" ? <span class:list={["grade", { "grade--good": r.grade && Number(r.grade.replace(",", ".")) <= 2.5 }]}>{cell}</span> : cell}</td>)}''',
              '''{r.cells.map((cell, i) => <td class="nums">{c.columns[i + 1] === "Nota ADAC" ? <span class:list={["grade", { "grade--good": r.grade && Number(r.grade.replace(",", ".")) <= 2.5, "grade--none": /sin test/i.test(cell) }]}>{cell}</span> : cell}</td>)}''')
# dónde: Carrefour primero con su precio, Amazon con el precio tomado
u = u.replace('''                <td class="cmp__where">
                  {r.carrefour && products[r.carrefour] && <a class="button" href={`/p/${r.carrefour}/`}>Ficha y precios</a>}
                  {r.asin ? <a class="button button--ghost" href={`https://www.amazon.es/dp/${r.asin}?tag=acurruco-21`} rel="sponsored nofollow noopener" target="_blank">Amazon</a> : r.amazon && <a class="button button--ghost" href={amz(r.amazon)} rel="sponsored nofollow noopener" target="_blank">Buscar en Amazon</a>}
                </td>''',
'''                <td class="cmp__where">
                  {r.carrefour && products[r.carrefour] && <a class="offer offer--cf" href={`/p/${r.carrefour}/`}><span>Carrefour</span><strong class="nums">{eurN(products[r.carrefour].price)}</strong></a>}
                  {r.asin && A[r.asin]?.price && <a class="offer" href={`https://www.amazon.es/dp/${r.asin}?tag=acurruco-21`} rel="sponsored nofollow noopener" target="_blank"><span>Amazon</span><strong class="nums">{eurN(A[r.asin].price!)}</strong></a>}
                  {r.asin && !A[r.asin]?.price && <a class="offer" href={`https://www.amazon.es/dp/${r.asin}?tag=acurruco-21`} rel="sponsored nofollow noopener" target="_blank"><span>Amazon</span><strong>ver precio</strong></a>}
                  {!r.carrefour && !r.asin && <span class="cmp__nostore">No se vende online en España</span>}
                </td>''')
u = u.replace('''  .grade { display: inline-block; min-width: 3rem; text-align: center; padding: 0.15rem 0.5rem; border-radius: 6px; font-weight: 700; background: var(--surface); }
  .grade--good { background: var(--accent); color: var(--accent-ink); }''',
'''  .grade { display: inline-flex; align-items: center; gap: 0.4rem; font-weight: 700; white-space: nowrap; }
  .grade::before { content: ""; width: 10px; height: 10px; border-radius: 50%; background: var(--surface-2); flex: none; }
  .grade--good::before { background: var(--accent); }
  .grade--none { font-weight: 400; color: var(--muted); }
  .grade--none::before { display: none; }
  .offer { display: flex; justify-content: space-between; align-items: baseline; gap: 0.75rem; min-width: 10.5rem; padding: 0.45rem 0.8rem; border-radius: 9px; background: var(--bg); text-decoration: none; font-size: var(--step-small); }
  .offer strong { font-family: var(--font-display); font-variation-settings: "SOFT" 100, "opsz" 36; font-size: 1.1rem; font-weight: 600; }
  .offer--cf { background: var(--accent); color: var(--accent-ink); }
  .cmp__nostore { font-size: var(--step-small); color: var(--muted); }''')
u = u.replace('  .cmp__where { display: flex; flex-wrap: wrap; gap: 6px; }', '  .cmp__where { display: grid; gap: 6px; }')
open(t, 'w', encoding='utf-8').write(u)
print('cmp ok', u.count('offer--cf'))
