import React from "react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/ui/ProgressBar";

interface StepHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  description?: string;
  showProgress?: boolean;
  variant?: "compact" | "detailed";
}

export const StepHeader = React.forwardRef<HTMLDivElement, StepHeaderProps>(
  (
    {
      currentStep,
      totalSteps,
      title,
      description,
      showProgress = true,
      variant = "detailed",
    },
    ref
  ) => {
    const progressPercent = (currentStep / totalSteps) * 100;

    return (
      <div ref={ref} className="flex flex-col gap-4 w-full">
        {/* Header avec badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-sm font-medium text-accent font-sans">
              Étape {currentStep}
            </span>
            <span className="text-sm text-ink-light font-sans">
              sur {totalSteps}
            </span>
          </div>
          {variant === "detailed" && (
            <span className="text-xs text-ink-light font-sans">
              {Math.round(progressPercent)}% complété
            </span>
          )}
        </div>

        {/* Barre de progression */}
        {showProgress && <ProgressBar value={progressPercent} color="accent" />}

        {/* Titre et description */}
        <div className="flex flex-col gap-2">
          <h1
            className={cn(
              "font-display font-semibold text-ink leading-tight",
              variant === "detailed" ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"
            )}
          >
            {title}
          </h1>
          {description && (
            <p className="text-base text-ink-muted font-sans">{description}</p>
          )}
        </div>
      </div>
    );
  }
);

StepHeader.displayName = "StepHeader";
