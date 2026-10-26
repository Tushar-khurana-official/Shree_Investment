"use client";

import { useMemo, useState } from "react";
import { calculateSwp } from "@/lib/calculators";
import { formatDuration, formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { Checkbox } from "@/components/ui/Input";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

export function SwpCalculator() {
  const [corpus, setCorpus] = useState(10000000);
  const [withdrawal, setWithdrawal] = useState(70000);
  const [rate, setRate] = useState(8);
  const [capOn, setCapOn] = useState(false);
  const [cap, setCap] = useState(30);
  const maxYears = capOn ? cap : 100;
  const r = useMemo(() => calculateSwp({ corpus, monthlyWithdrawal: withdrawal, annualReturnPct: rate, maxYears }), [corpus, withdrawal, rate, maxYears]);

  const lastsText = r.outlastsDuration ? `More than ${formatDuration(maxYears * 12)}` : formatDuration(r.monthsLasted);
  const lastsFor = (x: number) => {
    const s = calculateSwp({ corpus, monthlyWithdrawal: withdrawal, annualReturnPct: x, maxYears });
    return s.outlastsDuration ? `${maxYears}+ yrs` : formatDuration(s.monthsLasted);
  };
  const summary = `Withdrawal plan: corpus ${formatINR(corpus)}, monthly withdrawal ${formatINR(withdrawal)}, assumed return ${rate}%${capOn ? `, over at most ${cap} years` : ""}. The corpus lasts ${lastsText.toLowerCase()}, with an ending balance of ${formatINRCompact(r.endingBalance)} after ${formatINRCompact(r.totalWithdrawn)} withdrawn.`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="Corpus" unit="currency" value={corpus} onChange={setCorpus} min={500000} max={100000000} step={500000} inputMax={1000000000} />
          <Slider label="Monthly withdrawal" unit="currency" value={withdrawal} onChange={setWithdrawal} min={5000} max={1000000} step={5000} />
          <Slider label="Expected annual return" unit="percent" value={rate} onChange={setRate} min={1} max={15} step={0.5} hint="Withdrawal portfolios usually hold more debt, so a lower return is prudent." />
          <Checkbox id="swp-cap" checked={capOn} onChange={(e) => setCapOn(e.target.checked)} label="Set a maximum duration" />
          {capOn && <Slider label="Maximum duration" unit="years" value={cap} onChange={setCap} min={1} max={50} step={1} />}
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label="The corpus lasts" value={lastsText} note={r.outlastsDuration ? "Monthly growth covers the withdrawal at this assumed return." : `${r.monthsLasted} monthly withdrawals`} />
          <ResultItem label="Ending balance" value={formatINRCompact(r.endingBalance)} note={formatINR(r.endingBalance)} />
          <ResultItem label="Total withdrawn" value={formatINRCompact(r.totalWithdrawn)} note={formatINR(r.totalWithdrawn)} />
        </ResultGrid>
      }
      comparison={<ReturnComparison metricLabel="How long the corpus lasts" activeRate={rate} onSelect={setRate} compute={lastsFor} />}
      chart={
        <ChartWrapper
          title="Corpus balance over time"
          summary={r.outlastsDuration ? `The balance is ${formatINRCompact(r.endingBalance)} at the end of ${maxYears} years.` : `The balance reaches zero after ${formatDuration(r.monthsLasted)}.`}
          rowHeader={{ key: "year", label: "Year", format: (v) => `Year ${v}` }}
          columns={[
            { key: "balance", label: "Balance", format: formatINR },
            { key: "withdrawn", label: "Total withdrawn", format: formatINR },
          ]}
          rows={r.schedule}
        >
          <LineChart
            data={r.schedule}
            xKey="year"
            series={[
              { key: "balance", label: "Balance", color: "var(--primary)", area: true },
              { key: "withdrawn", label: "Total withdrawn", color: "var(--mocha)", dashed: true },
            ]}
          />
        </ChartWrapper>
      }
      notes={<p>Each month the balance earns a month of the assumed return, then the withdrawal is taken. Tax on redemptions and exit loads are not modelled.</p>}
      cta={<BookReviewButton calculator="swp" summary={summary} />}
    />
  );
}
