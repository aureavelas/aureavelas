const IMG = 'assets/img/';
const g = (file, label, small = false) => ({ src: IMG + file + '.webp', label, small });

/* Texto de las presentaciones, tal como aparece en el catálogo en PDF */
const TXT_PORTAVELA = 'Empaque encantador con ilustración tierna, ventana y moño.';
const TXT_TUL = 'Bolsa de tul con listón y etiqueta personalizada.';

const CATEGORIES = [
  { id: 'todos',     label: 'Todo' },
  { id: 'animalitos', label: 'Animalitos' },
  { id: 'cubos',     label: 'Cubos de luz' },
  { id: 'canastas',  label: 'Canastas y regalos' },
  { id: 'fe',        label: 'Fe y devoción' },
  { id: 'temporada', label: 'Temporada', seasonal: true },
  { id: 'aromas',    label: 'Aromatizantes' },
];

const PRODUCTS = [
  /* ───────────── ANIMALITOS (datos reales del PDF) ───────────── */
  {
    id: 'conejo-manitas', cat: 'animalitos', name: 'Conejo manitas', price: 35,
    desc: 'Conejo que forma un mini corazón con sus manitas. Ideal para cumpleaños, bautizo o baby shower.',
    presentations: [{ name: 'Portavelas', text: TXT_PORTAVELA }, { name: 'Tul', text: TXT_TUL }],
    gallery: [g('conejo', 'Vela'), g('conejo-vela', 'Vela y portavelas'), g('conejo-tul', 'Tul')],
  },
  {
    id: 'elefantito', cat: 'animalitos', name: 'Elefantito', price: 45,
    desc: 'Vela en forma de elefante caricaturesco, diseño alegre. Ideal para decorar espacios, regalar en baby shower, cumpleaños y bautizo.',
    presentations: [{ name: 'Portavelas', text: TXT_PORTAVELA }, { name: 'Tul', text: TXT_TUL }],
    gallery: [g('elefante-vela', 'Vela'), g('elefante-portavela', 'Portavelas'), g('elefante-tul', 'Tul')],
  },
  {
    id: 'borreguito', cat: 'animalitos', name: 'Borreguito', price: 45,
    desc: 'Vela en forma de tierno corderito con moño rojo. Diseño detallado y encantador, ideal para decorar espacios o regalar en cumpleaños, bautizo o baby shower.',
    presentations: [{ name: 'Portavelas', text: TXT_PORTAVELA }, { name: 'Tul', text: TXT_TUL }],
    gallery: [g('borrego', 'Vela'), g('borrego-portavela', 'Portavelas'), g('borrego-tul', 'Tul')],
  },
  {
    id: 'perrito-french', cat: 'animalitos', name: 'Perrito french', price: 45,
    desc: 'Vela en forma de adorable perrito con acabado texturizado que imita el pelaje. Un detalle encantador para decorar espacios o regalar en ocasiones especiales como cumpleaños, bautizo o baby shower.',
    presentations: [{ name: 'Portavelas', text: TXT_PORTAVELA }, { name: 'Tul', text: TXT_TUL }],
    gallery: [g('perrof', 'Vela'), g('perrof-portavela', 'Portavelas', true), g('perrof-tul', 'Tul', true)],
  },
  {
    id: 'osito-peluche', cat: 'animalitos', name: 'Osito peluche', price: 45,
    desc: 'Vela decorativa en forma de osito, tierna y única, ideal para regalar en baby shower, cumpleaños y bautizo o ambientar tus espacios.',
    presentations: [{ name: 'Portavelas', text: TXT_PORTAVELA }, { name: 'Tul', text: TXT_TUL }],
    gallery: [g('osop', 'Vela'), g('osop-portavela', 'Portavelas'), g('osop-tul', 'Tul')],
  },
  {
    id: 'perrito-seda', cat: 'animalitos', name: 'Perrito seda', price: 35,
    desc: 'Vela con detalles realistas en su pelaje, tierna y decorativa. Ideal para dar un toque acogedor y original a cualquier espacio y festejo como baby shower, bautizo o cumpleaños.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('perroseda', 'Vela'), g('perroseda-tul', 'Tul')],
  },

  /* ───────────── ANIMALITOS (relleno) ───────────── */
  {
    id: 'leoncito', cat: 'animalitos', name: 'Leoncito melena', price: 40, dummy: true,
    desc: 'Vela en forma de leoncito de melena suave y mirada dulce. Disponible en varios colores, ideal para baby shower, cumpleaños o como detalle de bienvenida.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('leon', 'Vela'), g('leon-tul', 'Tul'), g('leones', 'Colores')],
  },
  {
    id: 'gatitos', cat: 'animalitos', name: 'Gatitos curiosos', price: 45, dummy: true,
    desc: 'Pequeños gatitos de cera con acabado detallado, en colores a elegir. Un regalo travieso y encantador para los amantes de los michis.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('gatos', 'Colores')],
  },
  {
    id: 'osito-trenza', cat: 'animalitos', name: 'Osito en cestita trenzada', price: 35, dummy: true,
    desc: 'Osito de cera sobre una cestita trenzada que funciona como porta vela. Se adorna con globo o estrella para fiestas infantiles y baby shower.',
    gallery: [g('oso-estrella', 'Con estrella'), g('oso-globo', 'Con globo'), g('osos-juntos', 'Versiones')],
  },

  /* ───────────── CUBOS DE LUZ (datos reales del PDF) ───────────── */
  {
    id: 'cubo-de-luz', cat: 'cubos', name: 'Cubo de luz', price: 50,
    desc: 'Vela geométrica de diseño moderno, compuesta por esferas, ideal para celebraciones como boda, XV años, comunión, bautizo, baby shower o cumpleaños.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('cubo-luz3', 'Blanco'), g('cubo-luz2', 'Rosa'), g('cubo-luz3-tul', 'Blanco en tul'), g('cubo-luz2-tul', 'Rosa en tul'), g('cubos-luz', 'Colores')],
  },
  {
    id: 'cubo-de-luz-tricolor', cat: 'cubos', name: 'Cubo de luz tricolor', price: 50, maxColors: 3,
    desc: 'Vela geométrica personalizable, con opción de un solo tono elegante o hasta tres colores vibrantes para un efecto único.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('cubo-luz1', 'Tricolor'), g('cubo-luz1-tul', 'Tricolor en tul')],
  },
  {
    id: 'cubo-de-corazones', cat: 'cubos', name: 'Cubo de corazones', price: 55, maxColors: 3,
    desc: 'Vela decorativa con diseño geométrico de corazones, disponible en un solo tono elegante o combinando hasta tres colores para un efecto vibrante y personalizado, ideal para celebraciones como boda, XV años, comunión y bautizo.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('cubo-corazon-blanco', 'Blanco'), g('cubo-corazon3', 'Rosa'), g('cubo-corazon4-tul', 'Blanco en tul'), g('cubo-cruz3-tul', 'Coral en tul'),],
  },
  {
    id: 'cubo-de-corazones-tricolor', cat: 'cubos', name: 'Cubo de corazones tricolor', price: 55, maxColors: 3,
    desc: 'Vela geométrica personalizable de corazones, con opción de un solo tono elegante o hasta tres colores vibrantes para un efecto único.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('cubo-corazon1', 'Lila y rosa'), g('cubo-corazon1-tul', 'Lila y rosa en tul'), g('cubo-corazon2', 'Malva'), g('cubo-corazon2-tul', 'Malva en tul')],
    review: 'En el PDF este producto se llama "Cubo de luz tricolor" (igual que el de esferas). Aquí lo nombré "Cubo de corazones tricolor".',
  },

  /* ───────────── CANASTAS Y REGALOS ───────────── */
  {
    id: 'abrazo-floral-de-osito', cat: 'canastas', name: 'Abrazo floral de Osito', price: 170,
    desc: 'Un regalo lleno de ternura que alegra cualquier espacio o celebración. Esta encantadora canastita de mimbre contiene un adorable osito de peluche rodeado de coloridas flores, ¡listo para arrancar sonrisas! (Recuerda que puedes elegir el color del oso que más te guste).',
    includes: '1 osito, 4 margaritas de distintos colores, 4 panditas, 1 corazón.',
    gallery: [g('abrazo-floral', 'Canasta'), g('canastap-oso', 'En mano'), g('img-3350', 'Con base')],
  },
  {
    id: 'canasta-de-ensueno', cat: 'canastas', name: 'Canasta de Ensueño', price: 750,
    desc: 'Un regalo perfecto para celebrar momentos especiales, con nuestra canastita artesanal. Incluye figuras de cera detalladas y flores que no marchitan. Personaliza el color de tu osito para que combine perfectamente con tu estilo o evento. ¡Un detalle que enamora a primera vista! Esta delicada combinación de figuras y flores es ideal para baby showers, cumpleaños o simplemente para sorprender, crea un regalo único y lleno de cariño.',
    gallery: [g('canasta-ensueno', 'Canasta')],
    review: 'El PDF indica $35, pero parece bajo para una canasta de este tamaño (¿$135 o $350?). Confirmar el precio.',
  },
  {
    id: 'canasta-rosas-osito', cat: 'canastas', name: 'Canasta de rosas con osito', price: 750, dummy: true,
    desc: 'Canasta de mimbre con osito de cera, rosas y flores que no marchitan en tonos pastel. Un regalo muy especial para baby shower, cumpleaños o aniversarios.',
    gallery: [g('canasta-oso1', 'Rosa'), g('canasta-oso2', 'Lila')],
  },
  {
    id: 'canasta-abejita', cat: 'canastas', name: 'Canasta abejita lila', price: 750, dummy: true,
    desc: 'Canasta artesanal con figuritas de cera, rosas lilas y una abejita decorativa, rematada con moño. Perfecta para sorprender con un detalle delicado.',
    gallery: [g('canasta-abeja', 'Canasta')],
  },
  {
    id: 'canasta-mariposa', cat: 'canastas', name: 'Canasta mariposa', price: 250, dummy: true,
    desc: 'Canastita con borreguitos y perritos de cera entre flores, con moño lila y mariposa decorativa. Ideal para recibir a un bebé o regalar con cariño.',
    gallery: [g('canasta-mariposa', 'Canasta')],
  },
  {
    id: 'canasta-jardin-margaritas', cat: 'canastas', name: 'Canasta jardín de margaritas', price: 180, dummy: true,
    desc: 'Canasta con margaritas y flores de cera de colores brillantes que no se marchitan, con una mariposa decorativa. Alegría para cualquier espacio.',
    gallery: [g('canasta-flores', 'Canasta')],
  },
  {
    id: 'canasta-rosas-lilas', cat: 'canastas', name: 'Canasta rosas y lilas', price: 230, dummy: true,
    desc: 'Arreglo en canasta con rosas y florecillas de cera en tonos blancos y lilas. Un detalle elegante y duradero para cualquier ocasión.',
    gallery: [g('canasta-rosas', 'Canasta')],
  },
  {
    id: 'canasta-angelical', cat: 'canastas', name: 'Canasta angelical', price: 170, dummy: true,
    desc: 'Canasta blanca con ángel de cera y flores en tonos suaves. Pensada para bautizos, primeras comuniones y recuerdos llenos de fe.',
    gallery: [g('canasta-angel', 'Canasta')],
  },
  {
    id: 'canasta-perrito', cat: 'canastas', name: 'Canasta perrito cariñoso', price: 180, dummy: true,
    desc: 'Pequeña canasta con perritos de cera y flores. Un regalo tierno para los que aman a sus peludos.',
    gallery: [g('canasta-perroretrato', 'Canasta')],
  },
  {
    id: 'bolsita-thank-you', cat: 'canastas', name: 'Bolsita floral "Thank you"', price: 120, dummy: true,
    desc: 'Bolsita de regalo con arreglo de flores secas y de cera. Ideal para agradecer, felicitar o dar un detalle en fechas especiales.',
    gallery: [g('regalo-flores', 'Bolsita')],
  },
  {
    id: 'bolso-floral', cat: 'canastas', name: 'Bolso floral', price: 170, dummy: true,
    desc: 'Elegante bolso rosa con cadena dorada, lleno de girasoles, flores y detalles de cera. Un regalo para lucirse en cumpleaños, aniversarios o el Día de las Madres.',
    gallery: [g('bolso-flores', 'Bolso')],
  },
  {
    id: 'aro-de-luz-floral', cat: 'canastas', name: 'Aro de luz floral', price: 130, dummy: true,
    desc: 'Aro luminoso con luces cálidas y arreglo floral en la base. Una pieza decorativa para mesas de dulces, bodas, XV años o sesiones de fotos.',
    gallery: [g('arreglo-aro', 'Arreglo')],
  },

  /* ───────────── FE Y DEVOCIÓN (relleno) ───────────── */
  {
    id: 'cruz-de-flores', cat: 'fe', name: 'Cruz con flores', price: 60, dummy: true,
    desc: 'Vela en forma de cruz adornada con flores de cera en tonos blanco, lila o rosa. Un recuerdo ideal para bautizos, primeras comuniones y confirmaciones.',
    presentations: [{ name: 'Tul', text: TXT_TUL }],
    gallery: [g('cruz1', 'Blanca'), g('cruz2', 'Lila'), g('cruz3', 'Rosa'), g('cruz-tul', 'Lila en tul'), g('cruces', 'Colores')],
  },
  {
    id: 'cruz-de-rosas', cat: 'fe', name: 'Cruz de rosas', price: 65, dummy: true,
    desc: 'Cruz decorativa de cera con relieve de rosas en acabado blanco natural. Delicada y elegante para altares, recuerdos o regalo.',
    gallery: [g('cruzsola', 'Blanca')],
  },
  {
    id: 'virgen-guadalupe', cat: 'fe', name: 'Virgen con porta flores', price: 45, dummy: true,
    desc: 'Vela de la Virgen sobre una base redonda acompañada de pequeñas velitas en forma de flor. Disponible en rosa, lila y turquesa.',
    gallery: [g('virgen1', 'Rosa suave'), g('virgen2', 'Rosa'), g('virgen3', 'Turquesa')],
  },
  {
    id: 'angel-corazon', cat: 'fe', name: 'Ángel de la guarda', price: 40, dummy: true,
    desc: 'Vela en forma de ángel con corazón calado en el pecho. Un detalle protector para bautizos, bienvenida de bebé o primera comunión.',
    gallery: [g('angel', 'Blanco')],
  },
  {
    id: 'cruz-bautizo', cat: 'fe', name: 'Cruz Cristo', price: 40,
    desc: 'Cruz de cera con Cristo en relieve rodeado de rosas y contorno plateado. Un recuerdo elegante para bautizo, primera comunión o boda.',
    gallery: [g('cruz-bautizo', 'Cruz')],
  },
  {
    id: 'cruz-silueta', cat: 'fe', name: 'Cruz con silueta', price: 35,
    desc: 'Cruz de cera con la silueta de un niño o una niña en oración. Un recuerdo tierno para bautizo o primera comunión.',
    choice: { label: 'Silueta', options: ['Niño', 'Niña'] },
    gallery: [g('cruz-silueta', 'Cruz', true)],
  },

  /* ───────────── TEMPORADA · DÍA DE MUERTOS / HALLOWEEN (relleno) ───────────── */
  {
    id: 'calaveritas-de-colores', cat: 'temporada', name: 'Calaveritas de colores', price: 50, dummy: true,
    desc: 'Calaveras de cera en colores vivos: azul, rojo, morado, verde agua y amarillo. Perfectas para tu ofrenda o para decorar en Día de Muertos.',
    gallery: [g('calavera', 'Colores')],
  },
  {
    id: 'calaveras-alebrije', cat: 'temporada', name: 'Calaveras alebrije', price: 55, dummy: true,
    desc: 'Calaveritas de azúcar de cera pintadas a mano con motivos de alebrije. Un homenaje colorido a nuestras tradiciones.',
    gallery: [g('calavera-alebrije', 'Calaveras')],
  },
  {
    id: 'cruz-dia-de-muertos', cat: 'temporada', name: 'Cruz con nombre', price: 40, dummy: true,
    desc: 'Cruz de cera personalizada con el nombre de tu ser querido y flores de cempasúchil. Ideal para tu altar de Día de Muertos.',
    gallery: [g('cruz-ddm', 'Personalizada'), g('cruces-ddm', 'Tres nombres')],
  },
  {
    id: 'caldero-encantado', cat: 'temporada', name: 'Caldero encantado', price: 180, dummy: true,
    desc: 'Caldero negro con flores moradas y naranjas y un fantasmita de cera al centro. Un detalle de temporada que ilumina la noche de brujas.',
    gallery: [g('caldero-encantado', 'Encantado', true), g('caldero-floral', 'Floral')],
  },
  {
    id: 'osito-calabaza', cat: 'temporada', name: 'Osito calabaza', price: 50, dummy: true,
    desc: 'Osito de cera disfrazado de calabaza, perfecto para Halloween y fiestas de otoño.',
    gallery: [g('oso-calabaza', 'Pareja')],
  },
  {
    id: 'terrario-de-temporada', cat: 'temporada', name: 'Terrario de temporada', price: 140, dummy: true,
    desc: 'Charola decorada con perrito, calabazas, calaveritas y flores de cera en tonos naranja y amarillo. Una escena completa para tu mesa de temporada.',
    gallery: [g('terrario-perro', 'Terrario'), g('terrario-perro2', 'Detalle')],
  },

  /* ───────────── TEMPORADA · VELAS DE BARRO (relleno) ───────────── */
  {
    id: 'cazuelita-de-arroz', cat: 'temporada', name: 'Cazuelita de arroz', price: 50, dummy: true,
    desc: 'Vela en cazuela de barro que imita un plato de arroz rojo con chícharos. Un detalle original y muy mexicano.',
    gallery: [g('cazuela-arroz', 'Arroz')],
  },
  {
    id: 'cazuelita-arroz-con-leche', cat: 'temporada', name: 'Cazuelita de arroz con leche', price: 50, dummy: true,
    desc: 'Vela en cazuela de barro con apariencia de arroz con leche y canela. Dulce, decorativa y aromática.',
    gallery: [g('cazuela-arrozleche-larga', 'Larga'), g('cazuela-arrozleche-onda', 'Honda')],
  },
  {
    id: 'jarrita-de-cafe', cat: 'temporada', name: 'Jarrita de café', price: 45, dummy: true,
    desc: 'Vela en jarrita de barro con aroma a café y granos decorativos. Para amantes del café de olla.',
    gallery: [g('jarradbarro-cafe', 'Jarrita')],
  },
  {
    id: 'set-de-cazuelitas', cat: 'temporada', name: 'Set de cazuelitas', price: 225, dummy: true,
    desc: 'Colección de cinco velas en barro con distintos guisos. Una combinación creativa para regalar o decorar la cocina.',
    gallery: [g('barros-juntos', 'Set')],
  },

  /* ───────────── AROMATIZANTES (relleno) ───────────── */
  {
    id: 'aromatizantes', cat: 'aromas', name: 'Aromatizantes en lata', price: 80, dummy: true,
    desc: 'Cera aromática en forma de corazones en latita con tapa calada. Perfuma tus espacios en cualquiera de nuestros aromas.',
    gallery: [g('aromatizantes', 'Latas')],
  },
];

