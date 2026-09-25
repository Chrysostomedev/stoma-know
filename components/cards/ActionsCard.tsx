import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface ActionsCardProps {
  href: string;
  icon: ReactNode;
  title: string;
  description: string;
  variant?: "primary" | "secondary";
}

export function ActionsCard({
  href,
  icon,
  title,
  description,
  variant = "secondary",
}: ActionsCardProps) {
  const isPrimary = variant === "primary";

  return (
    <Link
      href={href}
      className={`group relative flex flex-col gap-4 h-full p-6 rounded-lg border transition-all motion-safe:duration-smooth motion-safe:ease-smooth ${
        isPrimary
          ? "bg-accent border-accent text-surface shadow-md hover:shadow-lg hover:bg-accent-hover"
          : "bg-surface border-border text-ink shadow-sm hover:shadow-md hover:border-accent/60"
      }`}
    >
      <div
        className={`w-11 h-11 rounded-md flex items-center justify-center transition-transform motion-safe:duration-smooth group-hover:scale-110 ${
          isPrimary ? "bg-surface/15" : "bg-accent-lighter text-accent"
        }`}
      >
        {icon}
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-display font-semibold text-lg">{title}</h3>
        <p
          className={`text-sm leading-relaxed ${
            isPrimary ? "text-surface/80" : "text-ink-muted"
          }`}
        >
          {description}
        </p>
      </div>

      <ArrowRight
        className={`w-4 h-4 mt-auto opacity-40 transition-all motion-safe:duration-smooth group-hover:opacity-100 group-hover:translate-x-1 ${
          isPrimary ? "text-surface" : "text-accent"
        }`}
      />
    </Link>
  );
}