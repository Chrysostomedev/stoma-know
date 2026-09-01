import React from "react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  helperText?: string;
  fullWidth?: boolean;
  showCharCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      error,
      label,
      helperText,
      fullWidth = true,
      showCharCount = false,
      className,
      maxLength,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.currentTarget.value.length);
      props.onChange?.(e);
    };

    return (
      <div className={cn("flex flex-col gap-2", fullWidth && "w-full")}>
        <div className="flex items-center justify-between">
          {label && (
            <label className="text-sm font-medium text-ink font-sans">
              {label}
            </label>
          )}
          {showCharCount && maxLength && (
            <span className="text-xs text-ink-light font-sans">
              {charCount} / {maxLength}
            </span>
          )}
        </div>
        <textarea
          ref={ref}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border-2 transition-smooth font-sans text-base",
            "bg-surface text-ink placeholder-ink-light",
            "border-border hover:border-border-dark resize-none",
            "focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
            "disabled:bg-surface-active disabled:text-ink-muted disabled:cursor-not-allowed",
            error && "border-danger focus-visible:border-danger focus-visible:ring-danger/20",
            className
          )}
          maxLength={maxLength}
          onChange={handleChange}
          {...props}
        />
        {error && <p className="text-xs text-danger font-sans">{error}</p>}
        {helperText && !error && (
          <p className="text-xs text-ink-light font-sans">{helperText}</p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
