import { type ColorToken } from "@/styles/colors";
import { Card } from "@/components/ui/Card";
import { ColorTokenCard } from "./ColorTokenCard";

interface ColorGroupSectionProps {
  title: string;
  description?: string;
  tokens: ColorToken[];
  labels?: Partial<Record<ColorToken, string>>;
  descriptions?: Partial<Record<ColorToken, string>>;
}

export function ColorGroupSection({
  title,
  description,
  tokens,
  labels,
  descriptions,
}: ColorGroupSectionProps) {
  return (
    <Card padding="lg" className="flex flex-col gap-5 border border-border bg-surface">
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-2xl font-semibold text-ink">{title}</h3>
        {description && <p className="text-sm text-ink-muted font-sans">{description}</p>}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {tokens.map((token) => (
          <ColorTokenCard
            key={token}
            token={token}
            label={labels?.[token]}
            description={descriptions?.[token]}
          />
        ))}
      </div>
    </Card>
  );
}
