import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Conemag Latinoamérica" },
      { name: "description", content: "Más de 26 años fabricando equipos para el procesamiento de chatarra metálica. Conozca la historia, misión y valores de Conemag." },
      { property: "og:title", content: "Nosotros — Conemag" },
      { property: "og:description", content: "Historia, misión y valores de Conemag, líder en equipos para reciclaje metálico." },
    ],
  }),
  component: NosotrosPage,
});

const values = [
  { title: "Ética", desc: "Transparencia y respeto en cada relación comercial y técnica." },
  { title: "Compromiso", desc: "Con la productividad y seguridad de nuestros clientes." },
  { title: "Mejora continua", desc: "Procesos y productos en constante evolución." },
  { title: "Innovación", desc: "Tecnología aplicada a las exigencias reales del mercado." },
];

function NosotrosPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-primary-glow font-semibold">Quiénes somos</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance">
            26 años transformando el mercado del reciclaje
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            Liderazgo e innovación en equipos para chatarra metálica, ahora expandiéndose
            por toda Latinoamérica.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl space-y-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestra historia</h2>
            <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
              <p>
                Con más de 25 años de actuación en el mercado de equipos para el procesamiento
                y preparación de chatarra metálica, Conemag inició sus actividades basándose
                en los tres pilares de la sostenibilidad: valores ambientales, sociales y económicos.
              </p>
              <p>
                Siempre enfocados en soluciones e innovaciones de nuestro sector, nos mantenemos
                actualizados con los procedimientos técnicos y comerciales que abarcan nuestro negocio.
                Nuestra planta está estratégicamente ubicada en el centro del estado de São Paulo,
                en la ciudad de Araraquara, garantizando confiabilidad en la entrega y asistencia
                técnica de nuestros equipos.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-2xl shadow-card">
              <h3 className="text-2xl font-bold">Misión</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Desarrollar y producir equipos de alta calidad que cumplan con los más exigentes
                requisitos de seguridad y productividad.
              </p>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl shadow-card">
              <h3 className="text-2xl font-bold">Visión</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Ser reconocida como una empresa referencia en el desarrollo de soluciones para el
                mercado de la chatarra metálica, garantizando la satisfacción de clientes, socios y colaboradores.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Nuestros valores</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v, i) => (
                <div key={v.title} className="p-6 rounded-2xl bg-secondary border border-border">
                  <div className="text-3xl font-display font-bold text-primary">0{i + 1}</div>
                  <h4 className="mt-3 font-semibold text-lg">{v.title}</h4>
                  <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
