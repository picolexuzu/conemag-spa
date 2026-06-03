import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre — Conemag" },
      { name: "description", content: "Más de 26 años fabricando equipos para el procesamiento de chatarra metálica. Conozca la historia, misión y valores de Conemag." },
      { property: "og:title", content: "Nosotros — Conemag" },
      { property: "og:description", content: "Historia, misión y valores de Conemag, líder en equipos para reciclaje metálico." },
    ],
  }),
  component: NosotrosPage,
});

function NosotrosPage() {
  const t = useT();
  const values = [
    { title: t("about.v1.title"), desc: t("about.v1.desc") },
    { title: t("about.v2.title"), desc: t("about.v2.desc") },
    { title: t("about.v3.title"), desc: t("about.v3.desc") },
    { title: t("about.v4.title"), desc: t("about.v4.desc") },
  ];
  return (
    <SiteLayout>
      <section className="pt-40 pb-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative max-w-4xl">
          <span className="text-sm uppercase tracking-widest text-lime font-semibold">{t("about.kicker")}</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance">
            {t("about.title")}
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            {t("about.sub")}
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 max-w-4xl space-y-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("about.history")}</h2>
            <div className="prose prose-lg text-muted-foreground leading-relaxed space-y-4">
              <p>{t("about.history.p1")}</p>
              <p>{t("about.history.p2")}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-card border border-border rounded-2xl shadow-card">
              <h3 className="text-2xl font-bold">{t("about.mission")}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t("about.mission.desc")}</p>
            </div>
            <div className="p-8 bg-card border border-border rounded-2xl shadow-card">
              <h3 className="text-2xl font-bold">{t("about.vision")}</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{t("about.vision.desc")}</p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{t("about.values")}</h2>
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
