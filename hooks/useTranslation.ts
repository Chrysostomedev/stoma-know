"use client";

import { useTranslations as useNextIntlTranslations } from "next-intl";

export function useTranslation() {
  return useNextIntlTranslations();
}
