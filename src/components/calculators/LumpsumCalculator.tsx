"use client";

import { Tween } from "@/components/ui/Tween";
import { useMemo, useState } from "react";
import { calculateLumpsum, lumpsumFutureValue } from "@/lib/calculators";
import { formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

export function LumpsumCalculator() {
  const [amount, setAmount] = useState(500000);
  const [years, setYears] = useState(10);
  const [rate, setRate] = useState(12);
  const r = useMemo(() => calculateLumpsum(amount, rate, years), [amount, rate, years]);
  const summary = `A one-time investment of ${formatINR(amount)} for ${years} years at an assumed ${rate}% a year: estimated value ${formatINRCompact(r.value)}, estimated growth ${formatINRCompact(r.growth)}.`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="One-time investment" unit="currency" value={amount} onChange={setAmount} min={10000} max={10000000} step={10000} inputMax={1000000000} />
          <Slider label="Time period" unit="years" value={years} onChange={setYears} min={1} max={40} step={1} />
          <Slider label="Expected annual return" unit="percent" value={rate} onChange={setRate} min={1} max={20} step={0.5} hint="Compounded once a year." />
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label="Estimated future value" value={<Tween value={r.value} format={formatINRCompact} />} note={formatINR(r.value)} />
          <ResultItem label="Amount invested" value={<Tween value={amount} format={formatINRCompact} />} note={formatINR(amount)} />
          <ResultItem label="Estimated growth" value={<Tween value={r.growth} format={formatINRCompact} />} note={formatINR(r.growth)} />
        </ResultGrid>
      }
      comparison={
        <ReturnComparison metricLabel="Estimated future value" activeRate={rate} onSelect={setRate} compute={(x) => formatINRCompact(lumpsumFutureValue(amount, x, years))} />
      }
      chart={
        <ChartWrapper
          title="Value of a one-time investment over time"
          summary={`${formatINRCompact(amount)} grows to an illustrative ${formatINRCompact(r.value)} over ${years} years at ${rate}% a year.`}
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
      cta={<BookReviewButton calculator="lumpsum" summary={summary} />}
    />
  );
}
