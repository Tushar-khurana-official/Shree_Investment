"use client";

import { useEffect, useRef } from "react";
import { formatIndianNumber } from "@/lib/format";

/**
 * Counts up from 0 to `value` when scrolled into view. Server-renders the final value (for SEO and no-JS),
 * and screen readers always get the final value. Skipped when the user prefers reduced motion.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  durationMs = 1400,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  durationMs?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) => `${prefix}${decimals > 0 ? n.toFixed(decimals) : formatIndianNumber(n)}${suffix}`;

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Animate by writing text directly, so the count-up never re-renders React on every frame.
    const fmt = (n: number) => `${prefix}${decimals > 0 ? n.toFixed(decimals) : formatIndianNumber(n)}${suffix}`;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / durationMs);
          el.textContent = fmt(value * (1 - Math.pow(1 - t, 3)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      el.textContent = fmt(value);
    };
  }, [value, prefix, suffix, decimals, durationMs]);

  return (
    <span>
      <span ref={ref} aria-hidden="true">
        {format(value)}
      </span>
      <span className="sr-only">{format(value)}</span>
    </span>
  );
}
