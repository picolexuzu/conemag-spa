import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Conemag Latinoamérica" },
      { name: "description", content: "Solicite una cotización o hable con un especialista. Atención en toda Latinoamérica para equipos de reciclaje metálico." },
      { property: "og:title", content: "Contacto — Conemag" },
      { property: "og:description", content: "Hable con nuestro equipo de especialistas en Latinoamérica." },
    ],
  }),
  component: ContactoPage,
});

function ContactoPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-primary-glow font-semibold">Contacto</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance">Hablemos de su proyecto</h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            Nuestro equipo está listo para asesorarle y ofrecerle la mejor solución para su operación en Latinoamérica.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-4">
            {[
              { icon: Phone, title: "Teléfono", value: "+55 (16) 3333-8966" },
              { icon: MessageCircle, title: "WhatsApp", value: "+55 (16) 99999-0000" },
              { icon: Mail, title: "E-mail", value: "latam@conemag.com" },
              { icon: MapPin, title: "Sede", value: "Araraquara, SP — Brasil" },
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
            onSubmit={(e) => { e.preventDefault(); alert("¡Gracias! Le contactaremos a la brevedad."); }}
          >
            <div className="grid md:grid-cols-2 gap-5">
              <Field label="Nombre completo" name="name" required />
              <Field label="Empresa" name="company" />
              <Field label="E-mail" name="email" type="email" required />
              <Field label="Teléfono / WhatsApp" name="phone" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">País</label>
              <select name="country" className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                <option>México</option><option>Argentina</option><option>Chile</option>
                <option>Colombia</option><option>Perú</option><option>Uruguay</option>
                <option>Paraguay</option><option>Bolivia</option><option>Ecuador</option>
                <option>Venezuela</option><option>Otro</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">¿En qué podemos ayudarle?</label>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Cuéntenos sobre su proyecto, tipo de material y volumen aproximado..."
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-8 py-4 font-semibold hover:shadow-glow transition"
            >
              Enviar mensaje
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
