import { cn } from "@/lib/cn";

export const CALCULATOR_DISCLAIMER =
  "Illustration only. Returns are assumed, not guaranteed. Mutual fund investments are subject to market risks.";

export function CalculatorDisclaimer({ className }: { className?: string }) {
  return (
    <p className={cn("flex items-start gap-2 rounded-card-sm border border-border bg-surface-2 px-4 py-3 text-sm text-fg", className)}>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-primary" fill="currentColor">
        <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm.75 10.5h-1.5v-4h1.5v4Zm0-5.5h-1.5V4.5h1.5V6Z" />
      </svg>
      <span>
        <strong className="font-semibold">Illustration only.</strong> Returns are assumed, not guaranteed. Mutual fund investments are
        subject to market risks.
      </span>
    </p>
  );
}
