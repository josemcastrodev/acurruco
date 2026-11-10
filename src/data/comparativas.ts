/* Las comparativas: datos de tests independientes (ADAC, OCU) cruzados con precios de hoy.
   Cada fila lleva el id de Carrefour o el ASIN de Amazon: todo producto tiene ficha propia; sin ficha no entra en la tabla. */
import { porMarca, panalesPrimerAno, miles } from "./panales-precios";
const cfAno = porMarca.find((m) => m.name === "Carrefour Baby")?.ano, dodotAno = porMarca.find((m) => m.name === "Dodot")?.ano;
const nPanales = miles(Math.round(panalesPrimerAno / 100) * 100);
export type Row = { name: string; sub?: string; cells: string[]; grade?: string; carrefour?: string; asin?: string; pick?: string };
export type Comparativa = {
  slug: string; title: string; h: string; short: string; group: string; updated: string; photo: string;
  intro: string; tldr: string[]; columns: string[]; rows: Row[]; how: string[]; faq: [string, string][]; catalog: string;
};

export const comparativas: Comparativa[] = [
  {
    slug: "sillas-de-coche-i-size", title: "Mejores sillas de coche i-Size para recién nacido (40–87 cm)", h: "Las mejores sillas de coche para recién nacido", short: "Sillas de coche 40–87 cm", group: "coche", updated: "6 de noviembre de 2026", photo: "/img/photos/cmp-sillas.jpg",
    intro: "Desde septiembre de 2024 solo se venden sillas homologadas R129 (i-Size). Para un recién nacido eso significa un portabebés de 40 a 75 u 87 cm, a contramarcha, que se ancla con base Isofix o con el cinturón. Aquí están las que mejor han salido en los dos últimos tests de ADAC (el más exigente de Europa) y la más vendida en Carrefour, con el precio de hoy.",
    tldr: ["La mejor nota del test entre las que se venden online: Cybex Cloud G3 Plus con Base G3 (2,2).", "La barata que cumple: Kinderkraft i-Lite con base Endura Safe FX (2,7).", "Si el bebé va a hacer viajes largos: Cybex Cloud G3 Plus, que se tumba casi plana fuera del coche.", "Evita: Britax Baby-Safe Pro con base Vario 5Z (recall en 2026), Kinderkraft Mink Pro 2 con base y la primera Maxi-Cosi Pebble 360 Pro (contaminantes)."],
    columns: ["Modelo", "Altura", "Nota ADAC", "Peso", "Precio orientativo"],
    rows: [
      { name: "Cybex Cloud G3 Plus", sub: "con Base G3 · otoño 2026", cells: ["40–87 cm", "2,2", "4,8 kg", "en Amazon"], grade: "2,2", asin: "B0GLQBTWC2", pick: "Para viajes largos" },
      { name: "Kinderkraft i-Lite", sub: "con Endura Safe FX · otoño 2025", cells: ["40–87 cm", "2,7", "3,3 kg", "en Amazon"], grade: "2,7", asin: "B0F143C7BR", pick: "La barata que cumple" },
      { name: "Maxi-Cosi Pebble 360 Pro²", sub: "segunda generación · 2025", cells: ["40–87 cm", "buena", "4,6 kg", "en Amazon"], grade: "2,4", asin: "B000MOZ39C", pick: "Giratoria con base" },
      { name: "Maxi-Cosi CabrioFix i-Size", sub: "sin base o con FamilyFix 360", cells: ["40–75 cm", "buena (con base 360)", "3,2 kg", "en Amazon"], grade: "2,4", carrefour: "44678555940", asin: "B09LVKQMBQ" },
      { name: "Chicco Kory Essential i-Size", sub: "sin test ADAC", cells: ["40–80 cm", "sin test", "3,5 kg", "162,94 € en Carrefour"], carrefour: "39302160848", pick: "La más vendida" },
    ],
    how: ["La nota ADAC va de 1 (mejor) a 5; hasta 2,5 cuenta como 'buena'. Mide seguridad en choque frontal y lateral, manejo, ergonomía y contaminantes en el textil.", "Para un recién nacido importa más la altura máxima (cuánto durará) que el peso de la silla, salvo que la vayas a subir a un quinto sin ascensor.", "Con base Isofix la instalación falla menos; con cinturón ahorras 150–250 € pero tienes que hacerlo bien cada vez.", "Todas las de la tabla sirven para los carritos habituales con adaptadores; mira que tu carrito los tenga antes de comprar."],
    faq: [["¿Hasta cuándo se usa un portabebés 40–87 cm?", "Hasta que la cabeza asoma por encima del respaldo o el bebé llega a 87 cm, normalmente entre los 12 y los 18 meses. Después toca una silla 61–105 cm o 76–150 cm, a contramarcha hasta al menos los 15 meses (la ley) y mejor hasta los 4 años (la recomendación)."], ["¿Puedo comprarla de segunda mano?", "Solo si sabes que no ha tenido un accidente y la etiqueta naranja dice R129. Las R44 ya no se venden y en pocos años no se podrán usar."], ["¿Silla giratoria o portabebés?", "El portabebés se saca del coche con el bebé dentro y encaja en el carrito; la giratoria 40–105 cm se queda en el coche pero dura hasta los 4 años. Muchas familias combinan: portabebés los primeros 12 meses y giratoria después."]],
    catalog: "sillas-de-coche",
  },
  {
    slug: "cunas-de-colecho", title: "Mejores cunas de colecho 2026: comparativa y precios", h: "Las mejores cunas de colecho", short: "Cunas de colecho", group: "dormir", updated: "6 de noviembre de 2026", photo: "/img/photos/cmp-cunas.jpg",
    intro: "Una cuna de colecho va pegada a vuestra cama, a la misma altura, con un lateral que se baja: el bebé duerme en su espacio y tú lo tienes a un brazo para las tomas de noche. Todas las de aquí cumplen la norma europea UNE-EN 1130:2020 y se venden en España con el precio de hoy.",
    tldr: ["La más completa: Chicco Next2Me Magic (11 alturas, balanceo, lateral de una mano), 239 € en Carrefour.", "La que más dura: Chicco Next2Me Forever, de colecho a cama Montessori hasta los 4 años.", "La barata que cumple: Kinderkraft Nest Up 2, 95 € con colchón y ruedas.", "Si el bebé regurgita: Next2Me Dream o Maxi-Cosi Iora, con inclinación antireflujo."],
    columns: ["Modelo", "Alturas", "Hasta", "Lo que la distingue", "Precio hoy"],
    rows: [
      { name: "Chicco Next2Me Magic", cells: ["11", "6 meses / 9 kg", "Balanceo, 4 ruedas con freno, lateral con una mano", "239,00 €"], carrefour: "41813544486", pick: "La más completa" },
      { name: "Chicco Next2Me Dream", cells: ["11", "6 meses / 9 kg", "Patas que se inclinan (reflujo), 4 bolsillos", "292,99 €"], carrefour: "39302160779", pick: "Para el reflujo" },
      { name: "Chicco Next2Me Essential", cells: ["6", "6 meses / 9 kg", "Patas plegables, colchón y bolsa de viaje", "154,24 €"], carrefour: "40931925729", asin: "B0BMM7S59J", pick: "Equilibrada" },
      { name: "Kinderkraft Nest Up 2", cells: ["5", "6 meses / 9 kg", "Ruedas, colchón incluido, menos de 100 €", "95,00 €"], carrefour: "39306826880", pick: "La barata" },
      { name: "Maxi-Cosi Iora", cells: ["5", "6 meses / 9 kg", "4 inclinaciones antireflujo, muy ligera", "en Amazon"], asin: "B07RZH5YW6" },
      { name: "Babybay Maxi", cells: ["regulable", "9 meses", "Madera de haya maciza, sin ruedas", "en Amazon"], asin: "B07RRYDPF5" },
    ],
    how: ["Mira que la etiqueta diga EN 1130:2020. Las cunas de colecho antiguas (anteriores a 2020) no pasaron el ensayo del hueco entre colchón y cama.", "La altura mínima y máxima debe cubrir tu cama: mide desde el suelo hasta el colchón antes de comprar.", "El lateral se baja con cremallera o con un clip; con una mano y a oscuras se nota la diferencia.", "Casi todas duran hasta los 6 meses o 9 kg; a partir de ahí toca cuna normal o cama baja."],
    faq: [["¿Cuna de colecho o minicuna?", "La minicuna es una cuna pequeña independiente; la de colecho tiene un lateral que se baja y se ancla a tu cama. Si vais a dar el pecho de noche, la de colecho os ahorra levantaros."], ["¿Se puede usar en viajes?", "Las Chicco y Kinderkraft se pliegan y traen bolsa, pero pesan 9–14 kg: valen para casa de los abuelos, no para llevar en avión."], ["¿Y después de los 6 meses?", "Cuna de 60×120 o 70×140 cm, o una cama baja tipo Montessori. La Next2Me Forever se convierte en las dos cosas."]],
    catalog: "cunas",
  },
  {
    slug: "panales", title: "Mejores pañales para recién nacido: comparativa de precio por pañal", h: "Pañales: cuál y cuántos", short: "Pañales", group: "cuidado", updated: "10 de noviembre de 2026", photo: "/img/photos/cmp-panales.jpg",
    intro: `Un bebé gasta entre 2.200 y 2.500 pañales el primer año. Con la marca Carrefour Baby salen por unos ${cfAno} €; con Dodot, por unos ${dodotAno} €. En absorción de día casi no se nota la diferencia. Aquí tienes el precio por pañal de hoy, marca a marca y talla a talla, y lo que dicen los tests de la OCU.`,
    tldr: ["Para el día: la marca blanca de Carrefour (ultra dry o soft&protect) o Deliplus de Mercadona, a 0,15–0,23 € el pañal.", "Para la noche y el hospital: Dodot Sensitive, el que mejor ajusta al recién nacido, a 0,35–0,40 €.", "Compra paquetes grandes solo cuando sepas la talla: la 1 dura dos o tres semanas.", "La OCU pone a Lupilu (Lidl) y a Carrefour eco en el podio de su último test."],
    columns: ["Pañal", "Talla y peso", "Formato", "Precio por pañal", "Precio hoy"],
    rows: [
      { name: "Dodot Sensitive", cells: ["T1 · 2–5 kg", "90 ud.", "0,40 €", "35,80 €"], carrefour: "42338427110", pick: "Recién nacido" },
      { name: "Dodot Sensitive", cells: ["T2 · 4–8 kg", "88 ud.", "0,35 €", "31,00 €"], carrefour: "42520271454" },
      { name: "Dodot Sensitive", cells: ["T0 · hasta 3 kg", "24 ud.", "0,37 €", "8,99 €"], carrefour: "45812020760", pick: "Prematuros" },
      { name: "Carrefour Baby soft&protect", cells: ["T1 · 2–5 kg", "26 ud.", "0,23 €", "5,95 €"], carrefour: "35598993896", pick: "Marca blanca" },
      { name: "Carrefour Baby soft&protect", cells: ["T2 · 3–6 kg", "60 ud.", "0,17 €", "10,19 €"], carrefour: "35556760960" },
      { name: "Carrefour Baby ultra dry", cells: ["T3 · 4–9 kg", "102 ud.", "0,15 €", "15,45 €"], carrefour: "35556760954", pick: "La más barata" },
      { name: "Lillydoo", sub: "suscripción", cells: ["T1 · 2–5 kg", "72 ud.", "0,26 €", "en Amazon"], asin: "B0F3P556CQ" },
      { name: "Moltex Nature No1", sub: "ecológico", cells: ["T1 · 2–6 kg", "6 × 23 ud.", "0,21 €", "en Amazon"], asin: "B0DDV1RYTG" },
    ],
    how: ["El precio por pañal es lo único que vale para comparar: el mismo Dodot cuesta 0,22 o 0,41 € según el paquete.", "La talla va por peso, pero cada marca ajusta distinto. Si hay escapes por la espalda, sube de talla; si deja marcas en los muslos, también.", "Los indicadores de humedad y el hueco para el cordón son útiles las dos primeras semanas; después dan igual.", "La OCU y Stiftung Warentest no encuentran diferencias de irritación entre marcas: la crema y los cambios frecuentes importan más que el pañal."],
    faq: [["¿Cuántos pañales usa un bebé el primer año?", `Unos ${nPanales}: 8 al día el primer mes, 7 hasta los tres meses, 6 hasta los seis y 5 hasta el año. Hay bebés que llegan a 2.500, sobre todo si el primer mes se cambian cada dos horas.`], ["¿Cuánto cuestan los pañales el primer año?", `Con la marca Carrefour Baby, unos ${cfAno} €; con Dodot Sensitive, unos ${dodotAno} €. La marca blanca sale entre 0,15 y 0,23 € el pañal y Dodot entre 0,35 y 0,50 €, según la talla.`], ["¿Cuántos pañales de talla 1 compro antes de nacer?", "Un paquete grande (80–90) y otro de talla 2. Un recién nacido de 3,5 kg pasa a la talla 2 en unas tres semanas."], ["¿Pañales de tela?", "Ahorran dinero y residuos, pero son 20–25 pañales, dos lavadoras extra a la semana y entre 300 y 500 € de inversión inicial. Muchas familias los combinan con desechables para la noche."], ["¿Y las toallitas?", "Las de agua (WaterWipes o las de Carrefour 99 % agua) para el primer mes; después, cualquiera sin perfume."]],
    catalog: "panales",
  },
  {
    slug: "cremas-de-panal", title: "Mejores cremas para el culito del bebé: pasta al agua, óxido de zinc y pantenol", h: "Cremas para el culito", short: "Cremas de pañal", group: "cuidado", updated: "6 de noviembre de 2026", photo: "/img/photos/cremas.jpg",
    intro: "Casi todas las cremas de pañal son una de dos cosas: una barrera (óxido de zinc, 'pasta al agua') para cuando hay rojez, o una hidratante con pantenol para prevenir. Las de la tabla salen bien en los tests de la OCU o son las que más recomiendan los pediatras en España.",
    tldr: ["Si ya hay rojez: una pasta al agua con 10–40 % de óxido de zinc (Eryplast, Mustela 1-2-3, Mitosyl).", "Para prevenir, en cada cambio: Bepanthol o Weleda de caléndula, capa fina.", "La que mejor sale en calidad-precio en la OCU es la marca más básica: lo que importa es ponerla en cada cambio.", "No hace falta polvos de talco (los pediatras los desaconsejan) ni toallitas con perfume."],
    columns: ["Crema", "Tipo", "Activo", "Formato", "Precio hoy"],
    rows: [
      { name: "Eryplast pasta al agua", sub: "Lutsine", cells: ["barrera", "óxido de zinc + dexpantenol", "75 g", "10,99 €"], carrefour: "44796478650", pick: "Top OCU" },
      { name: "Mustela crema bálsamo 1-2-3", cells: ["barrera", "10 % óxido de zinc, vitamina B5", "100 ml", "en Amazon"], asin: "B07FMFJ3S6", pick: "Top OCU" },
      { name: "Weleda crema de pañal de caléndula", cells: ["barrera suave", "óxido de zinc + caléndula", "75 ml", "en Amazon"], asin: "B00BN8JUCC", pick: "La más vendida en Amazon" },
      { name: "Bepanthol Baby pomada protectora", cells: ["prevención", "5 % pantenol", "100 g", "en Amazon"], asin: "B005YNOXW4" },
      { name: "Mitosyl pomada", cells: ["barrera", "óxido de zinc, vitaminas A y D", "145 g", "en Amazon"], asin: "B009M4MKDU" },
      { name: "Suavinex crema del pañal", cells: ["prevención", "karité + péptidos", "75 ml", "en Amazon"], asin: "B07H98NP4F" },
    ],
    how: ["Barrera o prevención: no es lo mismo. La pasta al agua se pone gruesa cuando hay rojez; la de pantenol, fina y en cada cambio.", "Más zinc, más barrera: 10 % para el día a día, 40 % para una dermatitis que no cede en dos días.", "Si la rojez tiene puntitos alrededor o no mejora en tres días, pediatra: puede ser hongos y la crema normal no sirve.", "Los formatos grandes (145–300 g) salen a la mitad por gramo; se usa mucha más de la que crees."],
    faq: [["¿Cuál es la mejor crema para la dermatitis del pañal?", "Una pasta al agua con óxido de zinc al 10–40 %: Eryplast, Mustela 1-2-3 o Mitosyl. Capa gruesa, sin retirarla del todo en cada cambio, y pañal aireado."], ["¿Hay que poner crema en cada cambio?", "Las primeras semanas sí, fina. Después, solo si la piel está irritada o va a estar mucho tiempo con el pañal (noche, viajes)."]],
    catalog: "cuidado",
  },
];
