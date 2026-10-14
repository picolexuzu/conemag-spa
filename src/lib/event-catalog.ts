import { getEquipmentList } from "./equipment";
import thx from "@/assets/event/thx.asset.json";
import tvx from "@/assets/event/tvx.asset.json";
import tjx from "@/assets/event/tjx.asset.json";
import psx from "@/assets/event/psx.asset.json";
import manual from "@/assets/event/psx-manual.asset.json";
import plx from "@/assets/event/plx.asset.json";
import pbx from "@/assets/event/pbx.asset.json";
import bmx from "@/assets/event/bmx.asset.json";
import tpx from "@/assets/event/tpx.asset.json";
import gtx from "@/assets/event/gtx.asset.json";
import ggx from "@/assets/event/ggx.asset.json";
import gfx from "@/assets/event/gfx.asset.json";

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
const existing = getEquipmentList("pt");
export const eventEquipment = entries.map(([slug, code, name, category, description, benefits, photo]) => ({
  slug, code, name, category, description, benefits, photo,
  image: existing.find(e => e.slug === slug)?.image ?? photo,
}));
export const eventCategories = ["Todos", "Tesouras", "Prensas", "Briquetagem e alumínio", "Garras e manipulação"];