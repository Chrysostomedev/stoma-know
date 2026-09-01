import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fonds & surfaces
        canvas: "var(--color-canvas)",
        surface: "var(--color-surface)",
        "surface-hover": "var(--color-surface-hover)",
        "surface-active": "var(--color-surface-active)",

        // Texte
        ink: "var(--color-ink)",
        "ink-muted": "var(--color-ink-muted)",
        "ink-light": "var(--color-ink-light)",

        // Accents primaires
        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-light": "var(--color-accent-light)",
        "accent-lighter": "var(--color-accent-lighter)",

        // Accents complémentaires
        blue: "var(--color-blue)",
        "blue-light": "var(--color-blue-light)",
        "blue-lighter": "var(--color-blue-lighter)",

        amber: "var(--color-amber)",
        "amber-light": "var(--color-amber-light)",
        "amber-lighter": "var(--color-amber-lighter)",

        // Statuts
        success: "var(--color-success)",
        "success-light": "var(--color-success-light)",
        "success-lighter": "var(--color-success-lighter)",

        danger: "var(--color-danger)",
        "danger-light": "var(--color-danger-light)",
        "danger-lighter": "var(--color-danger-lighter)",

        warning: "var(--color-warning)",
        "warning-light": "var(--color-warning-light)",
        "warning-lighter": "var(--color-warning-lighter)",

        // Neutres & bordures
        border: "var(--color-border)",
        "border-light": "var(--color-border-light)",
        "border-dark": "var(--color-border-dark)",
      },
      fontFamily: {
        sans: "var(--font-sans)",
        display: "var(--font-display)",
      },
    },
  },
  plugins: [],
};

export default config;