/* Colores y aromas del PDF (la sección "Colores a elegir" y "Aromas disponibles") */
const COLORS = [
  { name: 'Blanco Natural', hex: '#f6f3ec' },
  { name: 'Azul Índigo',    hex: '#2fb1d1' },
  { name: 'Azul Cielo',     hex: '#bfe6f4' },
  { name: 'Naranja',        hex: '#f6a85b' },
  { name: 'Rosa pastel',    hex: '#f7cdd6' },
  { name: 'Verde menta',    hex: '#bfe6c5' },
  { name: 'Lila Encanto',   hex: '#c9a8e6' },
];

const AROMAS = [
  'Vainilla Dulce', 'Lavanda Relajante', 'Canela y Especias', 'Cítricos Frescos',
  'Moka Café', 'Algodón de Azúcar', 'Gardenia Floral', 'Naranja Radiante',
];

/* Datos de contacto: déjalos vacíos ('') para ocultar el botón */
const CONTACT = {
  whatsapp: '522229609468',   // solo números con lada, ej. '5215512345678'
  instagram: '',  // usuario sin @, ej. 'aurea.velas'
};

/* Reglas del carrito: qué opciones se piden al agregar un producto.
   Todos los productos llevan "cantidad". Además:
   · colorCategories / colorIds  → piden COLOR (y presentación Vela sola / Portavelas / Tul si el producto la tiene)
   · basketCategories            → piden UN SOLO COLOR o DISTINTOS COLORES
   · aromaCategories / aromaIds  → piden AROMA (1 aroma; en canastas: 1 o hasta 2 aromas distintos) */
