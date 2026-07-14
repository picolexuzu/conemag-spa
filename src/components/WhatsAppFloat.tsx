import { MessageCircle } from "lucide-react";
import { WHATSAPP_SUPPORT_MESSAGE, whatsappUrl } from "@/lib/whatsapp";

export default function WhatsAppFloat() {
  const href = whatsappUrl(WHATSAPP_SUPPORT_MESSAGE);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Suporte via WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg shadow-black/20 transition-transform hover:scale-105 hover:bg-[#1ebe57] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2"
    >
      <MessageCircle className="h-5 w-5" fill="currentColor" strokeWidth={0} />
      <span className="text-sm font-semibold">Suporte</span>
    </a>
  );
}
