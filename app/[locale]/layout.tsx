import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { i18n } from "@/i18n.config";
import { ToastProvider } from "@/context/ToastContext";

export const dynamic = "force-dynamic";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!i18n.locales.includes(locale as any)) {
    notFound();
  }

  // ✅ Défini le locale pour le contexte de requête
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ToastProvider>{children}</ToastProvider>
    </NextIntlClientProvider>
  );
}