/* Productos de Amazon: cada uno tiene ficha propia en /p/a/<asin>/.
   Si el mismo producto está en el catálogo de Carrefour, la ficha es la de Carrefour. */
import amazon from "./amazon.json";
import regalos from "./regalos-amazon.json";
import { guias } from "./guias";
import { comparativas } from "./comparativas";
import { edades } from "./regalos-guia";

export type AItem = { asin: string; name: string; brand: string; kind: string; carrefour?: string };

const raw = amazon as Record<string, any>;
export const amazonItems: AItem[] = Object.keys(raw).filter((k) => !k.startsWith("_")).map((asin) => ({ asin, name: raw[asin].name, brand: raw[asin].brand || "", kind: raw[asin].kind || "regalo", carrefour: raw[asin].carrefour }));
export const amazonByAsin = new Map(amazonItems.map((a) => [a.asin, a]));

const catalog = import.meta.glob("./catalog/*.json", { eager: true });
const catalogIds = new Set<string>();
for (const k in catalog) if (!k.endsWith("index.json")) for (const p of (catalog[k] as any).default) catalogIds.add(p.id);

/** El producto de Carrefour equivalente, si sigue en el catálogo de hoy. */
export const carrefourTwin = (asin: string) => {
  const id = amazonByAsin.get(asin)?.carrefour;
  return id && catalogIds.has(id) ? id : undefined;
};
/** Enlace a la ficha del producto en Acurruco. */
export const fichaAmazon = (asin: string) => {
  const cf = carrefourTwin(asin);
  return cf ? `/p/${cf}/` : `/p/a/${asin}/`;
};
/** Enlace de afiliado a Amazon. */
export const amazonLink = (asin: string) => `https://www.amazon.es/dp/${asin}?tag=acurruco-21`;
/** Productos de Amazon que necesitan ficha propia (los que no tienen gemelo en Carrefour). */
export const amazonOnly = () => amazonItems.filter((a) => !carrefourTwin(a.asin));

export const kindLabel: Record<string, string> = {
  silla: "Silla de coche", cuna: "Cuna de colecho", panal: "Pañales", mordedor: "Mordedor", sonajero: "Sonajero", pelota: "Pelota sensorial",
  muselina: "Muselinas", libro: "Libro de cartón", "libro-tela": "Libro de tela", "libro-bano": "Libro de baño", sensorial: "Juguete sensorial",
  aros: "Apilable", bloques: "Bloques encajables", puzzle: "Puzle de madera", xilofono: "Xilófono", piano: "Piano de juguete", regalo: "Juguete",
};

/** Dónde lo recomendamos y por qué: regalos por edad, guías y comparativas. */
export const mentions = (asin: string) => {
  const out: { why: string; label: string; href: string }[] = [];
  for (const e of edades) for (const [a, why] of ((regalos as Record<string, [string, string][]>)[e.slug] || [])) if (a === asin) out.push({ why, label: e.title, href: `/regalos/${e.slug}/` });
  for (const g of guias) for (const x of g.products || []) if (x.asin === asin) out.push({ why: x.why, label: g.h, href: `/guias/${g.slug}/` });
  for (const c of comparativas) for (const r of c.rows) if (r.asin === asin) out.push({ why: [r.pick, r.sub].filter(Boolean).join(" · "), label: c.h, href: `/comparativas/${c.slug}/` });
  return out;
};
