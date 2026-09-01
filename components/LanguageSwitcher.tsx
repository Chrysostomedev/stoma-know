"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { i18n, type Locale } from "@/i18n.config";
import { Button } from "@/components/ui/Button";
import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "button" | "dropdown";
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "dropdown",
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("common");
  const [isOpen, setIsOpen] = React.useState(false);

  const switchLocale = (newLocale: Locale) => {
    // Enlève le locale actuel du chemin et le remplace
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
    setIsOpen(false);
  };

  if (variant === "button") {
    return (
      <div className="flex gap-2">
        {i18n.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => switchLocale(loc)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
              locale === loc
                ? "bg-accent text-white"
                : "bg-surface-active text-ink hover:bg-border"
            )}
          >
            {i18n.localeNames[loc as Locale]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-surface-active transition-colors focus-ring"
      >
        <Globe className="w-5 h-5" />
        <span className="text-sm font-medium uppercase">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 min-w-[150px]">
          {i18n.locales.map((loc) => (
            <button
              key={loc}
              onClick={() => switchLocale(loc)}
              className={cn(
                "w-full text-left px-4 py-2 text-sm font-medium transition-colors",
                locale === loc
                  ? "bg-accent-lighter text-accent"
                  : "hover:bg-surface-active text-ink"
              )}
            >
              {i18n.localeNames[loc as Locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";
