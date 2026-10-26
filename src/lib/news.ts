import local from "@/content/news.json";

export type NewsItem = { id: string; date: string; category: string; source: string; headline: string; summary: string; url: string | null };
export type NewsFeed = { isSample: boolean; items: NewsItem[] };

/** News from NEWS_FEED_URL (same JSON shape), falling back to the local file. Most recent first. */
export async function getNews(): Promise<NewsFeed> {
  let feed = local as NewsFeed;
  const url = process.env.NEWS_FEED_URL;
  if (url) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });
      if (res.ok) feed = (await res.json()) as NewsFeed;
    } catch (err) {
      console.error("[news] feed failed, using local data", err);
    }
  }
  return { ...feed, items: [...feed.items].sort((a, b) => b.date.localeCompare(a.date)) };
}
