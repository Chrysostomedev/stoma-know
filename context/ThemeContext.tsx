"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { colors as baseColors, type ColorToken } from "@/styles/colors";

type ColorMap = Record<ColorToken, string>;
type SaveStatus = "idle" | "saving" | "saved";

const STORAGE_KEY = "knowstoma-theme-overrides";
const PRESET_KEY = "knowstoma-theme-preset";

// Presets : on ne fait varier que les tokens de marque (accent),
// le reste (surfaces, texte, statuts) reste identique pour ne pas casser la lisibilité.
const presets: Record<string, { label: string; overrides: Partial<ColorMap> }> = {
  default: {
    label: "KnowStoma (défaut)",
    overrides: {},
  },
  ocean: {
    label: "Océan",
    overrides: {
      accent: "#2563EB",
      accentHover: "#1D4ED8",
      accentLight: "#DBEAFE",
      accentLighter: "#EFF6FF",
    },
  },
  sunset: {
    label: "Coucher de soleil",
    overrides: {
      accent: "#C2410C",
      accentHover: "#9A3412",
      accentLight: "#FFEDD5",
      accentLighter: "#FFF7ED",
    },
  },
};

interface ThemeContextValue {
  colors: ColorMap;
  draftColors: ColorMap;
  isDirty: boolean;
  saveStatus: SaveStatus;
  presets: typeof presets;
  currentPreset: string;
  setColor: (token: ColorToken, value: string) => void;
  resetToken: (token: ColorToken) => void;
  resetAll: () => void;
  save: () => void;
  switchPreset: (presetKey: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function toCssVarName(token: string) {
  return `--color-${token.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
}

function readStoredOverrides(): Partial<ColorMap> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [saved, setSaved] = useState<ColorMap>({ ...baseColors } as ColorMap);
  const [draft, setDraft] = useState<ColorMap>({ ...baseColors } as ColorMap);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [currentPreset, setCurrentPreset] = useState("default");

  useEffect(() => {
    const overrides = readStoredOverrides();
    const storedPreset = window.localStorage.getItem(PRESET_KEY);
    if (Object.keys(overrides).length > 0) {
      const merged = { ...baseColors, ...overrides } as ColorMap;
      setSaved(merged);
      setDraft(merged);
    }
    if (storedPreset && presets[storedPreset]) setCurrentPreset(storedPreset);
  }, []);

  useEffect(() => {
    let styleEl = document.getElementById("theme-draft-overrides") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "theme-draft-overrides";
      document.head.appendChild(styleEl);
    }
    const css = Object.entries(draft)
      .map(([token, value]) => `${toCssVarName(token)}: ${value};`)
      .join("\n");
    styleEl.textContent = `:root {\n${css}\n}`;
  }, [draft]);

  const setColor = useCallback((token: ColorToken, value: string) => {
    setDraft((prev) => ({ ...prev, [token]: value }));
    setCurrentPreset("custom");
  }, []);

  const resetToken = useCallback(
    (token: ColorToken) => setDraft((prev) => ({ ...prev, [token]: saved[token] })),
    [saved]
  );

  const resetAll = useCallback(() => {
    setDraft(saved);
    setCurrentPreset("default");
  }, [saved]);

  const switchPreset = useCallback((presetKey: string) => {
    const preset = presets[presetKey];
    if (!preset) return;
    const next = { ...baseColors, ...preset.overrides } as ColorMap;
    setDraft(next);
    setCurrentPreset(presetKey);
    // Un preset s'applique immédiatement ET se sauvegarde (comme dans le modèle fourni)
    setSaveStatus("saving");
    window.setTimeout(() => {
      setSaved(next);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        window.localStorage.setItem(PRESET_KEY, presetKey);
      } catch {}
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 1600);
    }, 300);
  }, []);

  const save = useCallback(() => {
    setSaveStatus("saving");
    window.setTimeout(() => {
      setSaved(draft);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
        window.localStorage.setItem(PRESET_KEY, currentPreset);
      } catch {}
      setSaveStatus("saved");
      window.setTimeout(() => setSaveStatus("idle"), 1600);
    }, 300);
  }, [draft, currentPreset]);

  const isDirty = useMemo(
    () => (Object.keys(draft) as ColorToken[]).some((t) => draft[t] !== saved[t]),
    [draft, saved]
  );

  return (
    <ThemeContext.Provider
      value={{
        colors: saved,
        draftColors: draft,
        isDirty,
        saveStatus,
        presets,
        currentPreset,
        setColor,
        resetToken,
        resetAll,
        save,
        switchPreset,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme doit être utilisé dans un <ThemeProvider>");
  return ctx;
}