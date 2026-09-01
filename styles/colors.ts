/**
 * Système de couleurs centralisé pour KnowStoma
 * Source unique de vérité pour toutes les couleurs de l'application
 * Modifiable en un seul endroit, générère automatiquement les variables CSS
 */

export const colors = {
  // Fonds & surfaces
  canvas: "#F5F6F3",
  surface: "#FFFFFF",
  surfaceHover: "#F9F9F8",
  surfaceActive: "#F0F0ED",

  // Texte
  ink: "#14171F",
  inkMuted: "#6B7280",
  inkLight: "#9CA3AF",

  // Accents primaires
  accent: "#0B6E63",
  accentHover: "#095551",
  accentLight: "#D4E8E6",
  accentLighter: "#E8F4F2",

  // Accents complémentaires
  blue: "#3B82F6",
  blueLight: "#DBEAFE",
  blueLighter: "#EFF6FF",

  amber: "#E1A339",
  amberLight: "#FEF3C7",
  amberLighter: "#FFFBEB",

  // Statuts
  success: "#10B981",
  successLight: "#D1FAE5",
  successLighter: "#ECFDF5",

  danger: "#B4432D",
  dangerLight: "#FED7D7",
  dangerLighter: "#FEF2F2",

  warning: "#F59E0B",
  warningLight: "#FCD34D",
  warningLighter: "#FFFBEB",

  // Neutres & bordures
  border: "#E5E7EB",
  borderLight: "#F3F4F6",
  borderDark: "#D1D5DB",

  // Graphiques
  chart1: "#0B6E63",
  chart2: "#3B82F6",
  chart3: "#E1A339",
  chart4: "#10B981",
  chart5: "#B4432D",
  chart6: "#9333EA",

  // Overlay & feedback
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.25)",
} as const;

/**
 * Génère le bloc :root {...} avec toutes les variables CSS
 * Injecté une fois dans app/layout.tsx
 */
export function generateThemeCSS(): string {
  const cssVariables = Object.entries(colors)
    .map(([key, value]) => {
      const cssKey = `--color-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      return `${cssKey}: ${value};`;
    })
    .join("\n  ");

  return `:root {\n  ${cssVariables}\n}`;
}

/**
 * Types & utilitaires
 */
export type ColorToken = keyof typeof colors;

export function getColor(token: ColorToken): string {
  return colors[token];
}
