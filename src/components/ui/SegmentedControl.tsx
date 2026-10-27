"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

/** Radio-group styled as pills. Native radios give arrow-key navigation for free. */
export function SegmentedControl<T extends string | number>({
  label,
  options,
  value,
  onChange,
  hideLabel,
}: {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  hideLabel?: boolean;
}) {
  const name = useId();
  return (
    <fieldset>
      <legend className={cn("mb-2 text-sm font-medium", hideLabel && "sr-only")}>{label}</legend>
      <div className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-surface p-1">
        {options.map((o) => {
          const checked = o.value === value;
          return (
            <label
              key={String(o.value)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-2 text-sm font-medium tabular transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-primary",
                checked ? "bg-primary-fill text-on-primary" : "text-muted hover:text-fg",
              )}
            >
              <input
                type="radio"
                name={name}
                value={String(o.value)}
                checked={checked}
                onChange={() => onChange(o.value)}
                className="sr-only"
              />
              {o.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
