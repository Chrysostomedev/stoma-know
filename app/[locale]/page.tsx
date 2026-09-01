import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
    icon: <FileText className="w-6 h-6" />,
    titleKey: "Parcours fluide",
    descKey: "Une question à la fois pour une meilleure expérience",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    titleKey: "Tableaux de bord",
    descKey: "Analysez vos données en temps réel",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    titleKey: "Sécurisé",
    descKey: "Vos données sont protégées et confidentielles",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    titleKey: "Mobile-first",
    descKey: "Fonctionne parfaitement sur tous les appareils",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    titleKey: "Performance",
    descKey: "Rapide, responsive et optimisé",
  },
  {
    icon: <CheckCircle2 className="w-6 h-6" />,
    titleKey: "Logique conditionnelle",
    descKey: "Adaptez vos sondages à chaque répondant",
  },
];

export default function Home() {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-surface sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold">
              K
            </div>
            <span className="font-display font-semibold text-ink text-lg hidden sm:inline">
              {t("common.appName")}
            </span>
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="#features"
              className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
            >
              {t("home.features")}
            </a>
            <Link href="/admin" className="text-sm font-medium text-ink-muted hover:text-ink transition-colors">
              {t("admin.title")}
            </Link>
            <LanguageSwitcher variant="button" />
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="flex-1 px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-b from-canvas to-surface">
        <div className="max-w-4xl mx-auto flex flex-col gap-8 text-center">
          <div className="flex flex-col gap-4">
            <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight text-ink">
              {t("home.title")}{" "}
              <span className="text-accent">{t("home.creatorSpace")}</span>
            </h1>
            <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto">
              {t("home.description")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link href="/repondre/rapport-hebdo">
              <Button
                size="lg"
                className="w-full sm:w-auto"
                icon={<FileText className="w-5 h-5" />}
              >
                {t("home.respondSurvey")}
              </Button>
            </Link>
            <Link href="/createur">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
                icon={<BarChart3 className="w-5 h-5" />}
              >
                {t("home.creatorSpace")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                {t("admin.title")}
              </Button>
            </Link>
          </div>

          {/* Badge social proof */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-amber text-xl">
                  ★
                </span>
              ))}
            </div>
            <p className="text-sm text-ink-muted">
              {t("home.respondSurvey")} (démo)
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="px-4 sm:px-6 py-16 md:py-24 bg-surface"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-4">
              {t("home.features")}
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">
              {t("home.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} padding="md" className="flex flex-col gap-4">
                <div className="p-3 bg-accent-lighter text-accent rounded-lg w-fit">
                  {feature.icon}
                </div>
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans font-semibold text-ink">
                    {feature.titleKey}
                  </h3>
                  <p className="text-sm text-ink-muted">{feature.descKey}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-16 md:py-24 bg-gradient-to-r from-accent to-accent-hover">
        <div className="max-w-4xl mx-auto text-center flex flex-col gap-6">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-white">
            {t("home.cta")}
          </h2>
          <p className="text-lg text-white/90">{t("home.description")}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/createur">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                {t("common.create")}
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                {t("home.discoverAdmin")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-center">
          <p className="text-sm text-ink-muted font-sans">
            {t("home.copyright")}
          </p>
        </div>
      </footer>
    </div>
  );
}
