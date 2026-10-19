import { eventImages } from "./event-images";
import thx from "@/assets/event/optimized/thx-photo.asset.json";
import tvx from "@/assets/event/optimized/tvx-photo.asset.json";
import tjx from "@/assets/event/optimized/tjx-photo.asset.json";
import psx from "@/assets/event/optimized/psx-photo.asset.json";
import manual from "@/assets/event/optimized/psx-manual-photo.asset.json";
import plx from "@/assets/event/optimized/plx-photo.asset.json";
import pbx from "@/assets/event/optimized/pbx-photo.asset.json";
import bmx from "@/assets/event/optimized/bmx-photo.asset.json";
import tpx from "@/assets/event/optimized/tpx-photo.asset.json";
import gtx from "@/assets/event/optimized/gtx-photo.asset.json";
import ggx from "@/assets/event/optimized/ggx-photo.asset.json";
import gfx from "@/assets/event/optimized/gfx-photo.asset.json";

const entries = [
  ["thx", "THX", "Tesourão horizontal múltiplos cortes", "Tesouras", "Corta e cisalha sucatas pesadas.", ["Robustez", "Alta produtividade", "Operação segura"], thx.url],
  ["tvx", "TVX", "Tesoura vertical automática", "Tesouras", "Corta e cisalha sucatas com precisão.", ["Corte preciso", "Alta performance", "Operação confiável"], tvx.url],
  ["tjx", "TJX", "Tesoura jacaré automática", "Tesouras", "Corta e cisalha sucatas ferrosas.", ["Agilidade", "Força de corte", "Aplicação versátil"], tjx.url],
  ["psx", "PSX", "Prensa jacaré automática", "Prensas", "Compacta e enfarda sucatas em geral.", ["Alta compactação", "Melhor logística", "Operação robusta"], psx.url],
  ["psx-manual", "PSX", "Prensa jacaré manual", "Prensas", "Compacta e enfarda sucatas em geral.", ["Versatilidade", "Controle operacional", "Estrutura reforçada"], manual.url],
  ["plx", "PLX", "Prensa automática para alumínios", "Prensas", "Compacta e enfarda latas, perfis e alumínio em geral.", ["Redução de volume", "Eficiência logística", "Aplicação em alumínios"], plx.url],
  ["pbx", "PBX", "Prensa briquetadeira automática", "Briquetagem e alumínio", "Briqueta cavacos, virutas, pós e limalhas de ferros.", ["Maior densidade", "Melhor reaproveitamento", "Processo eficiente"], pbx.url],
  ["bmx", "BMX", "Briquetadeira automática", "Briquetagem e alumínio", "Briqueta cavacos, pós e limalhas de ferros.", ["Redução de resíduos", "Valorização do material", "Operação contínua"], bmx.url],
  ["tpx", "TPX", "Tesoura prensa automática", "Briquetagem e alumínio", "Corta e prensa perfis de alumínio.", ["Compactação inteligente", "Processo em alumínio", "Aplicação industrial"], tpx.url],
  ["gtx", "GTX", "Garra tesoura giratória para escavadeiras", "Garras e manipulação", "Corte e cisalhamento de sucatas.", ["Versatilidade", "Corte com agilidade", "Aplicação em campo"], gtx.url],
  ["ggx", "GGX", "Garra giratória", "Garras e manipulação", "Manipulação e movimentação de sucatas.", ["Rotação eficiente", "Maior alcance operacional", "Movimentação segura"], ggx.url],
  ["gfx", "GFX", "Garra fixa", "Garras e manipulação", "Manipulação e movimentação de sucatas.", ["Estrutura robusta", "Movimentação precisa", "Aplicação industrial"], gfx.url],
] as const;
export const eventEquipment = entries.map(([slug, code, name, category, description, benefits, photo]) => ({
  slug, code, name, category, description, benefits, photo,
  image: eventImages[slug][0],
  imageMobile: eventImages[slug][1],
}));
export const eventCategories = ["Todos", "Tesouras", "Prensas", "Briquetagem e alumínio", "Garras e manipulação"];