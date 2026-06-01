import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { equipment } from "@/lib/equipment";

export const Route = createFileRoute("/equipos")({
  head: () => ({
    meta: [
      { title: "Equipos — Conemag Latinoamérica" },
      { name: "description", content: "Línea completa de equipos Conemag: prensas, cizallas, briquetadoras, trituradores y más para el procesamiento de chatarra metálica." },
      { property: "og:title", content: "Equipos Conemag" },
      { property: "og:description", content: "Prensas, cizallas, briquetadoras y trituradores para chatarra metálica." },
    ],
  }),
  component: EquiposPage,
});

function EquiposPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative">
          <span className="text-sm uppercase tracking-widest text-primary-glow font-semibold">Catálogo</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance max-w-4xl">
            Equipos para cada etapa del reciclaje
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            Desde el corte y prensado hasta la briquetadora y trituración: una línea completa
            para procesar chatarra metálica con máxima eficiencia.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {equipment.map((eq) => (
            <article
              key={eq.code}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-elegant transition-all hover:-translate-y-1"
            >
              <div className="aspect-square bg-gradient-to-br from-secondary to-accent/30 p-6 grid place-items-center">
                <img src={eq.image} alt={eq.name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="text-xs uppercase tracking-widest text-primary font-semibold">{eq.category}</div>
                <h3 className="mt-2 text-2xl font-display font-bold">
                  {eq.code} <span className="text-muted-foreground font-normal text-base">— {eq.name}</span>
                </h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{eq.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">¿Necesita un equipo a medida?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Diseñamos soluciones personalizadas según el tipo y volumen de material que procesa.
          </p>
          <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:shadow-glow transition">
            Contactar a un especialista <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
