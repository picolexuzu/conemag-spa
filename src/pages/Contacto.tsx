import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/lib/i18n";
import { usePageMeta } from "@/lib/usePageMeta";

export default function ContactoPage() {
  const t = useT();
  usePageMeta({
    title: "Contato — Conemag",
    description: "Solicite um orçamento ou fale com um especialista.",
  });
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("contact.kicker")}</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance">{t("contact.title")}</h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">{t("contact.sub")}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Phone, title: t("contact.phone"), value: "(16) 3333-6966" },
              { icon: MessageCircle, title: t("contact.whatsapp"), value: "+55 (16) 99999-0000" },
              { icon: Mail, title: t("contact.email"), value: "contato@prensasconemag.com.br" },
              { icon: MapPin, title: t("contact.hq"), value: t("contact.hq.value") },
            ].map((c) => (
              <div key={c.title} className="p-6 bg-card border border-border rounded-2xl flex gap-4 hover:shadow-card transition">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary grid place-items-center text-primary-foreground shrink-0">
                  <c.icon size={20} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.title}</div>
                  <div className="mt-1 font-semibold">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
