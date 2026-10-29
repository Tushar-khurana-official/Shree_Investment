import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getNews } from "@/lib/news";
import { formatDate } from "@/lib/format";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge, PlaceholderBadge } from "@/components/ui/Badge";

export const revalidate = 3600;

export const metadata: Metadata = buildMetadata({
  title: "Mutual fund industry news: launches, NFOs and regulation",
  description: "Short, factual summaries of fund launches, NFO announcements and regulatory changes in the Indian mutual fund industry.",
  path: "/news",
});

export default async function NewsPage() {
  const feed = await getNews();
  return (
    <>
      <PageHeader
        eyebrow="News"
        title={<>What changed, <em>briefly</em>.</>}
        intro="Fund launches, NFO (new fund offer) announcements and regulation, summarised in a line. Facts only; none of it is a recommendation."
        crumbs={[{ name: "News", path: "/news" }]}
      >
        {feed.isSample && (
          <p className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted">
            <PlaceholderBadge>Sample items</PlaceholderBadge>
            These entries show the layout only. Connect a news feed (NEWS_FEED_URL) or edit src/content/news.json before launch.
          </p>
        )}
      </PageHeader>
      <div className="container-content pb-20">
        <ol className="border-t border-border">
          {feed.items.map((n) => (
            <li key={n.id} className="grid gap-3 border-b border-border py-8 grid-cols-1 md:grid-cols-12">
              <div className="text-sm text-muted md:col-span-3">
                <time dateTime={n.date} className="block tabular">{formatDate(n.date)}</time>
                <span className="block">Source: {n.source}</span>
              </div>
              <article className="md:col-span-9">
                <Badge tone="outline">{n.category}</Badge>
                <h2 className="mt-3 text-2xl">
                  {n.url ? (
                    <a href={n.url} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                      {n.headline}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  ) : (
                    n.headline
                  )}
                </h2>
                <p className="mt-2 text-muted">{n.summary}</p>
                <p className="mt-3 text-sm font-medium">Not a recommendation.</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
