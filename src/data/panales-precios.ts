/* Precio por pañal de hoy en Carrefour, por marca y talla, calculado del catálogo (unidades en el nombre del paquete),
   y lo que cuesta el primer año con cada marca. Lo usan la calculadora de pañales y la comparativa de pañales. */
import panales from "./catalog/panales.json";

export type Marca = { name: string; href: string | null; precio: (number | null)[]; nota?: string };

const perUnit = (p: any) => { const m = p.name.match(/(\d{2,3})\s*(?:unidades|uds?|pañales|u\b)/i); return m ? p.price / Number(m[1]) : null; };
const tallaDe = (p: any) => Number((p.tags.find((x: string) => /^Talla \d/.test(x)) || "").replace("Talla ", "")) || null;
const marcaDe = (p: any) => /dodot/i.test(p.brand) ? "Dodot" : p.brand === "Carrefour Baby" ? "Carrefour Baby" : /huggies/i.test(p.brand) ? "Huggies" : /pampers/i.test(p.brand) ? "Pampers" : null;
const med = (a: number[]) => [...a].sort((x, y) => x - y)[Math.floor(a.length / 2)];

const by: Record<string, Record<number, number[]>> = {};
for (const p of panales as any[]) {
  const u = perUnit(p), t = tallaDe(p), b = marcaDe(p);
  if (!u || !t || !b || !p.stock || /pants|bañador|pijama|ninjamas/i.test(p.name)) continue;
  ((by[b] ||= {})[t] ||= []).push(u);
}
export const precios: Marca[] = Object.entries(by).map(([name, t]) => ({
  name, href: `/catalogo/panales/?marca=${encodeURIComponent(name)}`,
  precio: [1, 2, 3, 4, 5, 6].map((n) => (t[n] ? Number(med(t[n]).toFixed(3)) : null)),
}));
// Referencia de otro supermercado que no está en el catálogo (precio por pañal, noviembre de 2026).
precios.push({ name: "Deliplus (Mercadona)", href: null, precio: [0.22, 0.16, 0.15, 0.15, 0.17, 0.19], nota: "precio de Mercadona" });

/* Pañales al día por edad (meses cumplidos) y talla habitual. */
export const tramos = [{ hasta: 1, dia: 8, talla: 1 }, { hasta: 3, dia: 7, talla: 2 }, { hasta: 6, dia: 6, talla: 3 }, { hasta: 12, dia: 5, talla: 4 }, { hasta: 18, dia: 4.5, talla: 5 }, { hasta: 24, dia: 4, talla: 6 }];
const tramoDe = (m: number) => tramos.find((x) => m <= x.hasta) ?? tramos[tramos.length - 1];

/* Primer año: meses 0 a 11, 30 días cada uno. */
const meses = Array.from({ length: 12 }, (_, m) => tramoDe(m));
export const panalesPrimerAno = meses.reduce((s, t) => s + t.dia * 30, 0);
export const costePrimerAno = (m: Marca) => meses.every((t) => m.precio[t.talla - 1]) ? Math.round(meses.reduce((s, t) => s + t.dia * 30 * m.precio[t.talla - 1]!, 0)) : null;

/* Tabla por marca para la comparativa, de la más barata a la más cara en el primer año. */
export const porMarca = precios
  .map((m) => ({ ...m, ano: costePrimerAno(m) }))
  .sort((a, b) => (a.ano ?? 1e9) - (b.ano ?? 1e9));

/* 2200 → "2.200" (toLocaleString("es-ES") no separa los miles de cuatro cifras). */
export const miles = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
