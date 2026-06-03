import gtx from "@/assets/equipment/gtx_transparente.png";
import tpx from "@/assets/equipment/TPX_transparente.png";
import bmx from "@/assets/equipment/BMX_transparente.png";
import trx from "@/assets/equipment/TRX_transparente.png";
import thx from "@/assets/equipment/thx_transparente_2.png";
import tvx from "@/assets/equipment/tvx_transparente.png";
import psx from "@/assets/equipment/psx_transparente.png";
import tjx from "@/assets/equipment/tjx_transparente.png";
import plx from "@/assets/equipment/plx.jpg";

import type { Locale } from "./i18n";

export type CategoryKey = "prensas" | "tesouras" | "briquetadeiras" | "trituradores";

type Localized = {
  name: string;
  category: string;
  description: string;
  overview: string;
  specs: { label: string; value: string }[];
  advantages: string[];
  applications: string[];
};

export type EquipmentRaw = {
  code: string;
  slug: string;
  image: string;
  categoryKey: CategoryKey;
  i18n: Record<Locale, Localized>;
};

export type Equipment = {
  code: string;
  slug: string;
  image: string;
  categoryKey: CategoryKey;
} & Localized;

export const equipmentRaw: EquipmentRaw[] = [
  {
    code: "GTX", categoryKey: "tesouras", slug: "gtx", image: gtx,
    i18n: {
      pt: {
        name: "Tesoura Giratória Hidráulica",
        category: "Cisalhamento",
        description: "Converte grandes volumes de sucata em peças menores, com capacidade de 5 a 10 toneladas por hora. Acelera a preparação e reduz custos operacionais.",
        overview: "A Tesoura Giratória Hidráulica GTX é o equipamento ideal para pátios de sucata que precisam processar grandes volumes com agilidade. Seu sistema rotativo permite alimentação contínua, otimizando o fluxo e reduzindo tempos mortos. Construída com aços de alta resistência, é projetada para operação intensiva em condições exigentes.",
        specs: [
          { label: "Capacidade de produção", value: "5 a 10 t/h" },
          { label: "Força de corte", value: "Até 600 toneladas" },
          { label: "Sistema", value: "Hidráulico com prato giratório" },
          { label: "Normas de segurança", value: "NR12" },
          { label: "Acionamento", value: "Motor elétrico de alto rendimento" },
        ],
        advantages: ["Alta produtividade com alimentação contínua","Reduz custos de mão de obra e manuseio","Facas de liga especial com longa vida útil","Manutenção simples e de baixo custo","Construção robusta para operação 24/7"],
        applications: ["Processamento de sucata ferrosa","Preparação de material para fundição","Pátios de reciclagem de médio e grande porte"],
      },
      en: {
        name: "Hydraulic Rotary Shear",
        category: "Shearing",
        description: "Converts large volumes of scrap into smaller pieces, with a capacity of 5 to 10 tons per hour. Speeds up preparation and reduces operating costs.",
        overview: "The GTX Hydraulic Rotary Shear is the ideal equipment for scrap yards that need to process large volumes quickly. Its rotary system enables continuous feeding, optimizing flow and reducing downtime. Built with high-strength steel, it is designed for intensive operation under demanding conditions.",
        specs: [
          { label: "Production capacity", value: "5 to 10 t/h" },
          { label: "Cutting force", value: "Up to 600 tons" },
          { label: "System", value: "Hydraulic with rotary plate" },
          { label: "Safety standards", value: "NR12" },
          { label: "Drive", value: "High-efficiency electric motor" },
        ],
        advantages: ["High productivity with continuous feeding","Reduces labor and handling costs","Special alloy blades with long lifespan","Simple, low-cost maintenance","Robust construction for 24/7 operation"],
        applications: ["Ferrous scrap processing","Material preparation for foundries","Medium and large-scale recycling yards"],
      },
      es: {
        name: "Cizalla Giratoria Hidráulica",
        category: "Cizallamiento",
        description: "Convierte grandes volúmenes de chatarra en piezas más pequeñas, con capacidad de 5 a 10 toneladas por hora. Acelera la preparación y reduce costos operativos.",
        overview: "La Cizalla Giratoria Hidráulica GTX es el equipo ideal para patios de chatarra que necesitan procesar grandes volúmenes con agilidad. Su sistema rotativo permite alimentación continua, optimizando el flujo y reduciendo tiempos muertos. Construida con aceros de alta resistencia, está pensada para operación intensiva en condiciones exigentes.",
        specs: [
          { label: "Capacidad de producción", value: "5 a 10 t/h" },
          { label: "Fuerza de corte", value: "Hasta 600 toneladas" },
          { label: "Sistema", value: "Hidráulico con plato giratorio" },
          { label: "Normas de seguridad", value: "NR12" },
          { label: "Accionamiento", value: "Motor eléctrico de alto rendimiento" },
        ],
        advantages: ["Alta productividad con alimentación continua","Reduce costos de mano de obra y manipulación","Cuchillas de aleación especial con larga vida útil","Mantenimiento simple y de bajo costo","Construcción robusta para operación 24/7"],
        applications: ["Procesamiento de chatarra ferrosa","Preparación de material para fundición","Patios de reciclaje de mediano y gran porte"],
      },
    },
  },
  {
    code: "TPX", categoryKey: "prensas", slug: "tpx", image: tpx,
    i18n: {
      pt: {
        name: "Prensa Tesoura Automática", category: "Prensagem e corte",
        description: "Projetada para operação contínua e de alta exigência. Combina cisalhamento e enfardamento em um único equipamento, ideal para perfis e barras longas.",
        overview: "A TPX une duas operações essenciais — prensagem e cisalhamento — em um único equipamento automático. Permite processar perfis, barras longas e chapas com altíssima densidade final, o que se traduz em menos viagens de transporte e melhor preço do material na fundição.",
        specs: [
          { label: "Modo de operação", value: "Totalmente automático" },
          { label: "Força de prensagem", value: "Até 400 toneladas" },
          { label: "Força de corte", value: "Até 500 toneladas" },
          { label: "Material", value: "Perfis, barras, chapas ferrosas" },
          { label: "Normas de segurança", value: "NR12 / CE" },
        ],
        advantages: ["Dois equipamentos em um: prensa e tesoura","Operação automática com baixa demanda de operador","Fardos de altíssima densidade","Reduz volume e custos de transporte","Facas reversíveis que prolongam a vida útil"],
        applications: ["Aciarias e fundições","Recicladoras de grande volume","Processamento de perfis longos"],
      },
      en: {
        name: "Automatic Shear Press", category: "Pressing and cutting",
        description: "Designed for continuous, high-demand operation. Combines shearing and baling in a single machine, ideal for profiles and long bars.",
        overview: "The TPX combines two essential operations — pressing and shearing — in a single automatic machine. It processes profiles, long bars and sheets with very high final density, meaning fewer transport trips and better material pricing at the foundry.",
        specs: [
          { label: "Operation mode", value: "Fully automatic" },
          { label: "Pressing force", value: "Up to 400 tons" },
          { label: "Cutting force", value: "Up to 500 tons" },
          { label: "Material", value: "Ferrous profiles, bars, sheets" },
          { label: "Safety standards", value: "NR12 / CE" },
        ],
        advantages: ["Two machines in one: press and shear","Automatic operation with low operator demand","Very high density bales","Reduces volume and transport costs","Reversible blades that extend lifespan"],
        applications: ["Steel mills and foundries","Large-volume recyclers","Long profile processing"],
      },
      es: {
        name: "Prensa Cizalla Automática", category: "Prensado y corte",
        description: "Diseñada para operación continua y de alta exigencia. Combina cizallamiento y enfardado en un solo equipo, ideal para perfiles y barras largas.",
        overview: "La TPX une dos operaciones esenciales — prensado y cizallamiento — en un solo equipo automático. Permite procesar perfiles, barras largas y chapas con altísima densidad final, lo que se traduce en menos viajes de transporte y mejor precio del material en la fundición.",
        specs: [
          { label: "Modo de operación", value: "Totalmente automático" },
          { label: "Fuerza de prensado", value: "Hasta 400 toneladas" },
          { label: "Fuerza de corte", value: "Hasta 500 toneladas" },
          { label: "Material", value: "Perfiles, barras, chapas ferrosas" },
          { label: "Normas de seguridad", value: "NR12 / CE" },
        ],
        advantages: ["Dos equipos en uno: prensa y cizalla","Operación automática con bajo requerimiento de operador","Fardos de altísima densidad","Reduce volumen y costos de transporte","Cuchillas reversibles que prolongan la vida útil"],
        applications: ["Acerías y fundiciones","Recicladoras de gran volumen","Procesamiento de perfiles largos"],
      },
    },
  },
  {
    code: "BMX", categoryKey: "briquetadeiras", slug: "bmx", image: bmx,
    i18n: {
      pt: {
        name: "Briquetadeira Automática", category: "Briquetes",
        description: "Compacta sucata metálica em briquetes de alta densidade, reduzindo volume e otimizando o armazenamento com baixo consumo energético.",
        overview: "A Briquetadeira BMX transforma cavacos, limalhas e sucatas finas em briquetes compactos de alta densidade. Isso agrega valor ao material, facilita o transporte e permite reintroduzir os metais ao ciclo produtivo com maior eficiência.",
        specs: [
          { label: "Densidade do briquete", value: "5 a 7 g/cm³" },
          { label: "Materiais", value: "Cavacos de aço, alumínio, cobre, latão" },
          { label: "Consumo energético", value: "Otimizado, motor de alta eficiência" },
          { label: "Operação", value: "Automática e contínua" },
          { label: "Normas de segurança", value: "NR12" },
        ],
        advantages: ["Maior valor de venda do material compactado","Reduz até 90% o volume original","Recupera fluidos de corte para reuso","Baixo consumo energético por tonelada processada","Operação silenciosa e limpa"],
        applications: ["Indústrias metalmecânicas","Oficinas de usinagem","Recicladoras de cavacos e limalhas"],
      },
      en: {
        name: "Automatic Briquetting Machine", category: "Briquettes",
        description: "Compacts metal scrap into high-density briquettes, reducing volume and optimizing storage with low energy consumption.",
        overview: "The BMX briquetting machine transforms chips, filings and fine scrap into compact, high-density briquettes. This adds value to the material, eases transport, and allows metals to be reintroduced into the production cycle more efficiently.",
        specs: [
          { label: "Briquette density", value: "5 to 7 g/cm³" },
          { label: "Materials", value: "Steel, aluminum, copper, brass chips" },
          { label: "Energy consumption", value: "Optimized, high-efficiency motor" },
          { label: "Operation", value: "Automatic and continuous" },
          { label: "Safety standards", value: "NR12" },
        ],
        advantages: ["Higher sales value of compacted material","Reduces original volume by up to 90%","Recovers cutting fluids for reuse","Low energy consumption per ton processed","Quiet and clean operation"],
        applications: ["Metalworking industries","Machining workshops","Chip and filing recyclers"],
      },
      es: {
        name: "Briquetadora Automática", category: "Briquetas",
        description: "Compacta chatarra metálica en briquetas de alta densidad, reduciendo volumen y optimizando el almacenamiento con bajo consumo energético.",
        overview: "La Briquetadora BMX transforma virutas, limaduras y chatarras finas en briquetas compactas de alta densidad. Esto agrega valor al material, facilita el transporte y permite reintroducir los metales al ciclo productivo con mayor eficiencia.",
        specs: [
          { label: "Densidad de la briqueta", value: "5 a 7 g/cm³" },
          { label: "Materiales", value: "Virutas de acero, aluminio, cobre, latón" },
          { label: "Consumo energético", value: "Optimizado, motor de alta eficiencia" },
          { label: "Operación", value: "Automática y continua" },
          { label: "Normas de seguridad", value: "NR12" },
        ],
        advantages: ["Mayor valor de venta del material compactado","Reduce hasta 90% el volumen original","Recupera fluidos de corte para reúso","Bajo consumo energético por tonelada procesada","Operación silenciosa y limpia"],
        applications: ["Industrias metalmecánicas","Talleres de mecanizado","Recicladoras de virutas y limaduras"],
      },
    },
  },
  {
    code: "TRX", categoryKey: "trituradores", slug: "trx", image: trx,
    i18n: {
      pt: {
        name: "Trituradores", category: "Trituração",
        description: "Trituradores de última geração com a melhor relação custo-benefício do mercado. Excelente fragmentação e consumo específico favorável.",
        overview: "Os trituradores TRX representam o que há de mais moderno em tecnologia de fragmentação de sucata. Projetados para entregar a melhor relação custo-benefício do mercado, oferecem excelente qualidade de fragmento e consumo energético específico altamente competitivo.",
        specs: [
          { label: "Capacidade", value: "Linhas de 20 a 200 t/h" },
          { label: "Potência instalada", value: "Configurável conforme capacidade" },
          { label: "Tipo de material", value: "Sucata mista, eletrodomésticos, veículos" },
          { label: "Separação", value: "Magnética e por densidade integradas" },
          { label: "Normas de segurança", value: "NR12 / internacionais" },
        ],
        advantages: ["Melhor relação custo-benefício do mercado","Excelente densidade e qualidade de fragmento","Baixo consumo energético por tonelada","Separação automática de metálicos e não metálicos","Tecnologia comprovada em operação no Brasil e exterior"],
        applications: ["Grandes recicladoras","Processamento de veículos em fim de vida útil","Processamento de linha branca e mistos"],
      },
      en: {
        name: "Shredders", category: "Shredding",
        description: "Next-generation shredders with the best cost-benefit ratio on the market. Excellent fragmentation and favorable specific consumption.",
        overview: "TRX shredders represent the latest in scrap fragmentation technology. Designed to deliver the best cost-benefit ratio on the market, they offer excellent fragment quality and highly competitive specific energy consumption.",
        specs: [
          { label: "Capacity", value: "Lines from 20 to 200 t/h" },
          { label: "Installed power", value: "Configurable by capacity" },
          { label: "Material type", value: "Mixed scrap, appliances, vehicles" },
          { label: "Separation", value: "Integrated magnetic and density" },
          { label: "Safety standards", value: "NR12 / international" },
        ],
        advantages: ["Best cost-benefit ratio on the market","Excellent density and fragment quality","Low energy consumption per ton","Automatic separation of metals and non-metals","Proven technology in Brazil and abroad"],
        applications: ["Large recyclers","End-of-life vehicle processing","White goods and mixed scrap processing"],
      },
      es: {
        name: "Trituradores", category: "Trituración",
        description: "Trituradores de última generación con la mejor relación costo-beneficio del mercado. Excelente fragmentación y consumo específico favorable.",
        overview: "Los trituradores TRX representan lo último en tecnología de fragmentación de chatarra. Diseñados para entregar la mejor relación costo-beneficio del mercado, ofrecen excelente calidad de fragmento y consumo energético específico altamente competitivo.",
        specs: [
          { label: "Capacidad", value: "Líneas de 20 a 200 t/h" },
          { label: "Potencia instalada", value: "Configurable según capacidad" },
          { label: "Tipo de material", value: "Chatarra mixta, electrodomésticos, vehículos" },
          { label: "Separación", value: "Magnética y por densidad integradas" },
          { label: "Normas de seguridad", value: "NR12 / internacionales" },
        ],
        advantages: ["Mejor relación costo-beneficio del mercado","Excelente densidad y calidad de fragmento","Bajo consumo energético por tonelada","Separación automática de metálicos y no metálicos","Tecnología comprobada en operación en Brasil y exterior"],
        applications: ["Grandes recicladoras","Procesamiento de vehículos al final de vida útil","Procesamiento de línea blanca y mixtos"],
      },
    },
  },
  {
    code: "THX", categoryKey: "tesouras", slug: "thx", image: thx,
    i18n: {
      pt: {
        name: "Tesoura Horizontal", category: "Cisalhamento",
        description: "Equipamento robusto e compacto, ideal para processar todo tipo de sucata como trilhos e veículos inteiros, aumentando a densidade do material.",
        overview: "A Tesoura Horizontal THX é um dos equipamentos mais versáteis da linha Conemag. Processa de trilhos ferroviários a veículos inteiros, gerando material de alta densidade pronto para fundição ou exportação.",
        specs: [
          { label: "Força de corte", value: "Até 1.000 toneladas" },
          { label: "Caixa de prensagem", value: "Disponível em vários tamanhos" },
          { label: "Materiais", value: "Trilhos, veículos, sucata pesada" },
          { label: "Operação", value: "Hidráulica automática" },
          { label: "Normas de segurança", value: "NR12" },
        ],
        advantages: ["Processa os materiais mais exigentes do mercado","Alta densidade final do produto","Facas reversíveis de liga especial","Construção robusta para vida útil prolongada","Projeto compacto que ocupa pouco espaço"],
        applications: ["Processamento de veículos completos","Corte de trilhos e estruturas metálicas","Pátios de sucata pesada"],
      },
      en: {
        name: "Horizontal Shear", category: "Shearing",
        description: "Robust and compact, ideal for processing all kinds of scrap such as rails and whole vehicles, increasing material density.",
        overview: "The THX Horizontal Shear is one of the most versatile machines in the Conemag line. It processes everything from railway rails to whole vehicles, producing high-density material ready for foundry or export.",
        specs: [
          { label: "Cutting force", value: "Up to 1,000 tons" },
          { label: "Pressing box", value: "Available in several sizes" },
          { label: "Materials", value: "Rails, vehicles, heavy scrap" },
          { label: "Operation", value: "Automatic hydraulic" },
          { label: "Safety standards", value: "NR12" },
        ],
        advantages: ["Processes the most demanding materials","High final product density","Reversible special-alloy blades","Robust construction for extended lifespan","Compact design requiring little space"],
        applications: ["Whole vehicle processing","Cutting rails and metal structures","Heavy scrap yards"],
      },
      es: {
        name: "Cizalla Horizontal", category: "Cizallamiento",
        description: "Equipo robusto y compacto, ideal para procesar todo tipo de chatarra como rieles y vehículos enteros, aumentando la densidad del material.",
        overview: "La Cizalla Horizontal THX es uno de los equipos más versátiles de la línea Conemag. Procesa desde rieles ferroviarios hasta vehículos enteros, generando material de alta densidad listo para fundición o exportación.",
        specs: [
          { label: "Fuerza de corte", value: "Hasta 1.000 toneladas" },
          { label: "Caja de prensado", value: "Disponible en varios tamaños" },
          { label: "Materiales", value: "Rieles, vehículos, chatarra pesada" },
          { label: "Operación", value: "Hidráulica automática" },
          { label: "Normas de seguridad", value: "NR12" },
        ],
        advantages: ["Procesa los materiales más exigentes del mercado","Alta densidad final del producto","Cuchillas reversibles de aleación especial","Construcción robusta para vida útil prolongada","Diseño compacto que requiere poco espacio"],
        applications: ["Procesamiento de vehículos completos","Corte de rieles y estructuras metálicas","Patios de chatarra pesada"],
      },
    },
  },
  {
    code: "TVX", categoryKey: "tesouras", slug: "tvx", image: tvx,
    i18n: {
      pt: {
        name: "Tesoura Vertical", category: "Cisalhamento",
        description: "Tesoura vertical automática para processamento intensivo de sucata, otimizando o uso de contêineres e agregando valor ao material.",
        overview: "A Tesoura Vertical TVX foi projetada para operações intensivas onde o aproveitamento do espaço é crítico. Sua configuração vertical reduz a área ocupada no pátio e entrega material em formato ideal para contêineres de exportação.",
        specs: [
          { label: "Força de corte", value: "Até 800 toneladas" },
          { label: "Configuração", value: "Vertical, economiza espaço" },
          { label: "Operação", value: "Automática" },
          { label: "Produto final", value: "Otimizado para contêineres" },
          { label: "Normas de segurança", value: "NR12" },
        ],
        advantages: ["Projeto vertical que economiza espaço no pátio","Produto ideal para enchimento de contêineres","Operação automática e de alta produtividade","Baixo custo de manutenção","Facas reversíveis de longa duração"],
        applications: ["Pátios com espaço limitado","Exportação de sucata em contêineres","Recicladoras de médio porte"],
      },
      en: {
        name: "Vertical Shear", category: "Shearing",
        description: "Automatic vertical shear for intensive scrap processing, optimizing container use and adding value to the material.",
        overview: "The TVX Vertical Shear is designed for intensive operations where space use is critical. Its vertical setup reduces yard footprint and delivers material in the ideal format for export containers.",
        specs: [
          { label: "Cutting force", value: "Up to 800 tons" },
          { label: "Configuration", value: "Vertical, space-saving" },
          { label: "Operation", value: "Automatic" },
          { label: "Final product", value: "Optimized for containers" },
          { label: "Safety standards", value: "NR12" },
        ],
        advantages: ["Vertical design saves yard space","Product ideal for filling containers","Automatic, high-productivity operation","Low maintenance cost","Long-lasting reversible blades"],
        applications: ["Yards with limited space","Scrap export in containers","Medium-sized recyclers"],
      },
      es: {
        name: "Cizalla Vertical", category: "Cizallamiento",
        description: "Cizalla vertical automática para procesamiento intensivo de chatarra, optimizando el uso de contenedores y agregando valor al material.",
        overview: "La Cizalla Vertical TVX está diseñada para operaciones intensivas donde el aprovechamiento del espacio es crítico. Su configuración vertical reduce la huella en el patio y entrega material en formato ideal para contenedores de exportación.",
        specs: [
          { label: "Fuerza de corte", value: "Hasta 800 toneladas" },
          { label: "Configuración", value: "Vertical, ahorra espacio" },
          { label: "Operación", value: "Automática" },
          { label: "Producto final", value: "Optimizado para contenedores" },
          { label: "Normas de seguridad", value: "NR12" },
        ],
        advantages: ["Diseño vertical que ahorra espacio en el patio","Producto ideal para llenado de contenedores","Operación automática y de alta productividad","Bajo costo de mantenimiento","Cuchillas reversibles de larga duración"],
        applications: ["Patios con espacio limitado","Exportación de chatarra en contenedores","Recicladoras de mediano porte"],
      },
    },
  },
  {
    code: "PSX", categoryKey: "prensas", slug: "psx", image: psx,
    i18n: {
      pt: {
        name: "Prensa Jacaré", category: "Prensagem",
        description: "Equipamento de alto rendimento, disponível em versão manual ou automática. Produz fardos de alta densidade para fundição e transporte.",
        overview: "A Prensa Jacaré PSX é um clássico modernizado: equipamento confiável, de manutenção simples, que produz fardos de alta densidade. Disponível nas versões manual e automática para se adaptar ao volume e à realidade operacional de cada cliente.",
        specs: [
          { label: "Força de prensagem", value: "Até 350 toneladas" },
          { label: "Versões", value: "Manual e automática" },
          { label: "Material", value: "Sucata ferrosa e não ferrosa leve" },
          { label: "Operação", value: "Hidráulica" },
          { label: "Normas de segurança", value: "NR12" },
        ],
        advantages: ["Excelente custo-benefício","Manutenção simples e econômica","Disponível em versão manual ou automática","Fardos de alta densidade prontos para fundição","Equipamento comprovado em milhares de operações"],
        applications: ["Recicladoras de pequeno e médio porte","Processamento de chapas e materiais leves","Operações que buscam agilidade e simplicidade"],
      },
      en: {
        name: "Alligator Press", category: "Pressing",
        description: "High-performance machine available in manual or automatic versions. Produces high-density bales for foundry and transport.",
        overview: "The PSX Alligator Press is a modernized classic: reliable, easy to maintain, producing high-density bales. Available in manual and automatic versions to fit each customer's volume and operational reality.",
        specs: [
          { label: "Pressing force", value: "Up to 350 tons" },
          { label: "Versions", value: "Manual and automatic" },
          { label: "Material", value: "Light ferrous and non-ferrous scrap" },
          { label: "Operation", value: "Hydraulic" },
          { label: "Safety standards", value: "NR12" },
        ],
        advantages: ["Excellent cost-benefit","Simple, low-cost maintenance","Available in manual or automatic","High-density bales ready for foundry","Proven in thousands of operations"],
        applications: ["Small and medium-sized recyclers","Sheet and light material processing","Operations seeking agility and simplicity"],
      },
      es: {
        name: "Prensa Caimán", category: "Prensado",
        description: "Equipo de alto rendimiento, disponible en versión manual o automática. Produce fardos de alta densidad para fundición y transporte.",
        overview: "La Prensa Caimán PSX es un clásico modernizado: equipo confiable, de mantenimiento simple, que produce fardos de alta densidad. Disponible en versiones manual y automática para adaptarse al volumen y a la realidad operativa de cada cliente.",
        specs: [
          { label: "Fuerza de prensado", value: "Hasta 350 toneladas" },
          { label: "Versiones", value: "Manual y automática" },
          { label: "Material", value: "Chatarra ferrosa y no ferrosa liviana" },
          { label: "Operación", value: "Hidráulica" },
          { label: "Normas de seguridad", value: "NR12" },
        ],
        advantages: ["Excelente costo-beneficio","Mantenimiento sencillo y económico","Disponible en versión manual o automática","Fardos de alta densidad listos para fundición","Equipo comprobado en miles de operaciones"],
        applications: ["Recicladoras de pequeño y mediano porte","Procesamiento de chapas y materiales livianos","Operaciones que buscan agilidad y simplicidad"],
      },
    },
  },
  {
    code: "TJX", categoryKey: "tesouras", slug: "tjx", image: tjx,
    i18n: {
      pt: {
        name: "Tesoura Jacaré", category: "Cisalhamento",
        description: "Compacta e robusta, ideal para corte de sucata. Facas de liga especial que podem ser giradas 4 vezes, aumentando sua vida útil.",
        overview: "A Tesoura Jacaré TJX é a solução ideal para quem precisa de um equipamento compacto, robusto e de baixo custo operacional para cortar sucata metálica. Suas facas de liga especial podem ser giradas 4 vezes, multiplicando sua vida útil.",
        specs: [
          { label: "Força de corte", value: "Até 250 toneladas" },
          { label: "Facas", value: "Liga especial, reversíveis 4 vezes" },
          { label: "Tamanho", value: "Compacta, fácil de instalar" },
          { label: "Operação", value: "Hidráulica" },
          { label: "Normas de segurança", value: "NR12" },
        ],
        advantages: ["Vida útil estendida das facas","Equipamento compacto que exige pouca obra civil","Baixo custo operacional e de manutenção","Robustez para operação contínua","Excelente para pequenas e médias recicladoras"],
        applications: ["Corte de sucata ferrosa","Redução de barras e perfis","Operações de pequeno e médio porte"],
      },
      en: {
        name: "Alligator Shear", category: "Shearing",
        description: "Compact and robust, ideal for cutting scrap. Special-alloy blades can be turned 4 times, extending their lifespan.",
        overview: "The TJX Alligator Shear is the ideal solution for those needing a compact, robust, low-operating-cost machine to cut metal scrap. Its special-alloy blades can be rotated 4 times, multiplying their lifespan.",
        specs: [
          { label: "Cutting force", value: "Up to 250 tons" },
          { label: "Blades", value: "Special alloy, 4x reversible" },
          { label: "Size", value: "Compact, easy to install" },
          { label: "Operation", value: "Hydraulic" },
          { label: "Safety standards", value: "NR12" },
        ],
        advantages: ["Extended blade lifespan","Compact equipment requiring little civil work","Low operating and maintenance costs","Robust for continuous operation","Excellent for small and medium recyclers"],
        applications: ["Ferrous scrap cutting","Reducing bars and profiles","Small and medium-sized operations"],
      },
      es: {
        name: "Cizalla Caimán", category: "Cizallamiento",
        description: "Compacta y robusta, ideal para corte de chatarra. Cuchillas de aleación especial que pueden girarse 4 veces, aumentando su vida útil.",
        overview: "La Cizalla Caimán TJX es la solución ideal para quien necesita un equipo compacto, robusto y de bajo costo operativo para cortar chatarra metálica. Sus cuchillas de aleación especial pueden ser giradas 4 veces, multiplicando su vida útil.",
        specs: [
          { label: "Fuerza de corte", value: "Hasta 250 toneladas" },
          { label: "Cuchillas", value: "Aleación especial, reversibles 4 veces" },
          { label: "Tamaño", value: "Compacta, fácil de instalar" },
          { label: "Operación", value: "Hidráulica" },
          { label: "Normas de seguridad", value: "NR12" },
        ],
        advantages: ["Vida útil extendida de las cuchillas","Equipo compacto que requiere poca obra civil","Bajo costo operativo y de mantenimiento","Robustez para operación continua","Excelente para pequeñas y medianas recicladoras"],
        applications: ["Corte de chatarra ferrosa","Reducción de barras y perfiles","Operaciones de pequeño y mediano porte"],
      },
    },
  },
  {
    code: "PLX", categoryKey: "prensas", slug: "plx", image: plx,
    i18n: {
      pt: {
        name: "Prensa Automática para Alumínio", category: "Prensagem",
        description: "Prensa contínua projetada para alta produção com baixos custos de manutenção, conforme as normas de segurança NR12.",
        overview: "A PLX é uma prensa automática contínua projetada especificamente para o processamento de alumínio e outros metais não ferrosos. Sua operação contínua entrega alta produtividade com custos de manutenção reduzidos.",
        specs: [
          { label: "Material", value: "Alumínio e não ferrosos" },
          { label: "Operação", value: "Contínua automática" },
          { label: "Força de prensagem", value: "Configurável conforme aplicação" },
          { label: "Densidade final", value: "Alta, otimizada para fundição" },
          { label: "Normas de segurança", value: "NR12" },
        ],
        advantages: ["Alta produção em regime contínuo","Baixo custo de manutenção","Projetada especificamente para alumínio","Atende integralmente à NR12","Produto final com excelente densidade"],
        applications: ["Recicladoras de alumínio","Indústrias de fundição não ferrosa","Processamento de latas e perfis de alumínio"],
      },
      en: {
        name: "Automatic Aluminum Press", category: "Pressing",
        description: "Continuous press designed for high production with low maintenance costs, in compliance with NR12 safety standards.",
        overview: "The PLX is a continuous automatic press designed specifically for processing aluminum and other non-ferrous metals. Its continuous operation delivers high productivity with reduced maintenance costs.",
        specs: [
          { label: "Material", value: "Aluminum and non-ferrous" },
          { label: "Operation", value: "Continuous automatic" },
          { label: "Pressing force", value: "Configurable by application" },
          { label: "Final density", value: "High, optimized for foundry" },
          { label: "Safety standards", value: "NR12" },
        ],
        advantages: ["High production in continuous mode","Low maintenance cost","Specifically designed for aluminum","Fully compliant with NR12","Final product with excellent density"],
        applications: ["Aluminum recyclers","Non-ferrous foundry industries","Aluminum can and profile processing"],
      },
      es: {
        name: "Prensa Automática para Aluminio", category: "Prensado",
        description: "Prensa continua diseñada para alta producción con bajos costos de mantenimiento, conforme a normas de seguridad NR12.",
        overview: "La PLX es una prensa automática continua diseñada específicamente para el procesamiento de aluminio y otros metales no ferrosos. Su operación continua entrega alta productividad con costos de mantenimiento reducidos.",
        specs: [
          { label: "Material", value: "Aluminio y no ferrosos" },
          { label: "Operación", value: "Continua automática" },
          { label: "Fuerza de prensado", value: "Configurable según aplicación" },
          { label: "Densidad final", value: "Alta, optimizada para fundición" },
          { label: "Normas de seguridad", value: "NR12" },
        ],
        advantages: ["Alta producción en régimen continuo","Bajo costo de mantenimiento","Específicamente diseñada para aluminio","Cumple integralmente con NR12","Producto final con excelente densidad"],
        applications: ["Recicladoras de aluminio","Industrias de fundición no ferrosa","Procesamiento de latas y perfiles de aluminio"],
      },
    },
  },
];

export function getEquipmentList(locale: Locale): Equipment[] {
  return equipmentRaw.map((e) => ({ code: e.code, slug: e.slug, image: e.image, categoryKey: e.categoryKey, ...e.i18n[locale] }));
}

export function getEquipmentBySlugLocalized(slug: string, locale: Locale): Equipment | undefined {
  const e = equipmentRaw.find((x) => x.slug === slug);
  if (!e) return undefined;
  return { code: e.code, slug: e.slug, image: e.image, categoryKey: e.categoryKey, ...e.i18n[locale] };
}

export function equipmentSlugExists(slug: string): boolean {
  return equipmentRaw.some((e) => e.slug === slug);
}

// Variações (modelos) disponíveis por código de equipamento.
// Os números representam capacidade/tamanho do modelo.
export const equipmentVariants: Record<string, string[]> = {
  GTX: ["500"],
  TPX: ["200", "500", "600"],
  BMX: ["800"],
  TRX: ["100"],
  THX: [],
  TVX: ["600", "800"],
  PSX: ["100", "200", "300", "400", "500", "600"],
  TJX: ["100", "200", "300", "500"],
  PLX: ["200", "300", "400", "500"],
};

