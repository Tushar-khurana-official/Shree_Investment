"use client";

import { Tween } from "@/components/ui/Tween";
import { useMemo, useState } from "react";
import { calculateGoal, requiredMonthlySip } from "@/lib/calculators";
import { formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

export function GoalCalculator() {
  const [target, setTarget] = useState(2500000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const r = useMemo(() => calculateGoal(target, rate, years), [target, rate, years]);
  const summary = `To reach ${formatINR(target)} in ${years} years at an assumed ${rate}% a year, the illustrative monthly SIP is ${formatINR(r.monthly)} (total invested ${formatINRCompact(r.invested)}).`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="Target amount" unit="currency" value={target} onChange={setTarget} min={100000} max={50000000} step={100000} inputMax={1000000000} hint="In today's rupees, or the future amount you need. For inflation-adjusted goals, try the retirement or education calculators." />
          <Slider label="Years to goal" unit="years" value={years} onChange={setYears} min={1} max={40} step={1} />
          <Slider label="Expected annual return" unit="percent" value={rate} onChange={setRate} min={1} max={20} step={0.5} />
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label="Monthly SIP needed" value={<Tween value={r.monthly} format={formatINR} />} note={`for ${years * 12} months`} />
          <ResultItem label="Total invested" value={<Tween value={r.invested} format={formatINRCompact} />} note={formatINR(r.invested)} />
          <ResultItem label="Estimated growth" value={<Tween value={r.growth} format={formatINRCompact} />} note={formatINR(r.growth)} />
        </ResultGrid>
      }
      comparison={<ReturnComparison metricLabel="Monthly SIP needed" activeRate={rate} onSelect={setRate} compute={(x) => formatINR(requiredMonthlySip(target, x, years))} />}
      chart={
        <ChartWrapper
          title="Path to the target"
          summary={`A monthly SIP of ${formatINR(r.monthly)} builds an illustrative ${formatINRCompact(target)} over ${years} years.`}
          rowHeader={{ key: "year", label: "Year", format: (v) => `Year ${v}` }}
          columns={[
            { key: "invested", label: "Amount invested", format: formatINR },
            { key: "value", label: "Portfolio value", format: formatINR },
          ]}
          rows={r.schedule}
        >
          <LineChart
            data={r.schedule}
            xKey="year"
            series={[
              { key: "value", label: "Portfolio value", color: "var(--primary)", area: true },
              { key: "invested", label: "Amount invested", color: "var(--mocha)", dashed: true },
            ]}
          />
        </ChartWrapper>
      }
      cta={<BookReviewButton calculator="goal" summary={summary} />}
    />
  );
}
