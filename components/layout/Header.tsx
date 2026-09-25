import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export async function Header() {
  const t = await getTranslations();

  return (
    <header className="border-b border-border bg-surface/95 backdrop-blur-md sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-md bg-accent shadow-sm group-hover:shadow-md transition-shadow motion-safe:duration-smooth flex items-center justify-center text-surface font-display font-bold text-sm">
            K
          </div>
          <span className="font-display font-semibold text-ink text-lg hidden sm:inline group-hover:text-accent transition-colors motion-safe:duration-smooth">
            {t("common.appName")}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm text-ink-muted hover:text-accent transition-colors motion-safe:duration-smooth font-medium"
          >
            {t("home.features")}
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-ink-muted hover:text-accent transition-colors motion-safe:duration-smooth font-medium"
          >
            Comment ça marche
          </a>
          <Link
            href="/admin"
            className="text-sm text-ink-muted hover:text-accent transition-colors motion-safe:duration-smooth font-medium"
          >
            {t("admin.title")}
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="button" />
          <Link href="/createur" className="hidden sm:block">
            <Button size="sm">{t("common.create")}</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}