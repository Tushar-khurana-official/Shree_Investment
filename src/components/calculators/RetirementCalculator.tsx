"use client";

import { Tween } from "@/components/ui/Tween";
import { useMemo, useState } from "react";
import { calculateRetirement, type RetirementInput } from "@/lib/calculators";
import { formatINR, formatINRCompact } from "@/lib/format";
import { Slider } from "@/components/ui/Slider";
import { ChartWrapper } from "@/components/ui/ChartWrapper";
import { LineChart } from "@/components/ui/LineChart";
import { Checkbox } from "@/components/ui/Input";
import { CalculatorLayout } from "./CalculatorLayout";
import { ResultGrid, ResultItem } from "./Results";
import { ReturnComparison } from "./ReturnComparison";
import { BookReviewButton } from "./BookReviewButton";

export function RetirementCalculator() {
  const [input, setInput] = useState<RetirementInput>({
    monthlyExpenses: 50000,
    currentAge: 35,
    retirementAge: 60,
    lifeExpectancy: 85,
    inflationPct: 6,
    preReturnPct: 12,
    postReturnPct: 8,
    indexWithdrawals: false,
  });
  const set = <K extends keyof RetirementInput>(key: K) => (v: RetirementInput[K]) =>
    setInput((prev) => {
      const next = { ...prev, [key]: v };
      // Keep ages in order: current < retirement < life expectancy.
      if (next.retirementAge <= next.currentAge) next.retirementAge = Math.min(75, next.currentAge + 1);
      if (next.lifeExpectancy <= next.retirementAge) next.lifeExpectancy = Math.min(100, next.retirementAge + 1);
      return next;
    });

  const r = useMemo(() => calculateRetirement(input), [input]);
  const summary = `Retirement plan: current monthly expenses ${formatINR(input.monthlyExpenses)}, age ${input.currentAge}, retiring at ${input.retirementAge}, planning to age ${input.lifeExpectancy}, inflation ${input.inflationPct}%, assumed returns ${input.preReturnPct}% before and ${input.postReturnPct}% after retirement${input.indexWithdrawals ? ", withdrawals rising with inflation" : ""}. Monthly expenses at retirement about ${formatINR(r.monthlyExpenseAtRetirement)}; corpus required ${formatINRCompact(r.corpus)}; monthly SIP needed ${formatINR(r.monthlySip)}.`;

  return (
    <CalculatorLayout
      summary={summary}
      inputs={
        <>
          <Slider label="Current monthly expenses" unit="currency" value={input.monthlyExpenses} onChange={set("monthlyExpenses")} min={10000} max={500000} step={5000} inputMax={5000000} hint="Household spending you would want to keep in retirement, in today's rupees." />
          <Slider label="Current age" unit="age" value={input.currentAge} onChange={set("currentAge")} min={18} max={70} step={1} />
          <Slider label="Retirement age" unit="age" value={input.retirementAge} onChange={set("retirementAge")} min={40} max={75} step={1} />
          <Slider label="Plan until age (life expectancy)" unit="age" value={input.lifeExpectancy} onChange={set("lifeExpectancy")} min={60} max={100} step={1} hint="Planning to a later age is the safer assumption." />
          <Slider label="Inflation" unit="percent" value={input.inflationPct} onChange={set("inflationPct")} min={2} max={12} step={0.5} />
          <Slider label="Return before retirement" unit="percent" value={input.preReturnPct} onChange={set("preReturnPct")} min={4} max={18} step={0.5} />
          <Slider label="Return after retirement" unit="percent" value={input.postReturnPct} onChange={set("postReturnPct")} min={3} max={12} step={0.5} hint="Usually lower, as a retirement portfolio holds more debt." />
          <Checkbox
            id="index-withdrawals"
            checked={!!input.indexWithdrawals}
            onChange={(e) => setInput((p) => ({ ...p, indexWithdrawals: e.target.checked }))}
            label="Increase withdrawals with inflation after retirement (a more conservative, larger corpus)"
          />
        </>
      }
      results={
        <ResultGrid>
          <ResultItem emphasis label="Corpus required at retirement" value={<Tween value={r.corpus} format={formatINRCompact} />} note={`${formatINR(r.corpus)}, at age ${input.retirementAge}`} />
          <ResultItem label="Monthly SIP needed" value={<Tween value={r.monthlySip} format={formatINR} />} note={`for ${r.yearsToRetirement} years`} />
          <ResultItem label="Monthly expenses at retirement" value={<Tween value={r.monthlyExpenseAtRetirement} format={formatINR} />} note={`today's ${formatINR(input.monthlyExpenses)} after ${r.yearsToRetirement} years of ${input.inflationPct}% inflation`} />
        </ResultGrid>
      }
      comparison={
        <ReturnComparison
          metricLabel="Monthly SIP needed (return before retirement)"
          activeRate={input.preReturnPct}
          onSelect={set("preReturnPct")}
          compute={(x) => formatINR(calculateRetirement({ ...input, preReturnPct: x }).monthlySip)}
        />
      }
      chart={
        r.schedule.length > 1 ? (
          <ChartWrapper
            title="Building the retirement corpus"
            summary={`A monthly SIP of ${formatINR(r.monthlySip)} for ${r.yearsToRetirement} years builds an illustrative ${formatINRCompact(r.corpus)}.`}
            rowHeader={{ key: "year", label: "Age", format: (v) => `Age ${input.currentAge + v}` }}
            columns={[
              { key: "invested", label: "Amount invested", format: formatINR },
              { key: "value", label: "Portfolio value", format: formatINR },
            ]}
            rows={r.schedule}
          >
            <LineChart
              data={r.schedule}
              xKey="year"
              xLabel={(x) => `Age ${input.currentAge + x}`}
              series={[
                { key: "value", label: "Portfolio value", color: "var(--primary)", area: true },
                { key: "invested", label: "Amount invested", color: "var(--mocha)", dashed: true },
              ]}
            />
          </ChartWrapper>
        ) : null
      }
      notes={
        <p>
          How this works: today&apos;s expenses are inflated to the retirement year. The corpus is the present value, at the
          post-retirement return, of a monthly withdrawal of that amount for {r.retirementYears} years. The SIP is what builds that
          corpus at the pre-retirement return. Taxes, one-off expenses and a poor sequence of early returns are not modelled; a real
          plan accounts for them.
        </p>
      }
      cta={<BookReviewButton calculator="retirement" summary={summary} />}
    />
  );
}