const CART_RULES = {
  colorCategories: ['animalitos', 'cubos', 'fe'],
  colorIds: ['calaveritas-de-colores'],
  basketCategories: ['canastas'],
  aromaCategories: ['animalitos', 'cubos', 'fe', 'canastas'],
  aromaIds: ['calaveritas-de-colores'],
  basketMaxAromas: 2,
};

/* Etiqueta para productos de temporada (se muestra en tarjeta, ficha y al filtrar) */
const SEASONAL = {
  categories: ['temporada'],
  badge: 'De temporada',
  note: 'Edición de temporada · disponible solo por tiempo limitado',
  banner: 'Estas velas son de temporada y estarán disponibles solo por tiempo limitado. ¡Pídelas antes de que se acaben!',
};

/* Tamaño de cada producto (ancho x alto). TODAS ESTAS MEDIDAS SON DE RELLENO:
   reemplázalas por las reales, una línea por producto. Si un producto no aparece
   aquí, simplemente no muestra la sección de tamaño. */
const SIZES = {
  'conejo-manitas': '5 cm x 7 cm',
  'elefantito': '6 cm x 7 cm',
  'borreguito': '5 cm x 7 cm',
  'perrito-french': '5 cm x 7 cm',
  'osito-peluche': '6 cm x 8 cm',
  'perrito-seda': '7 cm x 6 cm',
  'leoncito': '5 cm x 6 cm',
  'gatitos': '4 cm x 7 cm',
  'osito-trenza': '7 cm x 9 cm',
  'cubo-de-luz': '5 cm x 5 cm',
  'cubo-de-luz-tricolor': '5 cm x 5 cm',
  'cubo-de-corazones': '6 cm x 6 cm',
  'cubo-de-corazones-tricolor': '6 cm x 6 cm',
  'abrazo-floral-de-osito': '12 cm x 14 cm',
  'canasta-de-ensueno': '20 cm x 28 cm',
  'canasta-rosas-osito': '22 cm x 30 cm',
  'canasta-abejita': '20 cm x 28 cm',
  'canasta-mariposa': '18 cm x 26 cm',
  'canasta-jardin-margaritas': '20 cm x 28 cm',
  'canasta-rosas-lilas': '20 cm x 26 cm',
  'canasta-angelical': '22 cm x 30 cm',
  'canasta-perrito': '14 cm x 18 cm',
  'bolsita-thank-you': '12 cm x 16 cm',
  'bolso-floral': '25 cm x 20 cm',
  'aro-de-luz-floral': '40 cm x 50 cm',
  'cruz-de-flores': '6 cm x 9 cm',
  'cruz-de-rosas': '8 cm x 11 cm',
  'virgen-guadalupe': '10 cm x 12 cm',
  'angel-corazon': '8 cm x 10 cm',
  'calaveritas-de-colores': '4 cm x 5 cm',
  'calaveras-alebrije': '5 cm x 5 cm',
  'cruz-bautizo': '10 cm x 7 cm',
  'cruz-silueta': '10 cm x 7 cm',
  'cruz-dia-de-muertos': '6 cm x 10 cm',
  'caldero-encantado': '15 cm x 20 cm',
  'osito-calabaza': '5 cm x 6 cm',
  'terrario-de-temporada': '25 cm x 10 cm',
  'cazuelita-de-arroz': '9 cm x 6 cm',
  'cazuelita-arroz-con-leche': '9 cm x 6 cm',
  'jarrita-de-cafe': '6 cm x 7 cm',
  'set-de-cazuelitas': '30 cm x 20 cm',
  'aromatizantes': '6 cm x 3 cm',
};
