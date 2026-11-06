/* Las guías de regalo: el texto que explica cada edad. Los productos salen de regalos.json. */
export const edades = [
  {
    slug: "recien-nacido", age: "0 a 3 meses", title: "Qué regalar a un recién nacido", short: "Recién nacido",
    h: "Regalos para un recién nacido (0–3 meses)",
    intro: "Un recién nacido no necesita juguetes: necesita dormir, comer y estar en brazos. Los mejores regalos son los que le hacen la vida más fácil a los padres o los que el bebé usará de verdad en sus primeras semanas.",
    bullets: [
      "Lo que más se agradece: muselinas grandes, un saco de dormir de su talla, un buen portabebés y un vigilabebés sin app.",
      "Lo que menos: peluches enormes, ropa de talla 0 (la usan dos semanas) y juguetes con pilas.",
      "Si no conoces bien a la familia, acierta con un regalo de uso diario: pañales de la talla 2 o una crema de pañal buena nunca sobran.",
    ],
    budget: [["Hasta 25 €", "muselinas, un sonajero de madera, un mordedor de caucho natural"], ["25 a 60 €", "saco de dormir, móvil de cuna, proyector de luz y sonidos"], ["Más de 60 €", "portabebés ergonómico, vigilabebés, hamaca"]],
    faq: [["¿Se regala ropa a un recién nacido?", "Sí, pero de talla 3–6 meses o más: la de recién nacido se queda pequeña en días. Y sin lazos, botones en la espalda ni cuellos cerrados."], ["¿Y un peluche?", "Mejor pequeño, lavable y sin partes sueltas. Hasta los 12 meses no debe dormir con él en la cuna, por seguridad."]],
  },
  {
    slug: "3-6-meses", age: "3 a 6 meses", title: "Regalos para bebés de 3 a 6 meses", short: "3 a 6 meses",
    h: "Regalos para un bebé de 3 a 6 meses",
    intro: "A los tres meses el bebé ya mira, agarra y se lleva todo a la boca; a los cinco empieza a girarse. Los regalos que funcionan son los que puede explorar con las manos y la boca, y los que le permiten estar en el suelo con seguridad.",
    bullets: [
      "Un gimnasio de actividades o una alfombra de juego grande es el regalo estrella de esta edad.",
      "Mordedores de caucho natural o silicona, sonajeros ligeros y libros de tela: baratos y muy usados.",
      "Una hamaca o balancín para la cocina y el baño: los padres lo agradecen más que el bebé.",
    ],
    budget: [["Hasta 25 €", "mordedores, sonajeros, libros de tela, espejo irrompible"], ["25 a 60 €", "gimnasio de actividades, alfombra de juego, pelota sensorial"], ["Más de 60 €", "hamaca o balancín, parque de juego"]],
    faq: [["¿Qué juguete le gusta más a un bebé de 4 meses?", "Lo que suena al moverlo y cabe en su mano. Un sonajero ligero y un mordedor con textura ganan a cualquier juguete electrónico."], ["¿Un tacatá o andador?", "No a esta edad, y los pediatras no lo recomiendan a ninguna. Un parque o una alfombra grande le deja moverse mejor."]],
  },
  {
    slug: "6-12-meses", age: "6 a 12 meses", title: "Regalos para bebés de 6 a 12 meses", short: "6 a 12 meses",
    h: "Regalos para un bebé de 6 a 12 meses",
    intro: "Se sienta, gatea, se pone de pie agarrado y empieza a comer de todo. Es la edad de los apilables, los cubos encajables, los juguetes de arrastre y los libros de cartón. Todo lo que pueda meter y sacar, tirar y volver a poner.",
    bullets: [
      "Apilables, bloques de madera y encajables sencillos: los juguetes que duran hasta los dos años.",
      "Un correpasillos de madera para cuando empiece a ponerse de pie, hacia los diez meses.",
      "Para los padres: una trona que se limpie bien, o un juguete de baño que no acumule moho.",
    ],
    budget: [["Hasta 25 €", "apilable, libro de cartón, juguete de baño, cubo con formas"], ["25 a 60 €", "bloques de madera, mesa de actividades, correpasillos"], ["Más de 60 €", "trona evolutiva, parque, triciclo evolutivo"]],
    faq: [["¿Qué le regalo por su primer cumpleaños?", "Algo que le dure: bloques de madera, un correpasillos o un triciclo evolutivo. Y para los padres, un álbum o un marco con su huella."], ["¿Juguetes con luces y sonidos?", "Le llaman la atención, pero se cansan en semanas. Si regalas uno, que tenga botón de apagado y volumen bajo."]],
  },
  {
    slug: "1-ano", age: "1 a 2 años", title: "Regalos para niños de 1 a 2 años", short: "1 a 2 años",
    h: "Regalos para un niño de 1 a 2 años",
    intro: "Ya anda, imita todo lo que ve y quiere hacer las cosas solo. Funcionan los juguetes de imitación (cocinita, herramientas), los de movimiento (correpasillos, triciclo, moto sin pedales) y los puzles de pocas piezas.",
    bullets: [
      "Correpasillos y triciclos evolutivos: el regalo de los abuelos que más se usa.",
      "Juguetes de madera de imitación: cocinita, cajas de herramientas, garajes con coches.",
      "Puzles de encajar de madera, bloques grandes y libros de cartón con solapas.",
    ],
    budget: [["Hasta 25 €", "puzle de madera, libro con solapas, coches de madera"], ["25 a 60 €", "bloques grandes, mesa musical, juguete de arrastre"], ["Más de 60 €", "triciclo evolutivo, cocinita, moto sin pedales"]],
    faq: [["¿Qué regalar a un niño de 18 meses?", "Algo con lo que pueda hacer cosas: una cocinita, una caja de herramientas o un cubo con pala para el parque. A esa edad imita y quiere ayudar."], ["¿Pantallas?", "La Asociación Española de Pediatría recomienda nada de pantallas antes de los dos años. Un libro con solapas o un juguete musical cubren esa curiosidad."]],
  },
  {
    slug: "navidad", age: "Navidad", title: "Regalos de Navidad para bebés", short: "Navidad",
    h: "Regalos de Navidad para bebés de 0 a 2 años",
    intro: "La primera Navidad de un bebé es sobre todo para los padres y los abuelos. Lo que mejor funciona: un regalo que dure (madera, buen textil), uno que el bebé use ese mismo mes y, si el presupuesto lo permite, uno de los grandes que la familia no se compraría sola.",
    bullets: [
      "Compra con antelación: en la segunda semana de diciembre los carritos y las tronas más vendidas se agotan en las tiendas online.",
      "Pregunta antes de regalar algo grande (trona, hamaca, parque): en una casa pequeña no cabe dos veces.",
      "Para repartir entre varios: un vigilabebés o un portabebés bueno son regalos de grupo perfectos.",
    ],
    budget: [["Hasta 25 €", "sonajero y mordedor de madera, libro de tela, muselina bonita"], ["25 a 60 €", "gimnasio de actividades, proyector de nanas, correpasillos"], ["Más de 60 €", "vigilabebés, portabebés, hamaca, triciclo evolutivo"]],
    faq: [["¿Cuándo comprar los regalos de Navidad de un bebé?", "Antes del 10 de diciembre si es algo grande. Las devoluciones de Amazon y Carrefour llegan hasta mediados de enero en campaña de Navidad, así que no pasa nada por adelantarse."], ["¿Qué regalar a un bebé de 2 meses en Navidad?", "Lo mismo que a un recién nacido: textil, un proyector de luz suave, y a los padres, tiempo: un vigilabebés o un portabebés."]],
  },
];
