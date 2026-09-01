/**
 * Configuration i18n pour next-intl
 */

export const i18n = {
  defaultLocale: "fr",
  locales: ["fr", "en", "es"],
  localeNames: {
    fr: "Français",
    en: "English",
    es: "Español",
  },
} as const;

export type Locale = (typeof i18n.locales)[number];
