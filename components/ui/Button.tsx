import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      icon,
      iconPosition = "left",
      fullWidth = false,
      className,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-smooth focus-ring rounded-lg font-sans";

    const variantStyles = {
      primary:
        "bg-accent text-white hover:bg-accent-hover disabled:bg-border disabled:text-ink-muted",
      secondary:
        "bg-surface-active text-accent hover:bg-ink-light/10 disabled:bg-border disabled:text-ink-muted",
      outline:
        "border-2 border-accent text-accent hover:bg-accent-lighter disabled:border-border disabled:text-ink-muted",
      ghost:
        "text-accent hover:bg-surface-active disabled:text-ink-muted active:bg-ink-light/10",
      danger:
        "bg-danger text-white hover:bg-danger-hover disabled:bg-border disabled:text-ink-muted",
    };

    const sizeStyles = {
      sm: "px-3 py-2 text-sm gap-2",
      md: "px-4 py-2.5 text-base gap-2",
      lg: "px-6 py-3 text-lg gap-3",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
            {children && <span>{children}</span>}
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && <span>{icon}</span>}
            {children && <span>{children}</span>}
            {icon && iconPosition === "right" && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
