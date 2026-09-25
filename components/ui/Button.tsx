import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "default" | "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  default:
    "bg-accent text-surface border border-accent shadow-xs hover:bg-accent-hover hover:shadow-sm active:shadow-none disabled:bg-accent/50 disabled:border-accent/50",
  primary:
    "bg-accent text-surface border border-accent shadow-xs hover:bg-accent-hover hover:shadow-sm active:shadow-none disabled:bg-accent/50 disabled:border-accent/50",
  secondary:
    "bg-surface text-ink border border-border shadow-xs hover:bg-surface-hover hover:border-border-dark active:bg-surface-active disabled:text-ink-light disabled:bg-surface",
  outline:
    "bg-transparent text-ink border border-border hover:bg-surface-hover hover:border-border-dark active:bg-surface-active disabled:text-ink-light",
  ghost:
    "bg-transparent text-ink-muted border border-transparent hover:bg-surface-hover hover:text-ink disabled:text-ink-light",
  danger:
    "bg-danger text-surface border border-danger shadow-xs hover:opacity-90 hover:shadow-sm active:shadow-none disabled:opacity-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-sm gap-1.5",
  md: "h-10 px-4 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "default",
      size = "md",
      icon,
      iconPosition = "left",
      fullWidth = false,
      isLoading = false,
      disabled,
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={[
          "inline-flex items-center justify-center rounded-lg font-medium",
          "transition-[background-color,border-color,box-shadow,transform] duration-smooth ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 focus-visible:ring-offset-surface",
          "disabled:cursor-not-allowed disabled:pointer-events-none",
          "active:scale-[0.98]",
          variantStyles[variant],
          sizeStyles[size],
          fullWidth ? "w-full" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
          {isLoading ? "Chargement..." : children}
        {icon && iconPosition === "right" && (
          <span className="inline-flex shrink-0">{icon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";