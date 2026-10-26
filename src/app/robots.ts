import type { MetadataRoute } from "next";
import { site, siteUrl } from "@config";

export default function robots(): MetadataRoute.Robots {
  // Indexing stays off until site.launch.allowIndexing is set to true at launch.
  return {
    rules: site.launch.allowIndexing
      ? { userAgent: "*", allow: "/", disallow: ["/api/", "/contact/thank-you"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
