import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { getEquipmentList, type CategoryKey } from "@/lib/equipment";
import { useI18n } from "@/lib/i18n";
import { useLeadModal } from "@/components/LeadModalProvider";
import { usePageMeta } from "@/lib/usePageMeta";

const CATEGORY_KEYS: CategoryKey[] = ["prensas", "tesouras", "briquetadeiras", "trituradores"];

export default function EquiposPage() {
  const { openLead } = useLeadModal();
  const { t, locale } = useI18n();
  const [searchParams, setSearchParams] = useSearchParams();
  const rawCat = searchParams.get("cat");
  const cat = rawCat && (CATEGORY_KEYS as string[]).includes(rawCat) ? (rawCat as CategoryKey) : undefined;

  usePageMeta({
    title: "Equipamentos — Conemag",
    description: "Línea completa de equipos Conemag: prensas, cizallas, briquetadoras y trituradores para chatarra metálica.",
  });

  const all = getEquipmentList(locale);
  const equipment = cat ? all.filter((e) => e.categoryKey === cat) : all;

  function setCat(next: CategoryKey | undefined) {
    if (next) setSearchParams({ cat: next });
    else setSearchParams({});
  }

  return (
    <SiteLayout>
      <section className="pt-40 pb-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial opacity-40" />
        <div className="container mx-auto px-6 relative">
          <span className="text-sm uppercase tracking-widest text-primary font-semibold">{t("equipos.kicker")}</span>
          <h1 className="mt-3 text-5xl md:text-7xl font-bold text-balance max-w-4xl">
            {cat ? t(`cat.${cat}`) : t("equipos.title")}
          </h1>
          <p className="mt-6 text-lg text-primary-foreground/80 max-w-2xl">
            {cat ? t(`cat.${cat}.desc`) : t("equipos.sub")}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              type="button"
              onClick={() => setCat(undefined)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${!cat ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
            >
              {t("equipos.filter.all")}
            </button>
            {CATEGORY_KEYS.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setCat(k)}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${cat === k ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-primary/50"}`}
              >
                {t(`cat.${k}`)}
              </button>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((eq) => (
              <Link
                key={eq.code}
                to={`/equipos/${eq.slug}`}
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
                  <div className="mt-4 inline-flex items-center gap-1 text-primary font-semibold text-sm group-hover:gap-2 transition-all">
                    {t("card.viewDetails")} <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">{t("equipos.custom.title")}</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("equipos.custom.sub")}</p>
          <button type="button" onClick={openLead} className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-7 py-3.5 font-semibold hover:shadow-glow transition">
            {t("equipos.custom.cta")} <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </SiteLayout>
  );
}
