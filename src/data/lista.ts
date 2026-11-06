/* La lista de nacimiento: lo que hace falta de verdad para un recién nacido, por bloques.
   price = precio orientativo de nivel medio (noviembre de 2026); season = solo si nace en esa estación;
   ids = productos del catálogo de Carrefour que enseñamos como "ver opciones" (si siguen en stock). */
export type Item = { name: string; why: string; href: string; must: boolean; price: number; season?: "invierno" | "verano"; ids?: string[] };
export const lista: { name: string; items: Item[] }[] = [
  { name: "Para dormir", items: [
    { name: "Cuna de colecho o minicuna", why: "Con colchón firme y sábanas ajustables. Nada de almohadas ni protectores.", href: "/comparativas/cunas-de-colecho/", must: true, price: 180, ids: ["41363053386", "39302160779"] },
    { name: "2 sacos de dormir de recién nacido", why: "TOG 1 para casa a 20–22 °C. Sustituyen a mantas y edredones.", href: "/catalogo/ropa-de-cuna/", must: true, price: 60, ids: ["46006733444", "40761780496"] },
    { name: "3 sábanas bajeras de cuna", why: "Una puesta, una en la lavadora, una de reserva.", href: "/catalogo/ropa-de-cuna/", must: true, price: 30 },
    { name: "Vigilabebés", why: "Solo si la cuna va a estar en otra habitación. Los primeros meses, no hace falta.", href: "/catalogo/vigilabebes/", must: false, price: 90, ids: ["39301874898", "44182436359"] },
  ] },
  { name: "Para el coche y la calle", items: [
    { name: "Silla de coche i-Size 40–87 cm", why: "Obligatoria para salir del hospital en coche. Pruébala en tu coche antes de comprar.", href: "/comparativas/sillas-de-coche-i-size/", must: true, price: 260, ids: ["41748980890", "46000255515"] },
    { name: "Carrito con capazo", why: "Los primeros 6 meses el bebé va tumbado: el capazo no es opcional.", href: "/guias/elegir-carrito/", must: true, price: 500, ids: ["40385335642", "45877486836"] },
    { name: "Portabebés o fular", why: "Para casa y recados cortos; manos libres y bebé tranquilo.", href: "/catalogo/portabebes/", must: true, price: 90, ids: ["44476485846", "44900890541"] },
    { name: "Bolso cambiador", why: "Vale cualquier mochila con un cambiador plegable dentro.", href: "/catalogo/accesorios-paseo/", must: false, price: 45, ids: ["45954135797"] },
    { name: "Saco de carrito o mono de invierno", why: "Para el capazo y la silla en los meses fríos; en verano, una muselina basta.", href: "/catalogo/accesorios-paseo/", must: true, price: 60, season: "invierno", ids: ["46548363571", "46548364819"] },
  ] },
  { name: "Para comer", items: [
    { name: "2 biberones de 150 ml y tetina de flujo lento", why: "Aunque des el pecho: para la leche extraída o por si acaso.", href: "/catalogo/biberones-y-menaje/", must: true, price: 20, ids: ["36352517683", "45391648081"] },
    { name: "Sacaleches", why: "Si vas a dar el pecho y volver al trabajo. Espera a ver cómo va la lactancia.", href: "/catalogo/lactancia/", must: false, price: 80, ids: ["44935725923", "39301900410"] },
    { name: "Esterilizador", why: "El microondas con una bolsa de esterilizar hace lo mismo; el eléctrico es comodidad.", href: "/catalogo/esterilizadores/", must: false, price: 50, ids: ["41760318249"] },
    { name: "Cojín de lactancia", why: "Ayuda las primeras semanas; después sirve para que el bebé se siente.", href: "/catalogo/lactancia/", must: false, price: 50, ids: ["45927001727", "39301708110"] },
    { name: "Trona", why: "No hasta los 6 meses. No la compres ahora.", href: "/catalogo/tronas/", must: false, price: 120 },
  ] },
  { name: "Para cambiar y bañar", items: [
    { name: "Pañales talla 1 (un paquete grande) y talla 2", why: "Unos 8 al día las primeras semanas. La talla 1 dura dos o tres semanas.", href: "/comparativas/panales/", must: true, price: 35, ids: ["35598993896", "42338427110"] },
    { name: "Toallitas sin perfume o de agua", why: "Para el primer mes, las de 99 % agua. Después, cualquiera sin perfume.", href: "/catalogo/toallitas/", must: true, price: 10, ids: ["35556761064", "35556761055"] },
    { name: "Crema de pañal", why: "Una de barrera (óxido de zinc) y listo. Capa fina en cada cambio.", href: "/comparativas/cremas-de-panal/", must: true, price: 10, ids: ["44796478650"] },
    { name: "Cambiador", why: "El colchón cambiador sobre la cómoda funciona igual que el mueble.", href: "/catalogo/baneras-y-cambiadores/", must: true, price: 50, ids: ["46548363063", "46503901548"] },
    { name: "Bañera", why: "Una sencilla con soporte o una plegable; el fregadero también sirve las primeras semanas.", href: "/catalogo/baneras-y-cambiadores/", must: true, price: 60, ids: ["39301700915", "45385687446"] },
    { name: "Gel y champú de bebé", why: "Uno solo, sin perfume. Con agua tibia basta la mayoría de los días.", href: "/catalogo/cuidado/", must: true, price: 6, ids: ["40320947513", "45391646916"] },
    { name: "Termómetro digital", why: "Axilar o rectal; el de oído no es fiable en recién nacidos.", href: "/catalogo/cuidado/", must: true, price: 8, ids: ["43018758297"] },
    { name: "Tijeras de uñas de bebé o lima", why: "Las uñas crecen rápido y se arañan la cara.", href: "/catalogo/cuidado/", must: true, price: 6 },
    { name: "Aspirador nasal", why: "Para los primeros resfriados, con suero fisiológico.", href: "/catalogo/cuidado/", must: false, price: 12 },
  ] },
  { name: "Ropa (talla 50–56 y 62)", items: [
    { name: "6–8 bodies de manga larga", why: "Con cierre en el hombro, para no pasarlos por la cabeza.", href: "/catalogo/ropa-de-cuna/", must: true, price: 35 },
    { name: "6 bodies de manga corta", why: "Para los días de calor, solos o debajo del pijama fino.", href: "/catalogo/ropa-de-cuna/", must: true, price: 25, season: "verano" },
    { name: "6 pijamas enteros", why: "Con cremallera mejor que con automáticos, para los cambios de noche.", href: "/catalogo/ropa-de-cuna/", must: true, price: 50 },
    { name: "3 pares de calcetines y un gorro", why: "Sin lazos. El gorro, solo para la calle.", href: "/catalogo/ropa-de-cuna/", must: true, price: 12 },
    { name: "4 muselinas grandes", why: "Sirven de arrullo, toalla, sombra en el carrito y paño para las regurgitaciones.", href: "/catalogo/ropa-de-cuna/", must: true, price: 25 },
    { name: "Un gorrito de sol y crema solar de bebé", why: "La crema, a partir de los 6 meses; antes, sombra y gorro.", href: "/catalogo/cuidado/", must: false, price: 15, season: "verano" },
  ] },
  { name: "Para casa", items: [
    { name: "Hamaca", why: "Para tenerlo cerca mientras cocinas o te duchas. A partir de las 2–3 semanas.", href: "/catalogo/hamacas-y-parques/", must: false, price: 70, ids: ["39301781706", "44891834551"] },
    { name: "Manta o gimnasio de actividades", why: "Para el suelo desde el primer mes: boca abajo unos minutos cada día.", href: "/catalogo/juguetes/", must: false, price: 50, ids: ["44938674624", "43960402922"] },
    { name: "Luz nocturna regulable", why: "Para las tomas de noche sin encender la habitación.", href: "/catalogo/muebles/", must: false, price: 20 },
    { name: "Humidificador", why: "Solo si la casa es muy seca; con calefacción de radiadores suele serlo.", href: "/catalogo/cuidado/", must: false, price: 50, season: "invierno", ids: ["44855930283"] },
  ] },
];
