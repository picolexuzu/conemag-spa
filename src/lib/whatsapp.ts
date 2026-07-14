export const WHATSAPP_PHONE = "551633336966";

export const WHATSAPP_SUPPORT_MESSAGE = "Olá! Gostaria de suporte.";
export const WHATSAPP_QUOTE_MESSAGE = "Olá! Gostaria de solicitar um orçamento.";
export const WHATSAPP_SERVICE_MESSAGE = "Olá! Gostaria de solicitar atendimento.";

export function whatsappUrl(message: string = WHATSAPP_SUPPORT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
