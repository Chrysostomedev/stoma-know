"use client";

import React from "react";

interface Step {
  id: string;
  label: string;
  description: string;
}

interface SurveyFormProgressBarProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export const SurveyFormProgressBar: React.FC<SurveyFormProgressBarProps> = ({
  steps,
  currentStep,
  onStepClick,
}) => {
  const step = steps[currentStep];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm text-ink-light font-sans">
          Étape {currentStep + 1} sur {steps.length}
        </span>
        <h1 className="font-display font-semibold text-2xl text-ink">{step.label}</h1>
        <p className="text-ink-muted font-sans text-sm">{step.description}</p>
      </div>

      <div className="flex items-center">
        {steps.map((s, idx) => {
          const isDone = idx < currentStep;
          const isActive = idx === currentStep;
          return (
            <React.Fragment key={s.id}>
              <button
                type="button"
                onClick={() => onStepClick?.(idx)}
                aria-label={s.label}
                aria-current={isActive ? "step" : undefined}
                className={`rounded-full flex-shrink-0 transition-all ${
                  isActive
                    ? "w-3 h-3 bg-accent ring-4 ring-accent-lighter"
                    : isDone
                    ? "w-2.5 h-2.5 bg-accent"
                    : "w-2.5 h-2.5 bg-surface-active border border-border"
                }`}
              />
              {idx < steps.length - 1 && (
                <span
                  className={`flex-1 h-px mx-2 transition-colors ${
                    idx < currentStep ? "bg-accent" : "bg-border"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>  
  );
};

SurveyFormProgressBar.displayName = "SurveyFormProgressBar";