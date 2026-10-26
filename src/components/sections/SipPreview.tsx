"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { sipFutureValue } from "@/lib/calculators";
import { formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { ArrowIcon } from "@/components/ui/Button";
import { CalculatorDisclaimer } from "@/components/calculators/Disclaimer";
import { LiveSummary } from "@/components/calculators/LiveSummary";

const HORIZONS = [5, 10, 15, 20].map((y) => ({ value: y, label: `${y} yrs` }));
const ASSUMED_RATE = 12;

/** Compact SIP preview. Uses the same formula as the full SIP calculator. */
export function SipPreview() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const value = useMemo(() => sipFutureValue(monthly, ASSUMED_RATE, years), [monthly, years]);
  const invested = monthly * 12 * years;
  const growth = value - invested;
  const investedShare = Math.round(Math.max(4, Math.min(100, (invested / value) * 100)) * 100) / 100;

  return (
    <div className="grid gap-8 rounded-card border border-border bg-surface p-6 md:grid-cols-2 md:p-10">
      <div className="space-y-8">
        <Slider label="Monthly SIP" unit="currency" value={monthly} onChange={setMonthly} min={2500} max={25000} step={500} />
        <SegmentedControl label="Horizon" options={HORIZONS} value={years} onChange={setYears} />
        <p className="text-sm text-muted">Assumes {ASSUMED_RATE}% a year, compounded monthly, invested at the start of each month.</p>
      </div>
      <div>
        <LiveSummary text={`Projected value ${formatINRCompact(value)}, amount invested ${formatINRCompact(invested)}, potential growth ${formatINRCompact(growth)}.`} />
        <dl className="space-y-5">
          <div className="flex flex-col">
            <dt className="eyebrow order-1">Projected value</dt>
            <dd className="order-2 mt-1 font-display text-5xl text-primary tabular transition-all">{formatINRCompact(value)}</dd>
          </div>
        </dl>
        <div aria-hidden="true" className="mt-5 flex h-3 overflow-hidden rounded-full bg-primary/25">
            <div className="h-full bg-mocha transition-[width] duration-500 ease-out" style={{ width: `${investedShare}%` }} />
            <div className="h-full flex-1 bg-[repeating-linear-gradient(135deg,var(--primary)_0_6px,transparent_6px_10px)]" />
        </div>
        <dl className="mt-5 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <dt className="order-1 flex items-center gap-2 text-sm text-muted">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-mocha" /> Amount invested (solid)
              </dt>
              <dd className="order-2 font-display text-2xl tabular">{formatINRCompact(invested)}</dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-1 flex items-center gap-2 text-sm text-muted">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-sm bg-[repeating-linear-gradient(135deg,var(--primary)_0_2px,transparent_2px_4px)] ring-1 ring-primary" /> Potential growth (striped)
              </dt>
              <dd className="order-2 font-display text-2xl tabular">{formatINRCompact(growth)}</dd>
            </div>
        </dl>
        <p className="mt-2 text-xs text-muted tabular">
          {formatINR(monthly)} a month for {years} years
        </p>
        <Link href="/calculators/sip" className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
          Open full calculator <ArrowIcon />
        </Link>
        <CalculatorDisclaimer className="mt-6" />
      </div>
    </div>
  );
}
