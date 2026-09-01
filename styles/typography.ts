/**
 * Système de typographie centralisé pour KnowStoma
 * Deux familles : Fraunces (display) et Inter (sans)
 * Échelles standardisées pour cohérence visuelle
 */

export const typography = {
  // Display (Fraunces) - Titres et moments hero
  display: {
    xl: {
      fontSize: "3rem",
      lineHeight: "1.2",
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    lg: {
      fontSize: "2.25rem",
      lineHeight: "1.2",
      fontWeight: 600,
      letterSpacing: "-0.01em",
    },
    md: {
      fontSize: "1.875rem",
      lineHeight: "1.3",
      fontWeight: 600,
    },
    sm: {
      fontSize: "1.5rem",
      lineHeight: "1.4",
      fontWeight: 600,
    },
  },

  // Body (Inter) - Interface générale
  body: {
    lg: {
      fontSize: "1.125rem",
      lineHeight: "1.6",
      fontWeight: 400,
    },
    md: {
      fontSize: "1rem",
      lineHeight: "1.6",
      fontWeight: 400,
    },
    sm: {
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: 400,
    },
    xs: {
      fontSize: "0.75rem",
      lineHeight: "1.5",
      fontWeight: 400,
    },
  },

  // Labels & captions
  label: {
    lg: {
      fontSize: "1rem",
      lineHeight: "1.4",
      fontWeight: 600,
      letterSpacing: "0.005em",
    },
    md: {
      fontSize: "0.875rem",
      lineHeight: "1.4",
      fontWeight: 600,
      letterSpacing: "0.005em",
    },
    sm: {
      fontSize: "0.75rem",
      lineHeight: "1.3",
      fontWeight: 600,
      letterSpacing: "0.01em",
    },
  },
} as const;

export type TypographyLevel = keyof typeof typography;
export type TypographySize = keyof typeof typography.display;
