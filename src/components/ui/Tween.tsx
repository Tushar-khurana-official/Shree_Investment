"use client";

import { useEffect, useRef, useState } from "react";

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Number that tweens to its new value over 400ms when it changes (calculator outputs).
 * The first render shows the final value; with reduced motion it always jumps straight there.
 */
export function Tween({ value, format, durationMs = 400 }: { value: number; format: (n: number) => string; durationMs?: number }) {
  const [shown, setShown] = useState(value);
  const current = useRef(value);

  useEffect(() => {
    const from = current.current;
    if (from === value || !Number.isFinite(value) || !Number.isFinite(from) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      current.current = value;
      setShown(value);
      return;
    }
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min(1, (now - start) / durationMs);
      current.current = from + (value - from) * ease(t);
      setShown(current.current);
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
  }, [value, durationMs]);

  return <>{format(shown)}</>;
}
