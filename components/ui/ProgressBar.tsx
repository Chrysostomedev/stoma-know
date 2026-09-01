import React from "react";
import { cn } from "@/lib/utils";

interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  animated?: boolean;
  color?: "accent" | "success" | "warning" | "danger" | "blue";
}

export const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, animated = true, color = "accent", className, ...props }, ref) => {
    const colorStyles = {
      accent: "bg-accent",
      success: "bg-success",
      warning: "bg-warning",
      danger: "bg-danger",
      blue: "bg-blue",
    };

    const clampedValue = Math.min(Math.max(value, 0), 100);

    return (
      <div
        ref={ref}
        className={cn("w-full h-2 bg-surface-active rounded-full overflow-hidden", className)}
        {...props}
      >
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out rounded-full",
            colorStyles[color],
            animated && "animate-pulse"
          )}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
