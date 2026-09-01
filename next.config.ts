import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // Configuration standard, pas de config Turbopack spéciale nécessaire
  // Turbopack est utilisé automatiquement en mode dev par Next.js 16+
};

export default withNextIntl(nextConfig);