import { colors } from "@/styles/colors";
import { Badge } from "@/components/ui/Badge";
import { useTheme } from "@/context/ThemeContext";

export function ThemePreview() {
    const { draftColors: colors } = useTheme(); // seule ligne qui change

  return (
    <div
      className="overflow-hidden rounded-[28px] border border-border bg-surface shadow-lg"
      style={{
        background: `linear-gradient(135deg, ${colors.surface} 0%, ${colors.canvas} 100%)`,
      }}
    >
      <div
        className="flex items-center justify-between border-b border-border px-5 py-4"
        style={{ backgroundColor: colors.surface }}
      >
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl text-sm font-bold text-surface"
            style={{ backgroundColor: colors.accent }}
          >
            K
          </div>
          <div>
            <div className="text-sm font-semibold text-ink font-sans">KnowStoma</div>
            <div className="text-[11px] text-ink-muted font-sans">Preview thème</div>
          </div>
        </div>

        <Badge variant="primary" size="sm">
          Live
        </Badge>
      </div>

      <div className="grid gap-4 p-5 md:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-border p-4" style={{ backgroundColor: colors.surface }}>
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-ink font-sans">Page principale</span>
            <span className="text-[11px] text-ink-muted font-sans">Aujourd’hui</span>
          </div>

          <div className="space-y-3">
            <div
              className="h-11 rounded-xl"
              style={{ background: `linear-gradient(90deg, ${colors.accent} 0%, ${colors.accentHover} 100%)` }}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl p-3" style={{ backgroundColor: colors.accentLighter }}>
                <div className="text-[11px] text-ink-muted font-sans">Taux</div>
                <div className="mt-1 text-lg font-bold text-ink font-sans">78%</div>
              </div>
              <div className="rounded-xl border border-border p-3" style={{ backgroundColor: colors.surface }}>
                <div className="text-[11px] text-ink-muted font-sans">Réponses</div>
                <div className="mt-1 text-lg font-bold text-ink font-sans">32k</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border p-4" style={{ backgroundColor: colors.surfaceActive }}>
          <div className="mb-3 text-sm font-semibold text-ink font-sans">Palette</div>
          <div className="flex flex-wrap gap-2">
            {[colors.accent, colors.blue, colors.success, colors.warning, colors.danger].map((color) => (
              <div
                key={color}
                className="h-8 w-8 rounded-lg border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
