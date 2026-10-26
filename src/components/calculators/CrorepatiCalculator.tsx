"use client";

import { useMemo, useState } from "react";
import { calculateCrorepati } from "@/lib/calculators";
import { formatDuration, formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

const describe = (months: number | null) => (months === null ? "Not within 60 years" : months === 0 ? "Already reached" : formatDuration(months));

export function CrorepatiCalculator() {
  const [savings, setSavings] = useState(500000);
  const [sip, setSip] = useState(20000);
  const [rate, setRate] = useState(12);
  const [target, setTarget] = useState(10000000);
  const r = useMemo(() => calculateCrorepati({ currentSavings: savings, monthlySip: sip, annualReturnPct: rate, target }), [savings, sip, rate, target]);
  const thisYear = new Date().getFullYear();
  const reachYear = r.monthsToTarget === null ? null : thisYear + Math.ceil(r.monthsToTarget / 12);
  const summary = `Target ${formatINRCompact(target)} with current savings of ${formatINR(savings)} and a monthly SIP of ${formatINR(sip)} at an assumed ${rate}%: ${r.monthsToTarget === null ? "not reached within 60 years" : `reached in about ${describe(r.monthsToTarget)} (around ${reachYear})`}.`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="Current savings" unit="currency" value={savings} onChange={setSavings} min={0} max={10000000} step={50000} inputMax={1000000000} hint="Money already invested towards this goal." />
          <Slider label="Monthly SIP" unit="currency" value={sip} onChange={setSip} min={500} max={200000} step={500} />
          <Slider label="Expected annual return" unit="percent" value={rate} onChange={setRate} min={1} max={20} step={0.5} />
          <Slider label="Target" unit="currency" value={target} onChange={setTarget} min={1000000} max={100000000} step={500000} hint="Defaults to ₹1 crore." />
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label={`Year you reach ${formatINRCompact(target)}`} value={reachYear ?? "Not within 60 years"} note={r.monthsToTarget === null ? "Try a higher SIP or a longer horizon." : `in about ${describe(r.monthsToTarget)}`} />
          <ResultItem label="Total invested by then" value={r.invested === null ? "–" : formatINRCompact(r.invested)} note={r.invested === null ? undefined : formatINR(r.invested)} />
          <ResultItem label="Estimated growth by then" value={r.invested === null ? "–" : formatINRCompact(Math.max(0, target - r.invested))} note="approximately, at the month the target is reached" />
        </ResultGrid>
      }
      comparison={
        <ReturnComparison
          metricLabel="Time to reach the target"
          activeRate={rate}
          onSelect={setRate}
          compute={(x) => describe(calculateCrorepati({ currentSavings: savings, monthlySip: sip, annualReturnPct: x, target }).monthsToTarget)}
        />
      }
      chart={
        <ChartWrapper
          title={`Path to ${formatINRCompact(target)}`}
          summary={r.monthsToTarget === null ? "The target is not reached within 60 years at these inputs." : `The illustrative portfolio crosses ${formatINRCompact(target)} in about ${describe(r.monthsToTarget)}.`}
          rowHeader={{ key: "year", label: "Year", format: (v) => `${thisYear + v}` }}
          columns={[
            { key: "invested", label: "Amount invested", format: formatINR },
            { key: "value", label: "Portfolio value", format: formatINR },
          ]}
          rows={r.schedule}
        >
          <LineChart
            data={r.schedule}
            xKey="year"
            xLabel={(x) => `${thisYear + x}`}
            series={[
              { key: "value", label: "Portfolio value", color: "var(--primary)", area: true },
              { key: "invested", label: "Amount invested", color: "var(--mocha)", dashed: true },
            ]}
          />
        </ChartWrapper>
      }
      cta={<BookReviewButton calculator="crorepati" summary={summary} />}
    />
  );
}
