import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { sortedInsights } from "@/content/insights";
import { PageHeader } from "@/components/ui/PageHeader";
import { InsightList } from "@/components/insights/InsightList";

export const metadata: Metadata = buildMetadata({
  title: "Insights: notes on allocation, behaviour, tax and goals",
  description: "Plain-language articles on asset allocation, investor behaviour, tax planning and goal-based investing for Indian families.",
  path: "/insights",
});

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title={<>Notes worth <em>keeping</em>.</>}
        intro="Occasional, unhurried writing on allocation, behaviour, tax and goals. No stock tips, no predictions."
        crumbs={[{ name: "Insights", path: "/insights" }]}
      />
      <div className="container-content pb-20">
        <InsightList posts={sortedInsights()} />
      </div>
    </>
  );
}
