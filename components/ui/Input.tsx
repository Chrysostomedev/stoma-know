import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      icon,
      error,
      label,
      helperText,
      fullWidth = true,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
        {label && (
          <label className="text-sm font-medium text-ink font-sans">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-3 flex-shrink-0 text-ink-light">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border-2 transition-smooth font-sans text-base",
              "bg-surface text-ink placeholder-ink-light",
              "border-border hover:border-border-dark",
              "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
              "disabled:bg-surface-active disabled:text-ink-muted disabled:cursor-not-allowed",
              error && "border-danger focus-visible:border-danger focus-visible:ring-danger/20",
              icon && "pl-10",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-danger font-sans">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-ink-light font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
