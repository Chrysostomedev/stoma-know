import { getRequestConfig } from "next-intl/server";
import { i18n } from "@/i18n.config";

export default getRequestConfig(async ({ locale }) => {
  // Valide que le locale est supporté
  if (!i18n.locales.includes(locale as any)) {
    return {
      messages: (await import(`@/locales/${i18n.defaultLocale}.json`)).default,
    };
  }

  return {
    messages: (await import(`@/locales/${locale}.json`)).default,
  };
});
