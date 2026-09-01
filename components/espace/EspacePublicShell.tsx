import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface EspacePublicShellProps {
  children: React.ReactNode;
  surveyTitle?: string;
  onClose?: () => void;
  showHeader?: boolean;
}

/**
 * Shell pour l'espace public (répondant)
 * Mise en page minimale, centrée, sans distraction
 * Pensée pour la concentration sur une question
 */
export const EspacePublicShell = React.forwardRef<
  HTMLDivElement,
  EspacePublicShellProps
>(
  (
    {
      children,
      surveyTitle = "KnowStoma",
      onClose,
      showHeader = true,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="min-h-screen flex flex-col bg-canvas"
      >
        {/* Header minimal */}
        {showHeader && (
          <div className="border-b border-border bg-surface">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-display font-bold text-sm">
                  K
                </div>
                <span className="font-display font-semibold text-ink hidden sm:inline">
                  {surveyTitle}
                </span>
              </div>
              {onClose && (
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-surface-active rounded-lg transition-smooth focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-ink-muted" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Contenu principal */}
        <div className="flex-1 flex flex-col">
          <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 md:py-12 flex flex-col">
            {children}
          </div>
        </div>

        {/* Footer optionnel */}
        <div className="border-t border-border bg-surface py-4">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <p className="text-xs text-ink-light text-center font-sans">
              Vos données sont sécurisées et confidentielles
            </p>
          </div>
        </div>
      </div>
    );
  }
);

EspacePublicShell.displayName = "EspacePublicShell";
