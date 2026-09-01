import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "danger" | "info" | "primary";
  size?: "sm" | "md" | "lg";
  icon?: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", size = "md", icon, className, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center gap-1.5 font-medium rounded-full font-sans";

    const variantStyles = {
      default: "bg-surface-active text-ink border border-border",
      success: "bg-success-lighter text-success border border-success/20",
      warning: "bg-warning-lighter text-warning border border-warning/20",
      danger: "bg-danger-lighter text-danger border border-danger/20",
      info: "bg-blue-lighter text-blue border border-blue/20",
      primary: "bg-accent-lighter text-accent border border-accent/20",
    };

    const sizeStyles = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base",
    };

    return (
      <span
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";
