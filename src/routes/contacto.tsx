import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contato — Conemag" },
      { name: "description", content: "Solicite um orçamento ou fale com um especialista. Atendimento no Brasil para equipamentos de reciclagem de sucata." },
      { property: "og:title", content: "Contato — Conemag" },
      { property: "og:description", content: "Fale com nossa equipe de especialistas no Brasil." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  const t = useT();
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-lime font-semibold">{t("contact.kicker")}</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance">{t("contact.title")}</h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            {t("contact.sub")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, title: t("contact.phone"), value: "+55 (16) 3333-8966" },
              { icon: MessageCircle, title: t("contact.whatsapp"), value: "+55 (16) 99999-0000" },
              { icon: Mail, title: t("contact.email"), value: "contato@conemag.com" },
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

          <form
            className="lg:col-span-3 bg-card border border-border rounded-2xl p-8 shadow-card space-y-5"
            onSubmit={(e) => { e.preventDefault(); alert(t("contact.form.success")); }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label={t("contact.form.name")} name="name" required />
              <Field label={t("contact.form.company")} name="company" />
              <Field label={t("contact.form.email")} name="email" type="email" required />
              <Field label={t("contact.form.phone")} name="phone" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("contact.form.country")}</label>
              <select name="country" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>Brasil</option><option>México</option><option>Argentina</option><option>Chile</option>
                <option>Colombia</option><option>Perú</option><option>Uruguay</option>
                <option>Paraguay</option><option>Bolivia</option><option>Ecuador</option>
                <option>Venezuela</option><option>—</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">{t("contact.form.help")}</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder={t("contact.form.placeholder")}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-8 py-4 font-semibold hover:shadow-glow transition"
            >
              {t("contact.form.submit")}
            </button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}{required && <span className="text-primary"> *</span>}</label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
