import React from "react";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface RatingScaleProps {
  value?: number;
  onChange: (value: number) => void;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  error?: string;
  label?: string;
  variant?: "star" | "number" | "emoji";
}

export const RatingScale = React.forwardRef<
  HTMLDivElement,
  RatingScaleProps
>(
  (
    {
      value,
      onChange,
      max = 5,
      minLabel,
      maxLabel,
      error,
      label,
      variant = "star",
    },
    ref
  ) => {
    const ratings = Array.from({ length: max }, (_, i) => i + 1);

    const renderRating = (rating: number) => {
      switch (variant) {
        case "star":
          return (
            <Star
              className={cn(
                "w-8 h-8 transition-all duration-200",
                value && value >= rating
                  ? "fill-amber text-amber"
                  : "text-border"
              )}
            />
          );
        case "emoji":
          const emojis = ["😞", "😕", "😐", "🙂", "😍"];
          return <span className="text-3xl">{emojis[rating - 1]}</span>;
        case "number":
        default:
          return (
            <span
              className={cn(
                "text-xl font-semibold font-sans",
                value && value >= rating ? "text-accent" : "text-border"
              )}
            >
              {rating}
            </span>
          );
      }
    };

    return (
      <div ref={ref} className="flex flex-col gap-4">
        {label && (
          <label className="text-sm font-medium text-ink font-sans">
            {label}
          </label>
        )}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between gap-2">
            {ratings.map((rating) => (
              <button
                key={rating}
                onClick={() => onChange(rating)}
                className={cn(
                  "p-2 rounded-lg transition-all",
                  "hover:bg-surface-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  value === rating && "bg-accent-lighter"
                )}
                type="button"
                aria-label={`Rating ${rating} out of ${max}`}
              >
                {renderRating(rating)}
              </button>
            ))}
          </div>
          {(minLabel || maxLabel) && (
            <div className="flex justify-between text-xs text-ink-light font-sans">
              {minLabel && <span>{minLabel}</span>}
              {maxLabel && <span>{maxLabel}</span>}
            </div>
          )}
        </div>
        {error && <p className="text-xs text-danger font-sans">{error}</p>}
      </div>
    );
  }
);

RatingScale.displayName = "RatingScale";
