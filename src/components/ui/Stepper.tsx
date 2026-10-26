import type { ReactNode } from "react";

export type Step = { number: string; title: string; timeline: string; content: ReactNode };

/** Numbered, editorial process steps with a timeline tag. */
export function Stepper({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-0 border-t border-border md:grid-cols-4">
      {steps.map((s, i) => (
        <li key={s.number} className={`relative py-8 md:px-6 md:py-10 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} md:first:pl-0`}>
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-5xl text-primary tabular" aria-hidden="true">
              {s.number}
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted">
              <span className="sr-only">Timeline: </span>
              {s.timeline}
            </span>
          </div>
          <h3 className="mt-6 text-xl">
            <span className="sr-only">Step {s.number}: </span>
            {s.title}
          </h3>
          <div className="mt-3 text-muted">{s.content}</div>
        </li>
      ))}
    </ol>
  );
}
