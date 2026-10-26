import type { MetadataRoute } from "next";
import { siteUrl } from "@config";
import { calculators } from "@/content/calculators";
import { insights } from "@/content/insights";
import { legalDocs } from "@/content/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  const staticPaths = ["", "/about", "/services", "/approach", "/calculators", "/mf-research", "/mutual-funds-explained", "/insights", "/news", "/contact", "/clients"];
  return [
    ...staticPaths.map((p) => ({ url: `${base}${p}`, lastModified: now, changeFrequency: "monthly" as const, priority: p === "" ? 1 : 0.7 })),
    ...calculators.map((c) => ({ url: `${base}/calculators/${c.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.6 })),
    ...insights.map((i) => ({ url: `${base}/insights/${i.slug}`, lastModified: new Date(i.date), changeFrequency: "yearly" as const, priority: 0.5 })),
    ...legalDocs.map((d) => ({ url: `${base}/legal/${d.slug}`, lastModified: now, changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
