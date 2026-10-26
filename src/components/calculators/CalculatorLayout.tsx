import type { ReactNode } from "react";
import { CalculatorDisclaimer } from "./Disclaimer";
import { LiveSummary } from "./LiveSummary";

/** Two-column calculator layout: inputs on the left, results on the right, chart and notes below. */
export function CalculatorLayout({
  inputs,
  results,
  comparison,
  chart,
  cta,
  notes,
  summary,
}: {
  inputs: ReactNode;
  results: ReactNode;
  comparison?: ReactNode;
  chart?: ReactNode;
  cta: ReactNode;
  notes?: ReactNode;
  /** One-sentence result summary, announced politely to screen readers after inputs settle. */
  summary: string;
}) {
  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
      <div className="space-y-7 rounded-card border border-border bg-surface p-6 md:p-8 lg:col-span-5">
        <h2 className="font-sans text-base font-semibold">Your inputs</h2>
        {inputs}
      </div>
      <div className="space-y-6 lg:col-span-7">
        <h2 className="sr-only">Results</h2>
        <LiveSummary text={summary} />
        {results}
        {comparison}
        <CalculatorDisclaimer />
        <div className="flex flex-wrap items-center gap-4">
          {cta}
          <p className="text-sm text-muted">We will walk through the numbers with you. The first conversation is free.</p>
        </div>
      </div>
      {chart && <div className="lg:col-span-12">{chart}</div>}
      {notes && <div className="text-sm text-muted lg:col-span-12">{notes}</div>}
    </div>
  );
}
