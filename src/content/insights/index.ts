export type InsightCategory = "allocation" | "behaviour" | "tax" | "goals";

export type Insight = {
  slug: string;
  title: string;
  description: string;
  category: InsightCategory;
  date: string;
  readMinutes: number;
  author: string;
};

export const CATEGORY_LABELS: Record<InsightCategory, string> = {
  allocation: "Allocation",
  behaviour: "Behaviour",
  tax: "Tax",
  goals: "Goals",
};

/** TODO: dates and authorship are placeholders. Have each article reviewed before publishing. */
export const insights: Insight[] = [
  {
    slug: "asset-allocation-and-goals",
    title: "Role of asset allocation in achieving your financial goals",
    description: "Why the split between equity, debt and gold matters more than which scheme you pick, and how to tie it to each goal's date.",
    category: "allocation",
    date: "2026-09-18",
    readMinutes: 5,
    author: "[Founder Name]",
  },
  {
    slug: "volatility-and-behaviour",
    title: "Volatility in markets and your long-term investment behaviour",
    description: "Market falls are the price of equity returns. The costly mistakes are behavioural, and a written rule helps.",
    category: "behaviour",
    date: "2026-08-27",
    readMinutes: 4,
    author: "[Founder Name]",
  },
  {
    slug: "gold-and-silver-allocation",
    title: "Multi-asset allocation: the case for gold and silver exposure",
    description: "How precious metals behave differently from equity and debt, the ways to hold them, and why the case is diversification, not momentum.",
    category: "allocation",
    date: "2026-07-30",
    readMinutes: 5,
    author: "[Founder Name]",
  },
  {
    slug: "elss-without-the-march-panic",
    title: "ELSS without the March panic",
    description: "ELSS has the shortest 80C lock-in. Use it deliberately, through the year, as part of a long-term goal.",
    category: "tax",
    date: "2026-06-12",
    readMinutes: 4,
    author: "[Founder Name]",
  },
];

export function getInsight(slug: string) {
  return insights.find((i) => i.slug === slug);
}

export function sortedInsights() {
  return [...insights].sort((a, b) => b.date.localeCompare(a.date));
}

/** Same category first, then most recent. */
export function relatedInsights(slug: string, count = 2) {
  const current = getInsight(slug);
  return sortedInsights()
    .filter((i) => i.slug !== slug)
    .sort((a, b) => Number(b.category === current?.category) - Number(a.category === current?.category))
    .slice(0, count);
}

export const articleLoaders: Record<string, () => Promise<{ default: React.ComponentType }>> = {
  "asset-allocation-and-goals": () => import("./asset-allocation-and-goals.mdx"),
  "volatility-and-behaviour": () => import("./volatility-and-behaviour.mdx"),
  "gold-and-silver-allocation": () => import("./gold-and-silver-allocation.mdx"),
  "elss-without-the-march-panic": () => import("./elss-without-the-march-panic.mdx"),
};
