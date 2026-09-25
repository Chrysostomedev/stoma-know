import Link from "next/link";
import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center text-surface font-display font-bold text-xs">
            K
          </div>
          <span className="text-sm text-ink-muted">{t("home.copyright")}</span>
        </div>

        <nav className="flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            {t("home.features")}
          </a>
          <Link
            href="/createur"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            {t("home.creatorSpace")}
          </Link>
          <Link
            href="/admin"
            className="text-sm text-ink-muted hover:text-ink transition-colors"
          >
            {t("admin.title")}
          </Link>
        </nav>
      </div>
    </footer>
  );
}