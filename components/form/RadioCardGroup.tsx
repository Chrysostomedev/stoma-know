import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface RadioOption {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface RadioCardGroupProps {
  options: RadioOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  label?: string;
}

export const RadioCardGroup = React.forwardRef<
  HTMLDivElement,
  RadioCardGroupProps
>(({ options, value, onChange, error, label }, ref) => {
  return (
    <div ref={ref} className="flex flex-col gap-4">
      {label && (
        <label className="text-sm font-medium text-ink font-sans">{label}</label>
      )}
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative p-4 rounded-lg border-2 transition-smooth text-left",
              "bg-surface hover:bg-surface-hover",
              "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              value === option.id
                ? "border-accent bg-accent-lighter focus-visible:ring-accent"
                : "border-border hover:border-border-dark focus-visible:ring-accent",
              error && "border-danger"
            )}
            type="button"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all",
                  value === option.id
                    ? "border-accent bg-accent"
                    : "border-border group-hover:border-border-dark"
                )}
              >
                {value === option.id && (
                  <Check className="w-3 h-3 text-white animate-in fade-in zoom-in duration-200" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-ink font-sans">{option.label}</p>
                {option.description && (
                  <p className="text-sm text-ink-muted mt-1 font-sans">
                    {option.description}
                  </p>
                )}
              </div>
              {option.icon && (
                <span className="flex-shrink-0 text-ink-light">{option.icon}</span>
              )}
            </div>
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-danger font-sans">{error}</p>}
    </div>
  );
});

RadioCardGroup.displayName = "RadioCardGroup";
