import type { ReactNode } from "react";
import { isPlaceholder, showTodos } from "@config";

/** Visible marker for an unfinished value. Only ever rendered when showTodos is true (development). */
export function TodoMarker({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-accent-strong px-1.5 py-0.5 text-xs font-semibold text-on-accent">
      TODO: {children}
    </mark>
  );
}

/**
 * Renders a value from site.config.ts. If it is still a placeholder, development shows a TODO marker
 * and production renders nothing, so bracketed placeholders never reach the live site.
 */
export function ConfigText({ value, label }: { value: string; label: string }) {
  if (!isPlaceholder(value)) return <>{value}</>;
  return showTodos ? <TodoMarker>{label} in site.config.ts</TodoMarker> : null;
}

/** True when every value is set, so a whole line can be dropped in production if any is missing. */
export function allSet(...values: string[]) {
  return values.every((v) => !isPlaceholder(v));
}
