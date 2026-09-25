import { forwardRef, type HTMLAttributes } from "react";

type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  variant?: "default" | "flat" | "outlined";
  /** Active un hover avec ombre plus marquée + légère élévation, pour les cartes cliquables */
  interactive?: boolean;
}

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { padding = "md", variant = "default", interactive = false, className = "", children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={[
          "rounded-xl border border-border shadow-xs",
          variant === "flat"
            ? "bg-surface-active"
            : variant === "outlined"
              ? "bg-surface border-2 border-accent/20"
              : "bg-surface",
          "transition-[box-shadow,border-color,transform] duration-smooth ease-smooth",
          interactive
            ? "hover:shadow-md hover:border-border-dark hover:-translate-y-0.5 cursor-pointer"
            : "",
          paddingStyles[padding],
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";