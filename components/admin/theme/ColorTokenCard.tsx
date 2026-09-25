"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import type { ColorToken } from "@/styles/colors";

interface ColorTokenCardProps {
  token: ColorToken;
  label?: string;
  description?: string;
}

export function ColorTokenCard({ token, label, description }: ColorTokenCardProps) {
  const { draftColors, colors, setColor } = useTheme();
  const [copied, setCopied] = useState(false);
  const value = draftColors[token];
  const isChanged = value !== colors[token];
  const isPickable = /^#([0-9a-f]{3}){1,2}$/i.test(value);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface p-3">
      <div className="relative flex-shrink-0">
        <span className="block h-10 w-10 rounded-lg border border-border" style={{ backgroundColor: value }} />
        {isPickable && (
          <input
            type="color"
            value={value}
            onChange={(e) => setColor(token, e.target.value)}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            aria-label={`Choisir la couleur ${label ?? token}`}
          />
        )}
        {isChanged && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-surface" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-ink font-sans truncate">{label ?? token}</div>
        {description && <div className="text-xs text-ink-muted font-sans truncate">{description}</div>}
        <p className="mt-0.5 text-xs font-mono text-ink-muted">{value}</p>
      </div>

      <button
        onClick={handleCopy}
        className="flex-shrink-0 rounded-lg p-2 text-ink-muted hover:bg-surface-active hover:text-ink transition-colors"
        aria-label="Copier la valeur"
      >
        {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}