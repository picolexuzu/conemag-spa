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
  name: string;
  category: string;
  image: string;
  description: string;
};

export const equipment: Equipment[] = [
  {
    code: "GTX",
    name: "Tijera Giratoria Hidráulica",
    category: "Cizallamiento",
    image: gtx,
    description:
      "Convierte grandes volúmenes de chatarra en piezas más pequeñas, con capacidad de 5 a 10 toneladas por hora. Acelera la preparación y reduce costos operativos.",
  },
  {
    code: "TPX",
    name: "Prensa Tijera Automática",
    category: "Prensado y corte",
    image: tpx,
    description:
      "Diseñada para operación continua y de alta exigencia. Combina cizallamiento y enfardado en un solo equipo, ideal para perfiles y barras largas.",
  },
  {
    code: "BMX",
    name: "Briquetadora Automática",
    category: "Briquetas",
    image: bmx,
    description:
      "Compacta chatarra metálica en briquetas de alta densidad, reduciendo volumen y optimizando el almacenamiento con bajo consumo energético.",
  },
  {
    code: "TRX",
    name: "Trituradores",
    category: "Trituración",
    image: trx,
    description:
      "Trituradores de última generación con la mejor relación costo-beneficio del mercado. Excelente fragmentación y consumo específico favorable.",
  },
  {
    code: "THX",
    name: "Tijera Horizontal",
    category: "Cizallamiento",
    image: thx,
    description:
      "Equipo robusto y compacto, ideal para procesar todo tipo de chatarra como rieles y vehículos enteros, aumentando la densidad del material.",
  },
  {
    code: "TVX",
    name: "Tijera Vertical",
    category: "Cizallamiento",
    image: tvx,
    description:
      "Tijera vertical automática para procesamiento intensivo de chatarra, optimizando el uso de contenedores y agregando valor al material.",
  },
  {
    code: "PSX",
    name: "Prensa Caimán",
    category: "Prensado",
    image: psx,
    description:
      "Equipo de alto rendimiento, disponible en versión manual o automática. Produce fardos de alta densidad para fundición y transporte.",
  },
  {
    code: "TJX",
    name: "Tijera Caimán",
    category: "Cizallamiento",
    image: tjx,
    description:
      "Compacta y robusta, ideal para corte de chatarra. Cuchillas de aleación especial que pueden girarse 4 veces, aumentando su vida útil.",
  },
  {
    code: "PLX",
    name: "Prensa Automática para Aluminio",
    category: "Prensado",
    image: plx,
    description:
      "Prensa continua diseñada para alta producción con bajos costos de mantenimiento, conforme a normas de seguridad NR12.",
  },
];
