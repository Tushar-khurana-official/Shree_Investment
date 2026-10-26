"use client";

import { COMPARISON_RATES } from "@/lib/calculators";
import { cn } from "@/lib/cn";

/**
 * The same calculation at 10%, 12% and 14% side by side. Selecting a column sets the expected return.
 * The active rate is marked with text ("Selected"), not colour alone.
 */
export function ReturnComparison({
  metricLabel,
  compute,
  activeRate,
  onSelect,
}: {
  metricLabel: string;
  compute: (rate: number) => string;
  activeRate: number;
  onSelect: (rate: number) => void;
}) {
  return (
    <section aria-label={`${metricLabel} at different assumed returns`}>
      <h3 className="eyebrow">Compare assumed returns</h3>
      <p className="mt-1 text-sm text-muted">{metricLabel} at three assumed annual returns.</p>
      <ul className="mt-3 grid grid-cols-3 gap-2">
        {COMPARISON_RATES.map((rate) => {
          const active = rate === activeRate;
          return (
            <li key={rate}>
              <button
                type="button"
                onClick={() => onSelect(rate)}
                aria-pressed={active}
                className={cn(
                  "w-full rounded-card-sm border p-3 text-left transition-colors",
                  active ? "border-primary bg-primary-soft" : "border-border bg-surface hover:border-primary",
                )}
              >
                <span className={cn("flex flex-col gap-0.5 text-xs font-medium sm:flex-row sm:items-center sm:justify-between", active ? "text-fg" : "text-muted")}>
                  At {rate}%{active && <span className="text-fg">✓ Selected</span>}
                </span>
                <span className="mt-1 block font-display text-lg tabular md:text-xl">{compute(rate)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
