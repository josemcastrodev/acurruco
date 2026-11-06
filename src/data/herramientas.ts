/* Las herramientas: una entrada por cada una, con lo que necesita el hub, la cabecera de su página,
   el texto que explica cómo funciona (para quien lee y para Google) y sus preguntas frecuentes. */
export type Tool = {
  slug: string;            // carpeta bajo /herramientas/, o ruta completa si empieza por /
  href: string;
  name: string;            // nombre corto, para tarjetas y enlaces
  h1: string;              // titular de la página
  title: string;           // <title>
  description: string;     // meta description
  lead: string;            // frase bajo el titular
  teaser: string;          // frase de la tarjeta del hub
  photo: string;           // /img/photos/<x>.jpg (horizontal 3:2)
  alt: string;
  sample: string;          // lo que la tarjeta del hub enseña como muestra viva (texto base, el JS lo cambia)
  sections: { h: string; p: string[] }[];
  faq: [string, string][];
  links: [string, string][];
  saves?: boolean;         // guarda estado (navegador + enlace)
};

export const tools: Tool[] = [
  {
    slug: "semana-de-embarazo", href: "/herramientas/semana-de-embarazo/",
    name: "Semana de embarazo", h1: "¿De cuántas semanas estás?",
    title: "Calculadora de semanas de embarazo y fecha probable de parto · Acurruco",
    description: "Mete la fecha de tu última regla o la fecha de parto que te dieron y mira en qué semana y trimestre estás, cuánto queda, y qué conviene comprar en cada tramo.",
    lead: "Fecha de la última regla o fecha probable de parto, y te decimos la semana exacta, el trimestre, cuánto queda y qué va tocando comprar.",
    teaser: "Semana, trimestre, fecha probable de parto y qué comprar en cada tramo.",
    photo: "/img/photos/embarazo.jpg", alt: "Calendario de pared con una fecha rodeada y un body de recién nacido doblado al lado",
    sample: "Semana 24 · faltan 112 días",
    sections: [
      { h: "Cómo se calcula la fecha probable de parto", p: [
        "El embarazo se cuenta desde el primer día de la última regla, no desde la concepción, y dura de media 40 semanas: 280 días. Es la regla de Naegele, la misma que usa tu matrona: a la fecha de la última regla se le suman 280 días. Si tu ciclo es más largo o más corto de 28 días, la calculadora lo corrige: con ciclos de 35 días, por ejemplo, la ovulación llega una semana más tarde y la fecha se mueve otro tanto.",
        "La ecografía de las 12 semanas suele afinar esa fecha midiendo al bebé. Si en el informe te dieron una fecha probable de parto distinta, mete esa: manda sobre la de la regla.",
      ] },
      { h: "Qué significa la fecha", p: [
        "Solo un 4 % de los bebés nace el día exacto. La mayoría llega entre la semana 37 y la 42, así que lo útil no es el día sino la ventana: a partir de la 37 el embarazo es a término y todo debería estar listo en casa, con la bolsa del hospital preparada y la silla del coche instalada y probada.",
      ] },
      { h: "Qué comprar en cada trimestre", p: [
        "Primer trimestre: nada para el bebé. Segundo: las cosas grandes que hay que elegir con calma, porque hay que probarlas en el coche y en casa: la silla de coche, el carrito y la cuna o la minicuna. Tercer trimestre: lo que se consume y lo pequeño, de la lista de nacimiento, y la bolsa del hospital a partir de la semana 34. Los pañales de talla 1 duran dos o tres semanas: con un paquete grande basta para empezar.",
      ] },
    ],
    faq: [
      ["¿Las semanas de embarazo se cuentan desde la última regla o desde la concepción?", "Desde el primer día de la última regla. La concepción suele ocurrir unas dos semanas después, por eso en la semana 4 de embarazo el embrión tiene unas dos semanas."],
      ["¿Qué fecha vale más, la de la regla o la de la ecografía?", "La de la ecografía del primer trimestre, que mide al embrión y es más exacta, sobre todo si tus ciclos son irregulares. Si te dieron esa fecha, úsala en la calculadora."],
      ["¿Cuándo preparo la bolsa del hospital?", "Hacia la semana 34 o 35. A partir de la 37 el embarazo es a término y el parto puede llegar cualquier día."],
      ["¿Cuándo hay que tener la silla del coche?", "Antes de la semana 36, instalada y probada en tu coche. Es obligatoria para volver del hospital en coche y la primera vez cuesta anclarla bien."],
    ],
    links: [["La lista de nacimiento", "/lista-de-nacimiento/"], ["La bolsa del hospital", "/guias/bolsa-del-hospital/"], ["Elegir la silla de coche", "/comparativas/sillas-de-coche-i-size/"], ["Cuna, minicuna o colecho", "/comparativas/cunas-de-colecho/"]],
    saves: true,
  },
  {
    slug: "percentiles", href: "/herramientas/percentiles/",
    name: "Percentiles", h1: "En qué percentil está tu bebé",
    title: "Calculadora de percentiles de peso, talla y perímetro cefálico (OMS) · Acurruco",
    description: "Percentil de peso, talla y perímetro cefálico de 0 a 24 meses con las tablas de la OMS, las que usa tu pediatra. Con la curva y una explicación de qué significa.",
    lead: "Fecha de nacimiento, sexo y la última medida del pediatra. Usamos las tablas de la OMS, las mismas de la cartilla, y te enseñamos dónde cae en la curva.",
    teaser: "Peso, talla y cabeza frente a las tablas de la OMS, con la curva.",
    photo: "/img/photos/percentiles.jpg", alt: "Báscula de bebé y cinta métrica de costura sobre una mesa de madera clara",
    sample: "Peso en el percentil 54",
    sections: [
      { h: "Qué es un percentil", p: [
        "El percentil dice cuántos bebés sanos de la misma edad y sexo pesan o miden menos que el tuyo. En el percentil 30, el 30 % pesa menos y el 70 % más. No es una nota: el percentil 10 y el 90 son igual de normales. Lo que miran los pediatras es que el bebé siga más o menos su carril: un bebé que va por el 25 y se queda ahí está creciendo bien; uno que baja del 75 al 25 en dos meses merece una consulta.",
      ] },
      { h: "De dónde salen los datos", p: [
        "De los patrones de crecimiento de la OMS de 2006, construidos con bebés sanos de seis países alimentados con lactancia materna. Son los que usa la cartilla de salud en España y los que ve tu pediatra. Calculamos el percentil con los parámetros LMS de la OMS, mes a mes, de 0 a 24 meses. Para prematuros se usa la edad corregida hasta los dos años: restamos las semanas que faltaron para la 40.",
      ] },
      { h: "Cuándo preocuparse", p: [
        "Por debajo del percentil 3 o por encima del 97, o cuando cruza dos líneas de percentil hacia abajo, el pediatra suele mirar la alimentación y el desarrollo. Pero una medida suelta dice poco: la báscula de la farmacia, con ropa o sin ella, o después de una toma, mueve el resultado varios percentiles. Pésalo siempre igual y compara con la medida anterior, no con la de otro bebé.",
      ] },
    ],
    faq: [
      ["¿Es malo un percentil bajo?", "No por sí solo. Un bebé en el percentil 10 que sigue su curva está creciendo bien. Lo que importa es la tendencia, no el número."],
      ["¿Qué percentil es normal?", "Entre el 3 y el 97 se considera normal. El 50 es la mediana, no el objetivo."],
      ["¿Cómo calculo el percentil de un prematuro?", "Con la edad corregida: a la edad real se le restan las semanas de prematuridad. La calculadora lo hace si marcas las semanas de gestación al nacer."],
      ["¿Las tablas son las mismas para niños y niñas?", "No. La OMS publica tablas distintas por sexo porque las niñas pesan y miden de media algo menos."],
    ],
    links: [["Cuánto biberón le toca", "/herramientas/cuanto-biberon/"], ["Talla de pañal y de ropa por peso", "/herramientas/talla-de-panal-y-ropa/"], ["Qué necesita un recién nacido", "/guias/que-necesita-un-recien-nacido/"]],
    saves: true,
  },
  {
    slug: "ventanas-de-sueno", href: "/herramientas/ventanas-de-sueno/",
    name: "Ventanas de sueño", h1: "A qué hora le toca dormir",
    title: "Ventanas de sueño por edad: siestas y hora de acostar, calculadas · Acurruco",
    description: "Edad del bebé y hora a la que se ha despertado: te planifica las siestas del día y la hora de acostar según las ventanas de sueño de su edad.",
    lead: "Dinos su edad y a qué hora se ha despertado hoy. Te damos el plan del día: cuántas siestas, a qué hora y cuándo acostarlo.",
    teaser: "Cuántas siestas, a qué hora y cuándo acostarlo, según su edad.",
    photo: "/img/photos/sueno.jpg", alt: "Reloj despertador pequeño junto a un saco de dormir doblado y una luz nocturna apagada",
    sample: "3 siestas · a la cama a las 19:30",
    sections: [
      { h: "Qué es una ventana de sueño", p: [
        "Es el tiempo que un bebé aguanta despierto antes de necesitar dormir otra vez. Un recién nacido, de 45 a 60 minutos; a los seis meses, dos horas y media; con un año, tres o cuatro horas. Si lo acuestas dentro de la ventana, se duerme en diez o quince minutos; si te pasas, llega el llanto de cansancio y cuesta el doble. La calculadora suma las ventanas de su edad desde la hora a la que se despertó.",
      ] },
      { h: "Cuántas siestas por edad", p: [
        "De 0 a 3 meses, las siestas no tienen horario: cuatro o cinco al día, cuando toca. De 4 a 6 meses se ordenan en tres. De 7 a 13 meses, dos: una por la mañana y otra después de comer. A partir de los 15 o 18 meses, una sola siesta de hora y media o dos horas al mediodía, hasta los tres o cuatro años. La hora de acostar por la noche suele estar entre las 19 y las 20:30 durante todo el primer año.",
      ] },
      { h: "Lo que no hace la calculadora", p: [
        "Cada bebé tiene su margen, y una mala noche o unos dientes cambian el día. Usa el plan como guía: fíjate en las señales (bostezo, mirada perdida, frotarse los ojos) y adelanta la siesta si aparecen. Para que la siesta cuaje ayuda la misma rutina corta cada vez, la habitación en penumbra y un saco de dormir en vez de mantas, que además es más seguro.",
      ] },
    ],
    faq: [
      ["¿Cuánto tiene que dormir un bebé al día?", "Un recién nacido, de 14 a 17 horas; de 4 a 11 meses, de 12 a 15; de 1 a 2 años, de 11 a 14, siestas incluidas. Son los rangos de la Academia Americana de Medicina del Sueño."],
      ["¿Cuándo pasa a una sola siesta?", "Entre los 15 y los 18 meses, la mayoría. La señal es que la siesta de la mañana empieza a retrasar o a estropear la de la tarde."],
      ["¿A qué hora debería acostarse?", "Entre las 19 y las 20:30 el primer año. Más tarde no significa que duerma más por la mañana; suele ser al revés."],
      ["¿Hace falta vigilabebés?", "Solo si duerme en otra habitación. La AEP recomienda que el bebé duerma en la habitación de los padres, en su cuna, al menos los primeros seis meses."],
    ],
    links: [["Comparativa de cunas de colecho", "/comparativas/cunas-de-colecho/"], ["Qué saco de dormir (TOG) le toca", "/herramientas/que-saco-tog/"], ["Vigilabebés en el catálogo", "/catalogo/vigilabebes/"]],
  },
  {
    slug: "cuanto-biberon", href: "/herramientas/cuanto-biberon/",
    name: "Cuánto biberón", h1: "Cuánto biberón le toca",
    title: "Calculadora de biberón: cuántos ml por toma y cuántas tomas al día · Acurruco",
    description: "Peso y edad del bebé y te decimos cuántos ml de leche al día, cuántas tomas y cuánto por biberón, con la regla de 150 ml por kilo que usan los pediatras.",
    lead: "Peso y edad. Te decimos cuánta leche al día, en cuántas tomas y cuánto por biberón, con la regla que usan los pediatras: unos 150 ml por kilo y día.",
    teaser: "ml por toma y tomas al día según peso y edad.",
    photo: "/img/photos/biberon.jpg", alt: "Biberón con medidas visibles junto a un bote de leche de fórmula y una cuchara dosificadora",
    sample: "Unos 120 ml por toma, 7 tomas",
    sections: [
      { h: "La regla de los 150 ml por kilo", p: [
        "A partir de la primera o segunda semana, un bebé que toma fórmula necesita unos 150 ml de leche por kilo de peso y día, con un margen entre 120 y 180. Un bebé de 4 kg toma unos 600 ml al día; uno de 6 kg, unos 900. El tope ronda el litro: a partir de ahí, aunque siga creciendo, no sube, porque a los seis meses empieza la alimentación complementaria. Los primeros días son distintos: el estómago de un recién nacido es del tamaño de una cereza y toma 10 o 20 ml por vez.",
      ] },
      { h: "Cuántas tomas al día", p: [
        "Un recién nacido come cada dos o tres horas, de 8 a 12 veces al día, noche incluida. Al mes, 7 u 8 tomas; a los tres meses, 6; a los seis, 5. Al dividir la cantidad del día entre las tomas sale lo que lleva cada biberón, que es lo que te interesa a la hora de prepararlo. No hay que forzar: si deja 20 ml, los deja. Si se acaba todos los biberones y busca más, prepara 30 ml más.",
      ] },
      { h: "Si das el pecho", p: [
        "La calculadora sirve para la leche extraída: un bebé de pecho que toma biberón de leche materna necesita entre 90 y 150 ml por kilo, algo menos que con fórmula, porque la leche materna se digiere distinto y la cantidad cambia a lo largo del día. Si toma directamente del pecho, no hace falta medir nada: un bebé que moja cinco o seis pañales al día y gana peso está comiendo bien.",
      ] },
    ],
    faq: [
      ["¿Cuánto biberón toma un recién nacido?", "Los primeros dos o tres días, de 10 a 30 ml por toma. A la semana, 60 u 80 ml. Al mes, de 90 a 120 ml, entre 7 y 8 veces al día."],
      ["¿Cuánto toma un bebé de 3 meses?", "Unos 150 ml por kilo: para 6 kg, 900 ml al día en 6 tomas de 150 ml, más o menos."],
      ["¿Cuándo baja la cantidad de leche?", "A partir de los 6 meses, cuando empieza la alimentación complementaria. La leche sigue siendo lo principal hasta el año, pero baja de forma gradual a 500 o 600 ml."],
      ["¿Qué tetina uso?", "Flujo lento los primeros tres meses, aunque el bebé coma rápido. Si la toma dura más de 30 minutos o se queda dormido en cada biberón, prueba el flujo medio."],
    ],
    links: [["Leches de fórmula en el catálogo", "/catalogo/alimentacion-infantil/"], ["Biberones y esterilizadores", "/catalogo/biberones-y-menaje/"], ["Percentiles de peso", "/herramientas/percentiles/"]],
  },
  {
    slug: "que-silla-de-coche", href: "/herramientas/que-silla-de-coche/",
    name: "Qué silla de coche", h1: "Qué silla de coche le toca",
    title: "Qué silla de coche le toca por altura y peso (i-Size) y cuándo cambiarla · Acurruco",
    description: "Altura, peso y edad de tu bebé y te decimos qué tramo i-Size le corresponde, si puede ir de espaldas y cuándo tocará cambiar de silla, con las del catálogo que valen.",
    lead: "Su altura, su peso y su edad. Te decimos el tramo i-Size que le corresponde, cuánto le queda a la silla de ahora y cuál buscar después.",
    teaser: "Tramo i-Size por altura, cuándo cambiar y qué sillas valen.",
    photo: "/img/photos/silla-tramo.jpg", alt: "Metro de pared infantil de madera con marcas de altura y una silla de coche a contraluz",
    sample: "Portabebés 40–87 cm · cambia hacia los 12 meses",
    sections: [
      { h: "Por qué i-Size mira la altura", p: [
        "La norma europea actual, R129 o i-Size, clasifica las sillas por la altura del niño en centímetros, no por su peso ni por su edad. Un portabebés de 40 a 87 cm, una silla de 61 a 105 cm, un elevador de 100 a 150. La altura dice mejor que el peso si la cabeza queda dentro de la silla y si el arnés cae a la altura correcta de los hombros. El peso sigue contando como tope: la mayoría de portabebés aguantan hasta 13 kg, y las sillas de espaldas, hasta 18 o 20.",
      ] },
      { h: "Cuándo cambiar de silla", p: [
        "Se cambia cuando la cabeza asoma por encima del respaldo del portabebés, cuando pasa de la altura máxima o cuando supera el peso. No por la edad: un bebé grande puede necesitar silla a los 10 meses y uno pequeño ir en portabebés hasta los 15. Cambiar antes de tiempo es peor: la silla siguiente protege menos a un bebé pequeño. La calculadora estima cuánto le queda con las curvas de crecimiento de la OMS.",
      ] },
      { h: "De espaldas hasta los 4 años", p: [
        "La norma obliga a ir a contramarcha hasta los 15 meses. La DGT, la AEP y los tests de ADAC recomiendan seguir así hasta los 4 años o hasta los 105 cm: en un choque frontal, de espaldas la fuerza se reparte por toda la espalda y el cuello del niño, cinco veces más débil que el de un adulto, no tira de la cabeza. Las sillas de 61 a 105 cm van de espaldas todo el tramo; las giratorias facilitan sentarlo sin dejar de ir a contramarcha.",
      ] },
    ],
    faq: [
      ["¿Hasta cuándo va en el portabebés?", "Hasta los 87 cm o hasta que la cabeza pase el borde del respaldo, lo que llegue antes. Entre los 10 y los 15 meses para la mayoría."],
      ["¿Hasta cuándo tiene que ir de espaldas?", "Obligatorio hasta los 15 meses con i-Size. Recomendado hasta los 4 años o hasta los 105 cm."],
      ["¿Puedo poner la silla delante?", "Solo si no hay plazas traseras o están ocupadas por otras sillas, y siempre con el airbag del acompañante desconectado si la silla va de espaldas."],
      ["¿Vale una silla de 40 a 150 cm para todo?", "Protege menos en cada tramo que una silla específica, según ADAC. Si el presupuesto obliga, mejor un portabebés bueno ahora y una silla después."],
    ],
    links: [["Comparativa de sillas i-Size, con los tests de ADAC", "/comparativas/sillas-de-coche-i-size/"], ["Sillas de coche en el catálogo", "/catalogo/sillas-de-coche/"], ["Percentiles de talla", "/herramientas/percentiles/"]],
  },
  {
    slug: "que-saco-tog", href: "/herramientas/que-saco-tog/",
    name: "Qué saco (TOG)", h1: "Qué saco y cuántas capas, según la temperatura",
    title: "Qué TOG de saco y cuántas capas ponerle para dormir, según los grados · Acurruco",
    description: "Temperatura de la habitación y te decimos el TOG del saco de dormir y qué ropa ponerle debajo, para que no pase frío ni calor por la noche.",
    lead: "Dinos los grados que hay en la habitación. Te decimos el TOG del saco y lo que lleva debajo: body, pijama o nada.",
    teaser: "TOG del saco y ropa de debajo, según los grados.",
    photo: "/img/photos/tog.jpg", alt: "Termómetro de habitación sobre una cómoda junto a un saco de dormir de bebé doblado",
    sample: "A 21 °C: saco TOG 1 y pijama",
    sections: [
      { h: "Qué es el TOG", p: [
        "El TOG mide cuánto abriga una prenda. Un saco de 0,5 TOG es tela fina para el verano; 1 TOG, un saco de algodón de entretiempo; 2,5 TOG, uno acolchado para el invierno; 3,5 TOG, solo para habitaciones por debajo de 16 grados, que no son habituales en España. La temperatura ideal de la habitación está entre 18 y 21 grados; por encima de 24 conviene quitar capas y, si hace falta, ventilador que no apunte a la cuna.",
      ] },
      { h: "Por qué saco y no manta", p: [
        "El saco de dormir no se destapa ni se sube hasta la cara, por eso la AEP y las guías de sueño seguro lo recomiendan en vez de mantas, edredones y nórdicos durante todo el primer año. La talla importa: el cuello debe quedar ajustado para que la cabeza no pueda meterse dentro. Con dos sacos, uno de 1 TOG y otro de 2,5, cubres el año entero cambiando la ropa de debajo.",
      ] },
      { h: "Cómo saber si tiene frío o calor", p: [
        "Toca la nuca o el pecho, no las manos ni los pies, que suelen estar fríos aunque el bebé esté bien. Nuca sudada o caliente: sobra una capa. Pecho fresco: falta una. El sobrecalentamiento es un factor de riesgo de muerte súbita, así que ante la duda es mejor quitar que poner, y nunca gorro para dormir en casa.",
      ] },
    ],
    faq: [
      ["¿Qué TOG para 22 grados?", "Saco de 1 TOG con un pijama fino de manga larga, o de 0,5 TOG con pijama y body si el bebé es friolero."],
      ["¿Y para 18 grados?", "Saco de 2,5 TOG con body de manga larga y pijama."],
      ["¿A qué temperatura tiene que estar la habitación?", "Entre 18 y 21 grados es lo ideal. Un termómetro de habitación cuesta poco y quita muchas dudas."],
      ["¿Cuántos sacos necesito?", "Dos por talla, de TOG distintos: uno de 1 y otro de 2,5. Y uno de recambio para cuando el otro está en la lavadora, si puedes."],
    ],
    links: [["Sacos y ropa de cuna en el catálogo", "/catalogo/ropa-de-cuna/"], ["Ventanas de sueño por edad", "/herramientas/ventanas-de-sueno/"], ["Comparativa de cunas de colecho", "/comparativas/cunas-de-colecho/"]],
  },
  {
    slug: "talla-de-panal-y-ropa", href: "/herramientas/talla-de-panal-y-ropa/",
    name: "Talla de pañal y ropa", h1: "Qué talla de pañal y de ropa le toca",
    title: "Talla de pañal por peso (Dodot, Carrefour, Huggies) y talla de ropa por edad · Acurruco",
    description: "Peso del bebé y te decimos la talla de pañal en cada marca y la talla de ropa que le toca, y cuándo cambiará a la siguiente.",
    lead: "Su peso y su altura. Te decimos la talla de pañal en cada marca, la talla de ropa y cuándo pasará a la siguiente.",
    teaser: "Talla de pañal por marca y talla de ropa, por peso y altura.",
    photo: "/img/photos/tallas.jpg", alt: "Pañales de tres tallas apilados junto a bodies de recién nacido doblados por talla",
    sample: "Pañal talla 2 · ropa 62 (1–3 meses)",
    sections: [
      { h: "La talla de pañal va por peso", p: [
        "Cada marca marca sus tallas en kilos, y se solapan a propósito: la talla 2 va de 4 a 8 kg y la 3 de 6 a 10. En la zona de solape manda el ajuste: si el pañal deja marcas en los muslos, se escapa por arriba o cuesta cerrar las tiras en el centro, toca subir. Si quedan huecos en las piernas y se sale el pis, mejor bajar. Un pañal de talla mayor absorbe más y es más barato por kilo, pero si queda grande se escapa por los lados.",
      ] },
      { h: "La talla de ropa va por altura", p: [
        "En España la ropa de bebé se vende por meses, pero el número que importa es la altura en centímetros que aparece en la etiqueta: 50 (0 a 1 mes), 56 (1 mes), 62 (3 meses), 68 (6 meses), 74 (9 meses), 80 (12 meses), 86 (18 meses), 92 (24 meses). Un bebé que mide 60 cm a los seis semanas usa la 62 aunque la etiqueta diga 3 meses. Las marcas francesas y alemanas tallan grande; las españolas, algo más justo. Para regalar, mejor talla 68 o más: la 50 y la 56 se usan semanas.",
      ] },
      { h: "Cuánto dura cada talla", p: [
        "Un bebé medio gana de 150 a 200 g por semana los primeros tres meses: la talla 1 de pañal dura dos o tres semanas, la 2 unos dos meses, la 3 de los tres a los siete meses y la 4 el resto del primer año. En ropa, la 50 se queda pequeña al mes, la 56 a los dos meses y la 62 hacia los cuatro. La calculadora estima las fechas con las curvas de la OMS a partir del peso y la talla de hoy.",
      ] },
    ],
    faq: [
      ["¿Qué talla de pañal para 5 kg?", "Talla 2 en casi todas las marcas (de 4 a 8 kg). Si está al principio del rango y queda holgado, aún puede usar la 1."],
      ["¿Cuántos pañales de talla 1 compro?", "Un paquete grande, de 60 a 90 unidades. A 8 al día son dos semanas, que es lo que suele durar la talla."],
      ["¿Qué talla de ropa para un recién nacido?", "La 56 para la mayoría; la 50 solo para bebés de menos de 3 kg. Compra poco de la 50 y la 56: se quedan pequeñas en semanas."],
      ["¿La talla de pañal es igual en todas las marcas?", "Los rangos de kilos son parecidos, pero el corte no: algunas tallan más estrecho. Si cambias de marca, prueba un paquete pequeño."],
    ],
    links: [["Comparativa de pañales: precio por pañal talla a talla", "/comparativas/panales/"], ["Calculadora de pañales", "/herramientas/calculadora-de-panales/"], ["Percentiles de peso y talla", "/herramientas/percentiles/"]],
  },
  {
    slug: "calendario-de-vacunas", href: "/herramientas/calendario-de-vacunas/",
    name: "Calendario de vacunas", h1: "Sus vacunas, con fecha",
    title: "Calendario de vacunas 2026 del bebé por fecha de nacimiento (0 a 24 meses) · Acurruco",
    description: "Fecha de nacimiento y te damos las fechas de cada vacuna de los dos primeros años según el calendario común de 2026 del Consejo Interterritorial, y qué es cada una.",
    lead: "Su fecha de nacimiento y te damos la fecha de cada vacuna de los dos primeros años, según el calendario común de 2026, y qué protege cada una.",
    teaser: "Las fechas de cada vacuna de los dos primeros años.",
    photo: "/img/photos/vacunas.jpg", alt: "Cartilla de salud infantil abierta sobre una mesa con una tirita infantil y un peluche pequeño",
    sample: "Próxima: 2 meses, hexavalente, neumococo, MenB y rotavirus",
    sections: [
      { h: "De dónde sale el calendario", p: [
        "Del calendario común de vacunación e inmunización a lo largo de toda la vida para 2026, aprobado por el Consejo Interterritorial del Sistema Nacional de Salud el 12 de diciembre de 2025. Es el mínimo que aplican todas las comunidades autónomas; algunas añaden vacunas o adelantan dosis. Las fechas que calculamos son orientativas: el centro de salud te cita y, si una visita se retrasa, no pasa nada, se recupera en la siguiente.",
      ] },
      { h: "Qué se pone en cada visita", p: [
        "A los 2 y 4 meses, la hexavalente (difteria, tétanos, tosferina, polio, Haemophilus y hepatitis B), el neumococo, el meningococo B y el rotavirus, este último por boca. A los 4 meses se suma el meningococo C. A los 11, hexavalente y neumococo. A los 12, triple vírica, meningococo B y C. A los 15, varicela. Desde los 6 meses, la gripe cada otoño, y en el primer otoño o al nacer en temporada, el anticuerpo frente al virus respiratorio sincitial.",
      ] },
      { h: "Qué esperar después", p: [
        "Fiebre baja, irritabilidad y una zona dura y roja en el muslo son normales durante uno o dos días; la de los 12 meses puede dar fiebre y un sarpullido una semana después. Un termómetro digital en casa y paracetamol en gotas, solo si el pediatra lo indica, es cuanto hace falta. Ninguna vacuna del calendario se paga: todas son gratuitas en el centro de salud.",
      ] },
    ],
    faq: [
      ["¿Las vacunas del calendario son gratis?", "Sí, todas las del calendario común se ponen gratis en el centro de salud de la Seguridad Social."],
      ["¿Qué pasa si me retraso con una dosis?", "Se pone en cuanto se pueda; no hay que empezar de nuevo. Dosis puesta, dosis que cuenta."],
      ["¿Puede bañarse el día de la vacuna?", "Sí. El baño no afecta a la vacuna; evita frotar la zona del pinchazo."],
      ["¿El calendario es igual en toda España?", "El común es el mínimo. Algunas comunidades añaden vacunas (como la del rotavirus financiada o la de la gripe nasal) o adelantan dosis. Consulta el de la tuya."],
    ],
    links: [["Termómetros y cuidado en el catálogo", "/catalogo/cuidado/"], ["Qué necesita un recién nacido", "/guias/que-necesita-un-recien-nacido/"], ["Percentiles de peso y talla", "/herramientas/percentiles/"]],
    saves: true,
  },
  {
    slug: "calculadora-de-panales", href: "/herramientas/calculadora-de-panales/",
    name: "Calculadora de pañales", h1: "Cuántos pañales va a gastar",
    title: "Calculadora de pañales: cuántos al mes y cuánto cuesta cada marca · Acurruco",
    description: "Edad del bebé y te decimos cuántos pañales gasta al día y al mes, la talla, y lo que cuesta al mes en cada marca con precios de hoy.",
    lead: "Un recién nacido moja unos ocho al día; con un año, cuatro o cinco. Mueve la edad y compara lo que cuesta al mes cada marca, con los precios de hoy.",
    teaser: "Pañales al mes y coste por marca, por edad.",
    photo: "/img/photos/panales-calc.jpg", alt: "Pañales apilados en columnas de distinta altura, como un gráfico de barras, sobre una mesa clara",
    sample: "240 pañales al mes · desde 36 €",
    sections: [
      { h: "Cuántos pañales gasta un bebé", p: [
        "Un recién nacido moja de 8 a 10 pañales al día; con un mes, 7 u 8; de los 3 a los 6 meses, 6; de los 6 a los 12, 5; en el segundo año, 4 o 5. En total, unos 2.500 el primer año y 1.600 el segundo. Multiplicado por el precio por pañal, es la segunda partida del presupuesto después de la leche de fórmula, y la única en la que cambiar de marca ahorra cientos de euros sin perder nada.",
      ] },
      { h: "Precio por pañal, no por paquete", p: [
        "Los paquetes traen cantidades distintas, así que lo que hay que comparar es el precio por pañal, que ponemos en la comparativa talla a talla con los precios de Carrefour actualizados cada día. Las marcas blancas de Carrefour y Mercadona cuestan la mitad que Dodot y en los análisis de la OCU quedan al mismo nivel de absorción. Lo que sí varía es el corte y el tacto: prueba un paquete pequeño antes de comprar por cajas.",
      ] },
      { h: "Cómo usar la calculadora", p: [
        "Mueve la edad y mira el gasto mensual de cada marca con el precio por pañal de hoy. La diferencia anual que aparece abajo es lo que ahorras con la marca más barata frente a la más cara, a la misma cantidad de pañales. Es una estimación: hay bebés que mojan más y bebés que menos.",
      ] },
    ],
    faq: [
      ["¿Cuántos pañales gasta un recién nacido?", "De 8 a 10 al día las primeras semanas: unos 250 al mes."],
      ["¿Cuántos pañales se usan el primer año?", "Alrededor de 2.500, entre las tallas 1 y 4."],
      ["¿Merece la pena la marca blanca?", "Según la OCU, sí: absorben igual y cuestan la mitad. Dodot gana en suavidad y ajuste, que para algunos bebés importa."],
      ["¿Cuántos pañales de cada talla compro?", "Talla 1, un paquete grande; talla 2, dos meses; talla 3, cuatro meses; talla 4, cinco o seis. Compra por cajas solo a partir de la talla 3."],
    ],
    links: [["Comparativa de pañales, talla a talla", "/comparativas/panales/"], ["Pañales en el catálogo", "/catalogo/panales/"], ["Talla de pañal por peso", "/herramientas/talla-de-panal-y-ropa/"]],
  },
  {
    slug: "/lista-de-nacimiento/", href: "/lista-de-nacimiento/",
    name: "Lista de nacimiento", h1: "La lista de nacimiento",
    title: "Lista de nacimiento: qué necesita un recién nacido de verdad, con precios · Acurruco",
    description: "31 cosas, 19 imprescindibles y el resto puede esperar. Marca lo que ya tienes, lo que te regalan y lo que falta, mira cuánto cuesta y comparte la lista con un enlace.",
    lead: "Lo que hace falta de verdad para un recién nacido, con lo que puede esperar. Marca lo que ya tienes y lo que te regalan, mira cuánto falta y compártela con un enlace.",
    teaser: "31 cosas, lo que falta y cuánto cuesta. Se comparte con un enlace.",
    photo: "/img/photos/lista.jpg", alt: "Lo imprescindible de un recién nacido ordenado sobre una sábana de lino",
    sample: "0 de 31 marcadas",
    sections: [], faq: [], links: [], saves: true,
  },
  {
    slug: "presupuesto-primer-ano", href: "/herramientas/presupuesto-primer-ano/",
    name: "Presupuesto del primer año", h1: "Cuánto cuesta un bebé el primer año",
    title: "Cuánto cuesta un bebé el primer año: calculadora por partidas y por meses · Acurruco",
    description: "Presupuesto del primer año partida por partida y mes a mes, en tres niveles de gasto, ajustable a tu caso: lactancia, guardería, segundo hijo. Con enlace para compartir.",
    lead: "Partida por partida y mes a mes, en tres niveles de gasto. Ajústalo a tu caso: lactancia o fórmula, guardería, segundo hijo. Se comparte con un enlace.",
    teaser: "Partida por partida y mes a mes, ajustable a tu caso.",
    photo: "/img/photos/presupuesto.jpg", alt: "Cuaderno de cuentas, calculadora y un chupete sobre una mesa de cocina",
    sample: "Nivel medio: 4.300 € el primer año",
    sections: [], faq: [], links: [], saves: true,
  },
];

export const byHref = (href: string) => tools.find((t) => t.href === href)!;
