"use client";

import { useMemo, useState } from "react";
import { calculateEducation } from "@/lib/calculators";
import { formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

export function EducationCalculator() {
  const [fee, setFee] = useState(2000000);
  const [years, setYears] = useState(15);
  const [inflation, setInflation] = useState(10);
  const [rate, setRate] = useState(12);
  const r = useMemo(() => calculateEducation(fee, years, inflation, rate), [fee, years, inflation, rate]);
  const summary = `Education plan: a course costing ${formatINR(fee)} today, enrolment in ${years} years, education inflation ${inflation}%, assumed return ${rate}%. Estimated fee at enrolment ${formatINRCompact(r.futureFee)}; monthly SIP needed ${formatINR(r.monthlySip)}.`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="Course fee today" unit="currency" value={fee} onChange={setFee} min={100000} max={10000000} step={50000} inputMax={100000000} hint="Total cost of the course at today's prices, including living costs if relevant." />
          <Slider label="Years until enrolment" unit="years" value={years} onChange={setYears} min={1} max={25} step={1} />
          <Slider label="Education inflation" unit="percent" value={inflation} onChange={setInflation} min={4} max={15} step={0.5} hint="Education costs in India have risen faster than general inflation, often near 10% a year." />
          <Slider label="Expected annual return" unit="percent" value={rate} onChange={setRate} min={1} max={20} step={0.5} />
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label="Estimated fee at enrolment" value={formatINRCompact(r.futureFee)} note={`${formatINR(r.futureFee)} in ${years} years`} />
          <ResultItem label="Monthly SIP needed" value={formatINR(r.monthlySip)} note={`for ${years * 12} months`} />
          <ResultItem label="Total invested" value={formatINRCompact(r.invested)} note={formatINR(r.invested)} />
        </ResultGrid>
      }
      comparison={<ReturnComparison metricLabel="Monthly SIP needed" activeRate={rate} onSelect={setRate} compute={(x) => formatINR(calculateEducation(fee, years, inflation, x).monthlySip)} />}
      chart={
        <ChartWrapper
          title="Saving towards the fee"
          summary={`A monthly SIP of ${formatINR(r.monthlySip)} builds an illustrative ${formatINRCompact(r.futureFee)} by the enrolment year.`}
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
      notes={<p>As the enrolment date nears, money for a fee due in two to three years is usually moved out of equity. A plan sets that switch-over date in advance.</p>}
      cta={<BookReviewButton calculator="education" summary={summary} />}
    />
  );
}
