/* Estado de una herramienta: se guarda en el navegador y, además, en el enlace (#clave=…),
   para abrirlo en otro dispositivo o compartirlo sin registro. El enlace manda sobre lo guardado. */
const enc = (v: unknown) => btoa(unescape(encodeURIComponent(JSON.stringify(v)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const dec = (s: string) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g, "+").replace(/_/g, "/")))));

export function loadState<T>(key: string, fallback: T): { value: T; fromLink: boolean } {
  const m = location.hash.match(new RegExp(`[#&]${key}=([A-Za-z0-9_-]+)`));
  if (m) { try { return { value: dec(m[1]) as T, fromLink: true }; } catch {} }
  try { const s = localStorage.getItem("acurruco-" + key); if (s) return { value: JSON.parse(s) as T, fromLink: false }; } catch {}
  return { value: fallback, fromLink: false };
}

export function saveState(key: string, value: unknown, inLink = true) {
  try { localStorage.setItem("acurruco-" + key, JSON.stringify(value)); } catch {}
  if (inLink) history.replaceState(null, "", location.pathname + location.search + "#" + key + "=" + enc(value));
}

export function clearState(key: string) {
  try { localStorage.removeItem("acurruco-" + key); } catch {}
  history.replaceState(null, "", location.pathname + location.search);
}

/* Botón "Compartir": copia el enlace (o abre el menú nativo en el móvil) y lo confirma en el propio botón. */
export function wireShare(btn: HTMLElement | null, title: string) {
  if (!btn) return;
  const label = btn.textContent;
  btn.addEventListener("click", async () => {
    const url = location.href;
    try {
      if (navigator.share && /Mobi|Android/i.test(navigator.userAgent)) { await navigator.share({ title, url }); return; }
      await navigator.clipboard.writeText(url);
      btn.textContent = "Enlace copiado";
    } catch { btn.textContent = "Copia la dirección de arriba"; }
    setTimeout(() => { btn.textContent = label; }, 2200);
  });
}

export const eur = (n: number, dec = 0) => n.toLocaleString("es-ES", { minimumFractionDigits: dec, maximumFractionDigits: dec }) + " €";
export const fecha = (d: Date) => d.toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
export const fechaCorta = (d: Date) => d.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
export const addDays = (d: Date, n: number) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const addMonths = (d: Date, n: number) => { const x = new Date(d); x.setMonth(x.getMonth() + n); return x; };
export const toISO = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const fromISO = (s: string) => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
/* Edad en meses con decimales entre dos fechas */
export const mesesEntre = (a: Date, b: Date) => (b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24 * 30.4375);
