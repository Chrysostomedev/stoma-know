import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Palette, Settings2, Sparkles } from "lucide-react";

const settingsCards = [
  {
    title: "Couleurs",
    description: "Personnaliser la palette et le branding visuel de votre application.",
    href: "./parametres/couleurs",
    icon: Palette,
  },
  {
    title: "Général",
    description: "Paramètres globaux et préférences de l’interface d’administration.",
    href: "./parametres/general",
    icon: Settings2,
  },
];

export default function AdminSettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Badge variant="primary" size="sm" className="w-fit">
          Configuration
        </Badge>
        <h1 className="font-display text-3xl font-bold text-ink">Paramètres</h1>
        <p className="text-ink-muted font-sans">
          Gérez l’apparence et le comportement global de votre espace d’administration.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {settingsCards.map(({ title, description, href, icon: Icon }) => (
          <Link key={title} href={href} className="block h-full">
            <Card
              padding="lg"
              interactive
              className="flex h-full flex-col gap-4 bg-gradient-to-br from-surface to-surface-active"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-lighter text-accent">
                <Icon className="h-6 w-6" />
              </div>

              <div className="flex flex-col gap-2">
                <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
                <p className="text-sm text-ink-muted font-sans">{description}</p>
              </div>

              <div className="mt-auto flex items-center gap-2 text-sm font-medium text-accent">
                <Sparkles className="h-4 w-4" />
                Ouvrir
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
