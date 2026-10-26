import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site, siteUrl, arnInParens } from "@config";
import { buildMetadata } from "@/lib/seo";
import { articleLoaders, CATEGORY_LABELS, getInsight, insights, relatedInsights } from "@/content/insights";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { ShareBar } from "@/components/insights/ShareBar";
import { InsightCard } from "@/components/insights/InsightList";
import { PlaceholderBadge } from "@/components/ui/Badge";

export const dynamicParams = false;

export function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getInsight((await params).slug);
  if (!post) return {};
  return buildMetadata({ title: post.title, description: post.description, path: `/insights/${post.slug}`, type: "article" });
}

export default async function InsightPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();
  const { default: Body } = await articleLoaders[slug]();
  const url = `${siteUrl()}/insights/${slug}`;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Person", name: post.author },
          publisher: { "@id": `${siteUrl()}/#organization` },
          mainEntityOfPage: url,
        }}
      />
      <PageHeader
        eyebrow={CATEGORY_LABELS[post.category]}
        title={post.title}
        intro={post.description}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${slug}` },
        ]}
      >
        <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
          <span>{post.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{post.readMinutes} min read</span>
          <PlaceholderBadge>Sample article</PlaceholderBadge>
        </p>
      </PageHeader>
      <div className="container-content pb-16">
        <div className="border-y border-border py-4">
          <ShareBar url={url} title={post.title} />
        </div>
        <article className="prose-editorial mt-10 text-lg">
          <Body />
        </article>
        <aside aria-label="Disclaimer" className="mt-12 max-w-[68ch] rounded-card-sm border border-border bg-surface-2 p-5 text-sm">
          <strong>Disclaimer:</strong> This article is for general education only and is not investment, tax or legal advice, nor a
          recommendation of any scheme. {site.firm.name} is an AMFI-registered mutual fund distributor{arnInParens()}, not a
          SEBI-registered investment adviser. Mutual fund investments are subject to market risks, read all scheme related documents carefully.
          Past performance is not indicative of future returns.
        </aside>
        <section aria-labelledby="related-h" className="mt-16 border-t border-border pt-10">
          <h2 id="related-h" className="text-2xl">Related articles</h2>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2">
            {relatedInsights(slug).map((p) => (
              <li key={p.slug}><InsightCard post={p} /></li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
