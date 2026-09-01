import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "flat" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = "default",
      padding = "md",
      interactive = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-xl bg-surface";

    const variantStyles = {
      default: "border border-border shadow-sm",
      elevated: "shadow-lg",
      flat: "bg-surface-active border border-border/50",
      outlined: "border-2 border-accent/20",
    };

    const paddingStyles = {
      none: "",
      sm: "p-3",
      md: "p-4 md:p-6",
      lg: "p-6 md:p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          interactive &&
            "cursor-pointer transition-smooth hover:shadow-md active:shadow-none",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";
