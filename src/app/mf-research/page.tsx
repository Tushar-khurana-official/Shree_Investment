import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getFundData } from "@/lib/research";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { FundExplorer } from "@/components/research/FundExplorer";

export const revalidate = 21600;

export const metadata: Metadata = buildMetadata({
  title: "MF Research: search and filter mutual fund schemes",
  description: "Factual scheme data, filterable by category, fund house, riskometer level and return period. No ratings, no recommendations.",
  path: "/mf-research",
});

export default async function ResearchPage() {
  const data = await getFundData();
  return (
    <>
      <PageHeader
        eyebrow="Tools · MF Research"
        title={<>Scheme facts, <em className="italic text-primary">without</em> the sales pitch.</>}
        intro="Search and filter schemes by category, fund house, risk level and return period. This page shows factual data only; it does not rank, rate or recommend schemes."
        crumbs={[{ name: "MF Research", path: "/mf-research" }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="rounded-full border border-border px-3 py-1 tabular">Data as of {formatDate(data.asOf)}</span>
          {data.isSample && <PlaceholderBadge>Sample data</PlaceholderBadge>}
          <span className="text-muted">{data.source}</span>
        </div>
      </PageHeader>
      <div className="container-content pb-20">
        <p className="mb-6 rounded-card-sm border border-border bg-surface-2 p-4 text-sm">
          <strong>Past performance is not indicative of future returns.</strong> Mutual fund investments are subject to market risks, read all
          scheme related documents carefully. Choosing a scheme should start from your goal and time horizon, not from a returns table.
        </p>
        <FundExplorer funds={data.funds} />
      </div>
    </>
  );
}
