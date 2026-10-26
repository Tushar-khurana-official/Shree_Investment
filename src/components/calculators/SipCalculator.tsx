"use client";

import { Tween } from "@/components/ui/Tween";
import { useMemo, useState } from "react";
import { calculateSip, sipFutureValue } from "@/lib/calculators";
import { formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

export function SipCalculator({ initialMonthly = 10000, initialYears = 15, initialRate = 12 }) {
  const [monthly, setMonthly] = useState(initialMonthly);
  const [years, setYears] = useState(initialYears);
  const [rate, setRate] = useState(initialRate);
  const r = useMemo(() => calculateSip(monthly, rate, years), [monthly, rate, years]);

  const crossoverText =
    r.crossoverYear === null
      ? "Not at this assumed return."
      : r.crossoverYear <= years
        ? `Year ${r.crossoverYear}`
        : `Year ${r.crossoverYear} (beyond your ${years}-year horizon)`;

  const summary = `A monthly SIP of ${formatINR(monthly)} for ${years} years at an assumed ${rate}% a year: ${formatINR(r.invested)} invested, estimated value ${formatINRCompact(r.value)}, estimated growth ${formatINRCompact(r.growth)}. Returns overtake the amount invested in ${crossoverText.toLowerCase()}`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="Monthly investment" unit="currency" value={monthly} onChange={setMonthly} min={500} max={100000} step={500} />
          <Slider label="Time period" unit="years" value={years} onChange={setYears} min={1} max={40} step={1} />
          <Slider label="Expected annual return" unit="percent" value={rate} onChange={setRate} min={1} max={20} step={0.5} hint="An assumption, not a promise. Equity returns vary a lot year to year." />
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label="Estimated value" value={<Tween value={r.value} format={formatINRCompact} />} note={formatINR(r.value)} />
          <ResultItem label="Total invested" value={<Tween value={r.invested} format={formatINRCompact} />} note={formatINR(r.invested)} />
          <ResultItem label="Estimated growth" value={<Tween value={r.growth} format={formatINRCompact} />} note={formatINR(r.growth)} />
          <ResultItem
            className="sm:col-span-2"
            label="Returns overtake invested capital"
            value={crossoverText}
            note="The first year in which estimated growth is larger than the total you have put in."
          />
        </ResultGrid>
      }
      comparison={
        <ReturnComparison
          metricLabel="Estimated value"
          activeRate={rate}
          onSelect={setRate}
          compute={(x) => formatINRCompact(sipFutureValue(monthly, x, years))}
        />
      }
      chart={
        <ChartWrapper
          title="Portfolio value against amount invested"
          summary={`After ${years} years the illustrative portfolio value is ${formatINRCompact(r.value)} against ${formatINRCompact(r.invested)} invested.${r.crossoverYear && r.crossoverYear <= years ? ` Growth overtakes the amount invested in year ${r.crossoverYear}.` : ""}`}
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
            marker={r.crossoverYear && r.crossoverYear <= years ? { x: r.crossoverYear, label: `Returns overtake invested, year ${r.crossoverYear}` } : null}
          />
        </ChartWrapper>
      }
      cta={<BookReviewButton calculator="sip" summary={summary} />}
    />
  );
}
