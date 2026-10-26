"use client";

import { useMemo, useState } from "react";
import { RISK_LEVELS, type Fund } from "@/lib/research";
import { formatIndianNumber } from "@/lib/format";
import { Input, Select } from "@/components/ui/Input";
import { RiskLabel } from "./RiskLabel";

type Period = "1y" | "3y" | "5y";
const PERIODS: { value: Period; label: string }[] = [
  { value: "1y", label: "1 year" },
  { value: "3y", label: "3 years (annualised)" },
  { value: "5y", label: "5 years (annualised)" },
];
const SORTS = [
  { value: "name", label: "Name (A to Z)" },
  { value: "return", label: "Return for selected period" },
  { value: "expense", label: "Expense ratio (low to high)" },
  { value: "aum", label: "Fund size (AUM)" },
];

const uniq = (xs: string[]) => [...new Set(xs)].sort();

export function FundExplorer({ funds }: { funds: Fund[] }) {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [amc, setAmc] = useState("");
  const [risk, setRisk] = useState("");
  const [period, setPeriod] = useState<Period>("3y");
  const [sort, setSort] = useState("name");

  const results = useMemo(() => {
    const list = funds.filter(
      (f) =>
        (!q || f.name.toLowerCase().includes(q.toLowerCase())) &&
        (!category || f.category === category) &&
        (!amc || f.amc === amc) &&
        (!risk || f.risk === risk),
    );
    const ret = (f: Fund) => f.returns[period] ?? -Infinity;
    return [...list].sort((a, b) =>
      sort === "return" ? ret(b) - ret(a) : sort === "expense" ? a.expenseRatio - b.expenseRatio : sort === "aum" ? b.aumCr - a.aumCr : a.name.localeCompare(b.name),
    );
  }, [funds, q, category, amc, risk, period, sort]);

  const reset = () => {
    setQ("");
    setCategory("");
    setAmc("");
    setRisk("");
  };

  const fmtRet = (v: number | null) => (v === null ? <span className="text-muted">Not available<span className="sr-only">, scheme too new</span></span> : `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v).toFixed(2)}%`);

  return (
    <div>
      <form role="search" aria-label="Filter schemes" onSubmit={(e) => e.preventDefault()} className="grid gap-4 rounded-card border border-border bg-surface p-5 md:grid-cols-3 lg:grid-cols-6">
        <div className="md:col-span-3 lg:col-span-2">
          <label htmlFor="fund-q" className="mb-1.5 block text-sm font-medium">Search by name</label>
          <Input id="fund-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. flexi cap" />
        </div>
        {[
          { id: "f-cat", label: "Category", value: category, set: setCategory, options: uniq(funds.map((f) => f.category)) },
          { id: "f-amc", label: "Fund house", value: amc, set: setAmc, options: uniq(funds.map((f) => f.amc)) },
          { id: "f-risk", label: "Risk level", value: risk, set: setRisk, options: RISK_LEVELS.filter((r) => funds.some((f) => f.risk === r)) },
        ].map((s) => (
          <div key={s.id}>
            <label htmlFor={s.id} className="mb-1.5 block text-sm font-medium">{s.label}</label>
            <Select id={s.id} value={s.value} onChange={(e) => s.set(e.target.value)} placeholder="All" options={s.options.map((o) => ({ value: o, label: o }))} />
          </div>
        ))}
        <div>
          <label htmlFor="f-period" className="mb-1.5 block text-sm font-medium">Return period</label>
          <Select id="f-period" value={period} onChange={(e) => setPeriod(e.target.value as Period)} options={PERIODS} />
        </div>
        <div className="flex flex-wrap items-end gap-4 md:col-span-3 lg:col-span-6">
          <div className="min-w-56">
            <label htmlFor="f-sort" className="mb-1.5 block text-sm font-medium">Sort by</label>
            <Select id="f-sort" value={sort} onChange={(e) => setSort(e.target.value)} options={SORTS} />
          </div>
          <button type="button" onClick={reset} className="h-12 rounded-full px-4 text-sm font-medium text-primary hover:underline">
            Clear filters
          </button>
          <p className="ml-auto text-sm text-muted" role="status" aria-live="polite">
            {results.length} {results.length === 1 ? "scheme" : "schemes"} shown
          </p>
        </div>
      </form>

      <div className="relative mt-6 overflow-x-auto rounded-card border border-border bg-surface">
        <table className="w-full min-w-[860px] text-sm tabular">
          <caption className="sr-only">Mutual fund schemes matching the filters. Return shown for {PERIODS.find((p) => p.value === period)?.label}.</caption>
          <thead className="bg-surface-2 text-left">
            <tr>
              <th scope="col" className="px-4 py-3 font-medium">Scheme</th>
              <th scope="col" className="px-4 py-3 font-medium">Category</th>
              <th scope="col" className="px-4 py-3 font-medium">Riskometer</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Return ({period})</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">Expense ratio</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">AUM (₹ Cr)</th>
              <th scope="col" className="px-4 py-3 text-right font-medium">NAV (₹)</th>
            </tr>
          </thead>
          <tbody>
            {results.map((f) => (
              <tr key={f.id} className="border-t border-border align-top">
                <th scope="row" className="px-4 py-3 text-left font-normal">
                  <span className="block font-medium">{f.name}</span>
                  <span className="block text-xs text-muted">{f.amc} · Benchmark: {f.benchmark} · Exit load: {f.exitLoad}</span>
                </th>
                <td className="px-4 py-3">{f.category}<span className="block text-xs text-muted">{f.assetClass}</span></td>
                <td className="px-4 py-3"><RiskLabel level={f.risk} /></td>
                <td className="px-4 py-3 text-right">{fmtRet(f.returns[period])}</td>
                <td className="px-4 py-3 text-right">{f.expenseRatio.toFixed(2)}%</td>
                <td className="px-4 py-3 text-right">{formatIndianNumber(f.aumCr)}</td>
                <td className="px-4 py-3 text-right">{f.nav.toFixed(2)}</td>
              </tr>
            ))}
            {results.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-muted">No schemes match these filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">Returns are for the regular plan, growth option, before tax. Periods over one year are annualised (CAGR). Sorting by return does not imply a recommendation.</p>
    </div>
  );
}
