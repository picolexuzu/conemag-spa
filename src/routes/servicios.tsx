import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import rental from "@/assets/service-rental.jpg";
import financing from "@/assets/service-financing.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — Conemag Latinoamérica" },
      { name: "description", content: "Alquiler de equipos, financiamiento, asistencia técnica y repuestos. Soluciones completas para el reciclaje industrial." },
      { property: "og:title", content: "Servicios Conemag" },
      { property: "og:description", content: "Alquiler, financiamiento y asistencia técnica para sus operaciones." },
    ],
  }),
  component: ServiciosPage,
});

const rentalBenefits = [
  "Reducción de costos: acceda a tecnología de punta sin la inversión inicial.",
  "Flexibilidad: contratos adaptados a la duración de su proyecto.",
  "Mantenimiento incluido: equipos siempre en perfecto estado de operación.",
  "Atención especializada: equipo técnico listo para resolver sus dudas.",
];

const financingBenefits = [
  "Plazos flexibles que se adaptan al flujo de caja de su empresa.",
  "Tasas competitivas con condiciones accesibles.",
  "Acceso a equipos modernos de alta eficiencia operativa.",
  "Preserva su capital de trabajo para otras áreas del negocio.",
  "Soporte continuo y asesoría técnica permanente.",
];

function ServiciosPage() {
  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative">
          <span className="text-sm uppercase tracking-widest text-primary-glow font-semibold">Servicios</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance max-w-4xl">
            Más que máquinas: soluciones completas
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            Alquiler, financiamiento y asistencia técnica para que su operación nunca se detenga.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img src={rental} alt="Alquiler de equipos" className="rounded-2xl shadow-elegant aspect-[4/3] object-cover" />
            <div className="absolute -bottom-6 -right-6 bg-gradient-primary text-primary-foreground rounded-2xl p-6 shadow-glow max-w-[200px]">
              <div className="text-3xl font-display font-bold">100%</div>
              <div className="text-xs uppercase tracking-widest mt-1">Mantenimiento incluido</div>
            </div>
          </div>
          <div>
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Alquiler de equipos</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Equipos cuando los necesite</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              En Conemag ofrecemos más que máquinas: ofrecemos soluciones eficientes para su negocio.
              Con años de experiencia y un portafolio diverso, sabemos que el éxito de sus operaciones
              depende de equipos confiables y soporte técnico especializado.
            </p>
            <ul className="mt-8 space-y-3">
              {rentalBenefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shrink-0">
                    <Check size={12} />
                  </span>
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="lg:order-2 relative">
            <img src={financing} alt="Financiamiento" className="rounded-2xl shadow-elegant aspect-[4/3] object-cover" />
          </div>
          <div className="lg:order-1">
            <span className="text-sm uppercase tracking-widest text-primary font-semibold">Financiamiento</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-bold">Adquiera con condiciones a su medida</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Sabemos que adquirir equipos de alta calidad es una inversión estratégica. Por eso
              ofrecemos soluciones de financiamiento personalizadas que hacen más accesible la
              compra de las máquinas que su empresa necesita.
            </p>
            <ul className="mt-8 space-y-3">
              {financingBenefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-1 w-5 h-5 rounded-full bg-gradient-primary grid place-items-center text-primary-foreground shrink-0">
                    <Check size={12} />
                  </span>
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold max-w-2xl mx-auto">
            Asistencia técnica y repuestos en toda Latinoamérica
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Equipo altamente calificado para mantenimientos preventivos y correctivos,
            con disponibilidad de repuestos para asegurar la continuidad de sus operaciones.
          </p>
          <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:shadow-glow transition">
            Solicitar atención <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
