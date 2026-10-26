"use client";

import { useEffect, useRef, type ReactNode } from "react";

export type Step = { number: string; title: string; timeline: string; content: ReactNode };

/**
 * Numbered, editorial process steps with a timeline tag. A connecting Emerald line draws as the visitor scrolls
 * through the steps: horizontal across the top on desktop, vertical on the left on mobile. Full line with reduced motion.
 */
export function Stepper({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const hLine = useRef<HTMLSpanElement>(null);
  const vLine = useRef<HTMLSpanElement>(null);

  // Scroll-linked progress: 0 when the steps' top reaches 85% of the viewport, 1 when their bottom reaches 55%.
  useEffect(() => {
    const list = ref.current;
    if (!list || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.55;
      const p = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
      if (hLine.current) hLine.current.style.transform = `scaleX(${p})`;
      if (vLine.current) vLine.current.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol ref={ref} className="relative grid gap-0 border-t border-border pl-6 md:grid-cols-4 md:pl-0">
      <span aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-border md:hidden" />
      <span ref={vLine} aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-0.5 origin-top bg-primary md:hidden" />
      <span ref={hLine} aria-hidden="true" className="absolute -top-px left-0 right-0 hidden h-0.5 origin-left bg-primary md:block" />
      {steps.map((s, i) => (
        <li key={s.number} className={`relative py-8 md:px-6 md:py-10 ${i > 0 ? "border-t border-border md:border-l md:border-t-0" : ""} md:first:pl-0`}>
          <span aria-hidden="true" className="absolute -left-[1.85rem] top-9 h-3 w-3 rounded-full border-2 border-primary bg-surface md:-top-[7px] md:left-auto md:right-auto" />
          <div className="flex items-baseline justify-between gap-4">
            <span className="font-display text-5xl text-primary tabular" aria-hidden="true">
              {s.number}
            </span>
            <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
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
