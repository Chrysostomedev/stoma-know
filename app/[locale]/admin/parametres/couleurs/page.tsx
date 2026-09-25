"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useTheme } from "@/context/ThemeContext";
import { type ColorToken } from "@/styles/colors";
import { Palette, RotateCcw, Copy, Check, Sparkles } from "lucide-react";

const groups: Array<{ title: string; tokens: ColorToken[]; labels: Partial<Record<ColorToken, string>> }> = [
  {
    title: "Fonds & surfaces",
    tokens: ["canvas", "surface", "surfaceHover", "surfaceActive"],
    labels: { canvas: "Canvas", surface: "Surface", surfaceHover: "Surface hover", surfaceActive: "Surface active" },
  },
  {
    title: "Texte",
    tokens: ["ink", "inkMuted", "inkLight"],
    labels: { ink: "Texte principal", inkMuted: "Texte secondaire", inkLight: "Texte discret" },
  },
  {
    title: "Accent principal",
    tokens: ["accent", "accentHover", "accentLight", "accentLighter"],
    labels: { accent: "Accent", accentHover: "Accent hover", accentLight: "Accent clair", accentLighter: "Accent très clair" },
  },
  {
    title: "Accents complémentaires",
    tokens: ["blue", "blueLight", "amber", "amberLight"],
    labels: { blue: "Bleu", blueLight: "Bleu clair", amber: "Ambre", amberLight: "Ambre clair" },
  },
  {
    title: "Statuts",
    tokens: ["success", "warning", "danger"],
    labels: { success: "Succès", warning: "Avertissement", danger: "Danger" },
  },
  {
    title: "Bordures & neutrals",
    tokens: ["border", "borderLight", "borderDark"],
    labels: { border: "Bordure", borderLight: "Bordure claire", borderDark: "Bordure sombre" },
  },
];

export default function AdminThemePage() {
  const t = useTranslations("admin");
  const {
    draftColors,
    colors,
    isDirty,
    saveStatus,
    presets,
    currentPreset,
    setColor,
    resetAll,
    save,
    switchPreset,
  } = useTheme();

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  return (
    <div className="min-h-screen bg-canvas p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-accent p-3">
              <Palette className="w-6 h-6 text-surface" />
            </div>
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold text-ink">
                {t("colors") ?? "Palette de couleurs"}
              </h1>
              <p className="text-ink-muted">
                Centralisez la charte visuelle de l'application
              </p>
            </div>

            <div className="flex items-center gap-2">
              {saveStatus === "saving" && (
                <div
                  className="flex items-center gap-2 rounded-lg bg-accent-lighter px-3 py-2 text-accent"
                >
                  <div className="h-2 w-2 animate-pulse rounded-full bg-accent" />
                  <span className="text-xs font-bold">Enregistrement...</span>
                </div>
              )}
              {saveStatus === "saved" && (
                <div
                  className="flex items-center gap-2 rounded-lg bg-success px-3 py-2 text-surface"
                >
                  <Check className="w-4 h-4" />
                  <span className="text-xs font-bold">Enregistré !</span>
                </div>
              )}
              {isDirty && saveStatus === "idle" && (
                <span className="text-xs font-medium text-amber">
                  Modifications non enregistrées
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="rounded-lg border border-border bg-surface p-6 md:p-8">
          <h2 className="mb-6 font-display text-xl font-bold text-ink">
            Thèmes prédéfinis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(presets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => switchPreset(key)}
                className={`rounded-lg border-2 p-4 text-left transition-all ${
                  currentPreset === key ? "border-accent" : "border-border"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex gap-1">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.overrides.accent ?? colors.accent }}
                    />
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: preset.overrides.accentHover ?? colors.accentHover }}
                    />
                    <div
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: colors.surface }}
                    />
                  </div>
                  {currentPreset === key && (
                    <span className="ml-auto rounded bg-accent-lighter px-2 py-1 text-xs font-bold text-accent">
                      Actif
                    </span>
                  )}
                </div>
                <p className="font-sans font-semibold text-ink">
                  {preset.label}
                </p>
              </button>
            ))}
          </div>

          <button
            onClick={resetAll}
            disabled={!isDirty}
            className="mt-6 flex items-center gap-2 rounded-lg border-2 border-border px-4 py-2 text-ink transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="w-4 h-4" />
            Réinitialiser au défaut
          </button>
        </div>

        {/* Éditeur personnalisé */}
        <div className="rounded-lg border border-border bg-surface p-6 md:p-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <h2 className="font-display text-xl font-bold text-ink">
              Éditeur de couleurs personnalisé (en live)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {groups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="font-sans text-sm font-semibold text-ink">
                  {group.title}
                </h3>
                {group.tokens.map((token) => (
                  <ColorPickerGroup
                    key={token}
                    label={group.labels[token] ?? token}
                    value={draftColors[token]}
                    onChange={(val) => setColor(token, val)}
                    onCopy={() => copyToClipboard(draftColors[token], token)}
                    copied={copiedField === token}
                  />
                ))}
              </div>
            ))}
          </div>

          <div
            className="mt-6 rounded-lg border-l-4 border-accent bg-accent-lighter p-3"
          >
            <p className="font-sans text-xs text-ink-muted">
              💡 Les modifications s'appliquent instantanément à toute l'application. Clique sur{" "}
              <strong>Enregistrer</strong> pour les conserver après rechargement.
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={save}
              disabled={!isDirty}
              className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-surface transition-all disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Check className="w-4 h-4" />
              Enregistrer les changements
            </button>
          </div>
        </div>

        {/* Aperçu en direct */}
        <div className="rounded-lg border border-border bg-surface p-6 md:p-8">
          <h2 className="mb-6 font-display text-xl font-bold text-ink">
            Aperçu en direct
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="rounded-lg p-6 text-center font-bold text-surface transition-all duration-300"
              style={{ backgroundColor: draftColors.accent }}
            >
              Accent
              <p className="text-xs mt-2 opacity-80 font-mono">{draftColors.accent}</p>
            </div>

            <div
              className="p-6 rounded-lg text-center font-bold transition-all duration-300"
              style={{ backgroundColor: draftColors.surfaceActive, color: draftColors.ink }}
            >
              Surface active
              <p className="text-xs mt-2 opacity-70 font-mono">{draftColors.surfaceActive}</p>
            </div>

            <div
              className="p-6 rounded-lg text-center font-bold border-2 transition-all duration-300"
              style={{
                backgroundColor: draftColors.surface,
                color: draftColors.ink,
                borderColor: draftColors.border,
              }}
            >
              Texte principal
              <p className="text-xs mt-2 font-mono">{draftColors.ink}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Sélecteur de couleur réutilisable — swatch natif + hex + copier
 */
function ColorPickerGroup({
  label,
  value,
  onChange,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onCopy: () => void;
  copied: boolean;
}) {
  const isPickable = /^#([0-9a-f]{3}){1,2}$/i.test(value);

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <span
          className="block w-12 h-12 rounded border-2"
          style={{ backgroundColor: value }}
        />
        {isPickable && (
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 w-12 h-12 rounded cursor-pointer opacity-0"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-mono text-xs text-ink-light">{label}</p>
        <p className="truncate font-mono text-sm font-bold text-ink">{value}</p>
      </div>
      <button
        onClick={onCopy}
        className="flex-shrink-0 rounded p-2 text-accent transition-opacity hover:opacity-70"
        aria-label="Copier"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}