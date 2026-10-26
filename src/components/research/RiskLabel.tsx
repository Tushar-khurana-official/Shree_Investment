import { RISK_LEVELS, type RiskLevel } from "@/lib/research";

/** Riskometer label: text plus a six-segment meter, so the level never depends on colour alone. */
export function RiskLabel({ level }: { level: RiskLevel }) {
  const idx = RISK_LEVELS.indexOf(level);
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap text-sm">
      <span aria-hidden="true" className="flex gap-0.5">
        {RISK_LEVELS.map((_, i) => (
          <span key={i} className={`h-3 w-1.5 rounded-sm ${i <= idx ? (i >= 4 ? "bg-danger" : "bg-fg/70") : "bg-border"}`} />
        ))}
      </span>
      <span>
        {level}
        <span className="sr-only"> risk (level {idx + 1} of 6)</span>
      </span>
    </span>
  );
}
