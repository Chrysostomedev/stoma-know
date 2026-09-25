import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { Footer } from "@/components/layout/Footer";
import {
  FileText,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

const features = [
  {
    icon: FileText,
    title: "Parcours fluide",
    description: "Une question à la fois, pour une expérience sans friction.",
  },
  {
    icon: BarChart3,
    title: "Tableaux de bord",
    description: "Analysez vos données en temps réel, sans export manuel.",
  },
  {
    icon: Shield,
    title: "Sécurisé",
    description: "Vos données sont protégées et restent confidentielles.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description: "Une interface pensée pour être répondue depuis un téléphone.",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Chargement instantané, même sur les réseaux les plus lents.",
  },
  {
    icon: CheckCircle2,
    title: "Logique conditionnelle",
    description: "Adaptez chaque question à la réponse précédente.",
  },
];

const steps = [
  {
    number: "01",
    title: "Créez votre sondage",
    description:
      "Assemblez vos questions avec la logique conditionnelle et personnalisez le parcours.",
  },
  {
    number: "02",
    title: "Partagez le lien",
    description:
      "Diffusez un lien unique, sans compte requis pour vos répondants.",
  },
  {
    number: "03",
    title: "Analysez les résultats",
    description:
      "Suivez les réponses en direct depuis un tableau de bord clair.",
  },
];

export default async function Home() {
  const t = await getTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />

      {/* Trust bar */}
      <div className="border-y border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-ink-muted">
          <span>Aucune carte bancaire requise</span>
          <span className="hidden sm:inline text-border">•</span>
          <span>Mise en place en 5 minutes</span>
          <span className="hidden sm:inline text-border">•</span>
          <span>Interface entièrement en français</span>
        </div>
      </div>

      {/* Features — grille premium avec ombres subtiles */}
      <section id="features" className="px-4 sm:px-6 py-24 md:py-32 bg-canvas">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-16">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-ink mb-6">
              {t("home.features")}
            </h2>
            <p className="text-xl text-ink-muted leading-relaxed">
              {t("home.description")}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group rounded-lg bg-surface border border-border shadow-sm hover:shadow-md transition-all motion-safe:duration-smooth p-8 flex flex-col gap-4 hover:border-accent/40"
                >
                  <Icon className="w-6 h-6 text-accent group-hover:scale-110 transition-transform motion-safe:duration-smooth" strokeWidth={1.5} />
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-semibold text-lg text-ink">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-ink-muted leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comment ça marche — séquence améliorée */}
      <section
        id="how-it-works"
        className="px-4 sm:px-6 py-24 md:py-32 bg-surface border-t border-border"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="font-display font-bold text-4xl md:text-5xl text-ink mb-16 text-center">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <div key={step.number} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-accent text-surface flex items-center justify-center shadow-md flex-shrink-0">
                    <span className="font-display text-xl font-bold">
                      {step.number}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden md:block h-px flex-1 bg-border" />
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="font-display font-semibold text-xl text-ink">
                    {step.title}
                  </h3>
                  <p className="text-base text-ink-muted leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA — premium avec gradients et spacing */}
      <section className="px-4 sm:px-6 py-24 md:py-32 bg-gradient-to-r from-accent to-accent-hover">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-display font-bold text-4xl md:text-5xl text-surface">
              {t("home.cta")}
            </h2>
            <p className="text-xl text-surface/90 leading-relaxed">
              {t("home.description")}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href="/createur">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto shadow-md hover:shadow-lg">
                {t("common.create")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto shadow-md hover:shadow-lg">
                {t("home.discoverAdmin")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}