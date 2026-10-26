"use client";

import { useEffect, useId, useState } from "react";
import { formatIndianNumber, parseAmount } from "@/lib/format";

export type SliderProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  /** "currency" shows ₹ and Indian grouping; "percent" a % suffix; "years" a "yrs" suffix. */
  unit?: "currency" | "percent" | "years" | "age" | "none";
  hint?: string;
  /** Allow typed values above the slider maximum (e.g. a larger target), clamped to this. */
  inputMax?: number;
};

const suffixFor = { currency: "", percent: "%", years: "yrs", age: "yrs", none: "" } as const;

/**
 * Range slider with a synced numeric input. Typing is free-form; the value is committed on blur / Enter
 * and clamped to [min, inputMax ?? max].
 */
export function Slider({ label, value, onChange, min, max, step, unit = "none", hint, inputMax }: SliderProps) {
  const id = useId();
  const upper = inputMax ?? max;
  const format = (v: number) => (unit === "currency" ? formatIndianNumber(v) : String(v));
  const [draft, setDraft] = useState(format(value));

  useEffect(() => setDraft(format(value)), [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const commit = () => {
    const parsed = parseAmount(draft);
    if (Number.isNaN(parsed)) {
      setDraft(format(value));
      return;
    }
    const clamped = Math.min(upper, Math.max(min, parsed));
    onChange(clamped);
    setDraft(format(clamped));
  };

  const fill = ((Math.min(value, max) - min) / (max - min)) * 100;
  const spokenValue =
    unit === "currency" ? `₹${formatIndianNumber(value)}` : unit === "percent" ? `${value}%` : unit === "years" || unit === "age" ? `${value} years` : String(value);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={`${id}-input`} className="text-sm font-medium">
          {label}
        </label>
        <div className="flex items-center rounded-full border border-border bg-surface px-3 py-1.5 focus-within:border-primary focus-within:outline-2 focus-within:outline-primary">
          {unit === "currency" && (
            <span className="text-muted" aria-hidden="true">
              ₹
            </span>
          )}
          <input
            id={`${id}-input`}
            inputMode="decimal"
            className="tabular w-24 bg-transparent text-right font-medium outline-none"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                commit();
              }
            }}
            aria-describedby={hint ? `${id}-hint` : undefined}
          />
          {suffixFor[unit] && (
            <span className="ml-1 text-sm text-muted" aria-hidden="true">
              {suffixFor[unit]}
            </span>
          )}
        </div>
      </div>
      <input
        type="range"
        className="range mt-3"
        min={min}
        max={max}
        step={step}
        value={Math.min(value, max)}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={`${label} slider`}
        aria-valuetext={spokenValue}
        style={{ ["--fill" as string]: `${fill}%` }}
      />
      <div className="mt-1 flex justify-between text-xs text-muted tabular" aria-hidden="true">
        <span>{unit === "currency" ? `₹${formatIndianNumber(min)}` : `${min}${suffixFor[unit] ? " " + suffixFor[unit] : ""}`}</span>
        <span>{unit === "currency" ? `₹${formatIndianNumber(max)}` : `${max}${suffixFor[unit] ? " " + suffixFor[unit] : ""}`}</span>
      </div>
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}
