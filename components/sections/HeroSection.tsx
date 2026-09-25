import { getTranslations } from "next-intl/server";
import { FileText, BarChart3, ShieldCheck } from "lucide-react";
import { ActionsCard } from "@/components/cards/ActionsCard";

export async function HeroSection() {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden bg-canvas px-4 sm:px-6 pt-20 pb-24 md:pt-32 md:pb-32">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-16 items-center">
        {/* Copy + actions */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-[3.5rem] leading-[1.1] text-ink">
              {t("home.title")}{" "}
              <span className="text-accent">{t("home.creatorSpace")}</span>
            </h1>
            <p className="text-xl text-ink-muted max-w-md leading-relaxed font-sans">
              {t("home.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            <ActionsCard
              href="/createur"
              variant="primary"
              icon={<BarChart3 className="w-5 h-5" />}
              title={t("home.creatorSpace")}
              description="Concevez et publiez vos sondages en quelques minutes."
            />
            <ActionsCard
              href="/repondre/rapport-hebdo"
              icon={<FileText className="w-5 h-5" />}
              title={t("home.respondSurvey")}
              description="Découvrez l'expérience de réponse, question par question."
            />
            <ActionsCard
              href="/admin"
              icon={<ShieldCheck className="w-5 h-5" />}
              title={t("admin.title")}
              description="Pilotez les accès, les données et la configuration."
            />
          </div>
        </div>

        {/* Product preview */}
        <div className="relative hidden lg:block">
          <div
            className="absolute -top-12 -right-8 w-64 h-64 rounded-full bg-accent/8 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative bg-surface border border-border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow motion-safe:duration-smooth">
            <p className="text-xs font-medium text-ink-muted mb-4 uppercase tracking-wider">
              Question 3 sur 8
            </p>
            <p className="font-display font-semibold text-ink text-lg mb-6">
              Comment évaluez-vous la charge de travail cette semaine ?
            </p>
            <div className="flex flex-col gap-3">
              {["Légère", "Équilibrée", "Élevée"].map((label, i) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 rounded-md border px-4 py-3 text-sm transition-all motion-safe:duration-smooth ${
                    i === 1
                      ? "border-accent bg-accent-lighter text-accent font-medium shadow-xs"
                      : "border-border text-ink-muted hover:border-border-dark"
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex-shrink-0 transition-colors motion-safe:duration-smooth ${
                      i === 1 ? "border-accent bg-accent" : "border-border"
                    }`}
                  />
                  {label}
                </div>
              ))}
            </div>
            <div className="mt-6 h-2 rounded-full bg-border overflow-hidden shadow-xs">
              <div className="h-full w-[37%] rounded-full bg-accent transition-all motion-safe:duration-smooth" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}