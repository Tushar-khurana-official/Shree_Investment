import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { calculators } from "@/content/calculators";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowIcon } from "@/components/ui/Button";
import { CalculatorDisclaimer } from "@/components/calculators/Disclaimer";

export const metadata: Metadata = buildMetadata({
  title: "Financial calculators: SIP, retirement, education and more",
  description: "Free SIP, lumpsum, goal, retirement, child education, crorepati and SWP calculators with Indian rupee formatting. Illustrations at assumed returns.",
  path: "/calculators",
});

export default function CalculatorsHub() {
  return (
    <>
      <PageHeader
        eyebrow="Tools"
        title={<>Calculators that show their <em>working</em>.</>}
        intro="Each calculator shows results at 10%, 12% and 14% side by side, a chart with a data table, and the formula it uses."
        crumbs={[{ name: "Calculators", path: "/calculators" }]}
      />
      <div className="container-content pb-20">
        <ol className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {calculators.map((c, i) => (
            <li key={c.slug} className="bg-surface">
              <Link href={`/calculators/${c.slug}`} className="group flex h-full flex-col p-7 hover:bg-surface-2">
                <span className="text-sm text-primary tabular" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-2xl">{c.name}</h2>
                <p className="mt-2 flex-1 text-muted">{c.question}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-medium text-primary group-hover:underline">
                  Open <ArrowIcon />
                </span>
              </Link>
            </li>
          ))}
          <li className="bg-surface">
            <Link href="/mf-research" className="group flex h-full flex-col p-7 hover:bg-surface-2">
              <span className="text-sm text-primary tabular" aria-hidden="true">08</span>
              <h2 className="mt-3 text-2xl">MF Research</h2>
              <p className="mt-2 flex-1 text-muted">Search and filter schemes by category, fund house and risk level.</p>
              <span className="mt-6 inline-flex items-center gap-2 font-medium text-primary group-hover:underline">Open <ArrowIcon /></span>
            </Link>
          </li>
        </ol>
        <CalculatorDisclaimer className="mt-8" />
      </div>
    </>
  );
}
