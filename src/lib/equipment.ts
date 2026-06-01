import gtx from "@/assets/equipment/gtx_transparente.png";
import tpx from "@/assets/equipment/TPX_transparente.png";
import bmx from "@/assets/equipment/BMX_transparente.png";
import trx from "@/assets/equipment/TRX_transparente.png";
import thx from "@/assets/equipment/thx_transparente_2.png";
import tvx from "@/assets/equipment/tvx_transparente.png";
import psx from "@/assets/equipment/psx_transparente.png";
import tjx from "@/assets/equipment/tjx_transparente.png";
import plx from "@/assets/equipment/plx.jpg";

export type Equipment = {
  code: string;
  slug: string;
  name: string;
  category: string;
  image: string;
  description: string;
  overview: string;
  specs: { label: string; value: string }[];
  advantages: string[];
  applications: string[];
};

export const equipment: Equipment[] = [
  {
    code: "GTX",
    slug: "gtx",
    name: "Cizalla Giratoria Hidráulica",
    category: "Cizallamiento",
    image: gtx,
    description:
      "Convierte grandes volúmenes de chatarra en piezas más pequeñas, con capacidad de 5 a 10 toneladas por hora. Acelera la preparación y reduce costos operativos.",
    overview:
      "La Cizalla Giratoria Hidráulica GTX es el equipo ideal para patios de chatarra que necesitan procesar grandes volúmenes con agilidad. Su sistema rotativo permite alimentación continua, optimizando el flujo y reduciendo tiempos muertos. Construida con aceros de alta resistencia, está pensada para operación intensiva en condiciones exigentes.",
    specs: [
      { label: "Capacidad de producción", value: "5 a 10 t/h" },
      { label: "Fuerza de corte", value: "Hasta 600 toneladas" },
      { label: "Sistema", value: "Hidráulico con plato giratorio" },
      { label: "Normas de seguridad", value: "NR12" },
      { label: "Accionamiento", value: "Motor eléctrico de alto rendimiento" },
    ],
    advantages: [
      "Alta productividad con alimentación continua",
      "Reduce costos de mano de obra y manipulación",
      "Cuchillas de aleación especial con larga vida útil",
      "Mantenimiento simple y de bajo costo",
      "Construcción robusta para operación 24/7",
    ],
    applications: [
      "Procesamiento de chatarra ferrosa",
      "Preparación de material para fundición",
      "Patios de reciclaje de mediano y gran porte",
    ],
  },
  {
    code: "TPX",
    slug: "tpx",
    name: "Prensa Cizalla Automática",
    category: "Prensado y corte",
    image: tpx,
    description:
      "Diseñada para operación continua y de alta exigencia. Combina cizallamiento y enfardado en un solo equipo, ideal para perfiles y barras largas.",
    overview:
      "La TPX une dos operaciones esenciales — prensado y cizallamiento — en un solo equipo automático. Permite procesar perfiles, barras largas y chapas con altísima densidad final, lo que se traduce en menos viajes de transporte y mejor precio del material en la fundición.",
    specs: [
      { label: "Modo de operación", value: "Totalmente automático" },
      { label: "Fuerza de prensado", value: "Hasta 400 toneladas" },
      { label: "Fuerza de corte", value: "Hasta 500 toneladas" },
      { label: "Material", value: "Perfiles, barras, chapas ferrosas" },
      { label: "Normas de seguridad", value: "NR12 / CE" },
    ],
    advantages: [
      "Dos equipos en uno: prensa y cizalla",
      "Operación automática con bajo requerimiento de operador",
      "Fardos de altísima densidad",
      "Reduce volumen y costos de transporte",
      "Cuchillas reversibles que prolongan la vida útil",
    ],
    applications: [
      "Acerías y fundiciones",
      "Recicladoras de gran volumen",
      "Procesamiento de perfiles largos",
    ],
  },
  {
    code: "BMX",
    slug: "bmx",
    name: "Briquetadora Automática",
    category: "Briquetas",
    image: bmx,
    description:
      "Compacta chatarra metálica en briquetas de alta densidad, reduciendo volumen y optimizando el almacenamiento con bajo consumo energético.",
    overview:
      "La Briquetadora BMX transforma virutas, limaduras y chatarras finas en briquetas compactas de alta densidad. Esto agrega valor al material, facilita el transporte y permite reintroducir los metales al ciclo productivo con mayor eficiencia.",
    specs: [
      { label: "Densidad de la briqueta", value: "5 a 7 g/cm³" },
      { label: "Materiales", value: "Virutas de acero, aluminio, cobre, latón" },
      { label: "Consumo energético", value: "Optimizado, motor de alta eficiencia" },
      { label: "Operación", value: "Automática y continua" },
      { label: "Normas de seguridad", value: "NR12" },
    ],
    advantages: [
      "Mayor valor de venta del material compactado",
      "Reduce hasta 90% el volumen original",
      "Recupera fluidos de corte para reúso",
      "Bajo consumo energético por tonelada procesada",
      "Operación silenciosa y limpia",
    ],
    applications: [
      "Industrias metalmecánicas",
      "Talleres de mecanizado",
      "Recicladoras de virutas y limaduras",
    ],
  },
  {
    code: "TRX",
    slug: "trx",
    name: "Trituradores",
    category: "Trituración",
    image: trx,
    description:
      "Trituradores de última generación con la mejor relación costo-beneficio del mercado. Excelente fragmentación y consumo específico favorable.",
    overview:
      "Los trituradores TRX representan lo último en tecnología de fragmentación de chatarra. Diseñados para entregar la mejor relación costo-beneficio del mercado, ofrecen excelente calidad de fragmento y consumo energético específico altamente competitivo.",
    specs: [
      { label: "Capacidad", value: "Líneas de 20 a 200 t/h" },
      { label: "Potencia instalada", value: "Configurable según capacidad" },
      { label: "Tipo de material", value: "Chatarra mixta, electrodomésticos, vehículos" },
      { label: "Separación", value: "Magnética y por densidad integradas" },
      { label: "Normas de seguridad", value: "NR12 / internacionales" },
    ],
    advantages: [
      "Mejor relación costo-beneficio del mercado",
      "Excelente densidad y calidad de fragmento",
      "Bajo consumo energético por tonelada",
      "Separación automática de metálicos y no metálicos",
      "Tecnología comprobada en operación en Brasil y exterior",
    ],
    applications: [
      "Grandes recicladoras",
      "Procesamiento de vehículos al final de vida útil",
      "Procesamiento de línea blanca y mixtos",
    ],
  },
  {
    code: "THX",
    slug: "thx",
    name: "Cizalla Horizontal",
    category: "Cizallamiento",
    image: thx,
    description:
      "Equipo robusto y compacto, ideal para procesar todo tipo de chatarra como rieles y vehículos enteros, aumentando la densidad del material.",
    overview:
      "La Cizalla Horizontal THX es uno de los equipos más versátiles de la línea Conemag. Procesa desde rieles ferroviarios hasta vehículos enteros, generando material de alta densidad listo para fundición o exportación.",
    specs: [
      { label: "Fuerza de corte", value: "Hasta 1.000 toneladas" },
      { label: "Caja de prensado", value: "Disponible en varios tamaños" },
      { label: "Materiales", value: "Rieles, vehículos, chatarra pesada" },
      { label: "Operación", value: "Hidráulica automática" },
      { label: "Normas de seguridad", value: "NR12" },
    ],
    advantages: [
      "Procesa los materiales más exigentes del mercado",
      "Alta densidad final del producto",
      "Cuchillas reversibles de aleación especial",
      "Construcción robusta para vida útil prolongada",
      "Diseño compacto que requiere poco espacio",
    ],
    applications: [
      "Procesamiento de vehículos completos",
      "Corte de rieles y estructuras metálicas",
      "Patios de chatarra pesada",
    ],
  },
  {
    code: "TVX",
    slug: "tvx",
    name: "Cizalla Vertical",
    category: "Cizallamiento",
    image: tvx,
    description:
      "Cizalla vertical automática para procesamiento intensivo de chatarra, optimizando el uso de contenedores y agregando valor al material.",
    overview:
      "La Cizalla Vertical TVX está diseñada para operaciones intensivas donde el aprovechamiento del espacio es crítico. Su configuración vertical reduce la huella en el patio y entrega material en formato ideal para contenedores de exportación.",
    specs: [
      { label: "Fuerza de corte", value: "Hasta 800 toneladas" },
      { label: "Configuración", value: "Vertical, ahorra espacio" },
      { label: "Operación", value: "Automática" },
      { label: "Producto final", value: "Optimizado para contenedores" },
      { label: "Normas de seguridad", value: "NR12" },
    ],
    advantages: [
      "Diseño vertical que ahorra espacio en el patio",
      "Producto ideal para llenado de contenedores",
      "Operación automática y de alta productividad",
      "Bajo costo de mantenimiento",
      "Cuchillas reversibles de larga duración",
    ],
    applications: [
      "Patios con espacio limitado",
      "Exportación de chatarra en contenedores",
      "Recicladoras de mediano porte",
    ],
  },
  {
    code: "PSX",
    slug: "psx",
    name: "Prensa Caimán",
    category: "Prensado",
    image: psx,
    description:
      "Equipo de alto rendimiento, disponible en versión manual o automática. Produce fardos de alta densidad para fundición y transporte.",
    overview:
      "La Prensa Caimán PSX es un clásico modernizado: equipo confiable, de mantenimiento simple, que produce fardos de alta densidad. Disponible en versiones manual y automática para adaptarse al volumen y a la realidad operativa de cada cliente.",
    specs: [
      { label: "Fuerza de prensado", value: "Hasta 350 toneladas" },
      { label: "Versiones", value: "Manual y automática" },
      { label: "Material", value: "Chatarra ferrosa y no ferrosa liviana" },
      { label: "Operación", value: "Hidráulica" },
      { label: "Normas de seguridad", value: "NR12" },
    ],
    advantages: [
      "Excelente costo-beneficio",
      "Mantenimiento sencillo y económico",
      "Disponible en versión manual o automática",
      "Fardos de alta densidad listos para fundición",
      "Equipo comprobado en miles de operaciones",
    ],
    applications: [
      "Recicladoras de pequeño y mediano porte",
      "Procesamiento de chapas y materiales livianos",
      "Operaciones que buscan agilidad y simplicidad",
    ],
  },
  {
    code: "TJX",
    slug: "tjx",
    name: "Cizalla Caimán",
    category: "Cizallamiento",
    image: tjx,
    description:
      "Compacta y robusta, ideal para corte de chatarra. Cuchillas de aleación especial que pueden girarse 4 veces, aumentando su vida útil.",
    overview:
      "La Cizalla Caimán TJX es la solución ideal para quien necesita un equipo compacto, robusto y de bajo costo operativo para cortar chatarra metálica. Sus cuchillas de aleación especial pueden ser giradas 4 veces, multiplicando su vida útil.",
    specs: [
      { label: "Fuerza de corte", value: "Hasta 250 toneladas" },
      { label: "Cuchillas", value: "Aleación especial, reversibles 4 veces" },
      { label: "Tamaño", value: "Compacta, fácil de instalar" },
      { label: "Operación", value: "Hidráulica" },
      { label: "Normas de seguridad", value: "NR12" },
    ],
    advantages: [
      "Vida útil extendida de las cuchillas",
      "Equipo compacto que requiere poca obra civil",
      "Bajo costo operativo y de mantenimiento",
      "Robustez para operación continua",
      "Excelente para pequeñas y medianas recicladoras",
    ],
    applications: [
      "Corte de chatarra ferrosa",
      "Reducción de barras y perfiles",
      "Operaciones de pequeño y mediano porte",
    ],
  },
  {
    code: "PLX",
    slug: "plx",
    name: "Prensa Automática para Aluminio",
    category: "Prensado",
    image: plx,
    description:
      "Prensa continua diseñada para alta producción con bajos costos de mantenimiento, conforme a normas de seguridad NR12.",
    overview:
      "La PLX es una prensa automática continua diseñada específicamente para el procesamiento de aluminio y otros metales no ferrosos. Su operación continua entrega alta productividad con costos de mantenimiento reducidos.",
    specs: [
      { label: "Material", value: "Aluminio y no ferrosos" },
      { label: "Operación", value: "Continua automática" },
      { label: "Fuerza de prensado", value: "Configurable según aplicación" },
      { label: "Densidad final", value: "Alta, optimizada para fundición" },
      { label: "Normas de seguridad", value: "NR12" },
    ],
    advantages: [
      "Alta producción en régimen continuo",
      "Bajo costo de mantenimiento",
      "Específicamente diseñada para aluminio",
      "Cumple integralmente con NR12",
      "Producto final con excelente densidad",
    ],
    applications: [
      "Recicladoras de aluminio",
      "Industrias de fundición no ferrosa",
      "Procesamiento de latas y perfiles de aluminio",
    ],
  },
];

export const getEquipmentBySlug = (slug: string) =>
  equipment.find((e) => e.slug === slug);
