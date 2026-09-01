"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface FormStep {
  id: string;
  label: string;
  description?: string;
  completed?: boolean;
}

interface SurveyFormProgressBarProps {
  steps: FormStep[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
}

export const SurveyFormProgressBar: React.FC<SurveyFormProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Chemin visuel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((step, idx) => (
          <React.Fragment key={step.id}>
            {/* Étape */}
            <button
              onClick={() => onStepClick?.(idx)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-lg transition-smooth whitespace-nowrap font-sans text-sm font-medium",
                idx < currentStep
                  ? "bg-success-lighter text-success cursor-pointer"
                  : idx === currentStep
                  ? "bg-accent text-white"
                  : "bg-surface-active text-ink-muted",
                onStepClick && idx < currentStep && "hover:bg-success"
              )}
            >
              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-current/20 flex items-center justify-center">
                {idx < currentStep ? "✓" : idx + 1}
              </span>
              {step.label}
            </button>

            {/* Séparateur */}
            {idx < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-border flex-shrink-0" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progression linéaire */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ink-light font-sans">
            Étape {currentStep + 1} sur {steps.length}
          </span>
          <span className="text-xs font-medium text-ink-light font-sans">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="h-1.5 bg-surface-active rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-accent to-accent-hover transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

SurveyFormProgressBar.displayName = "SurveyFormProgressBar";
