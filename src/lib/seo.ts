import type { Metadata } from "next";
import { formattedAddress, site, siteUrl } from "@config";

export function buildMetadata({
  title,
  description,
  path,
  type = "website",
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const url = `${siteUrl()}${path === "/" ? "" : path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.firm.name,
      locale: "en_IN",
      type,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex ? { index: false, follow: false } : undefined,
  };
}

/** Organization + FinancialService graph, rendered once in the root layout. */
export function organizationJsonLd() {
  const url = siteUrl();
  const a = site.contact.address;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name: site.firm.name,
        url,
        logo: `${url}${site.firm.logo}`,
        description: site.firm.description,
        email: site.contact.email,
        telephone: site.contact.phoneHref,
        sameAs: site.social.map((s) => s.url),
        founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.title },
      },
      {
        "@type": "FinancialService",
        "@id": `${url}/#financialservice`,
        name: site.firm.name,
        url,
        image: `${url}/opengraph-image`,
        description: `AMFI-registered mutual fund distributor (${site.registration.arn}). ${site.firm.tagline}.`,
        parentOrganization: { "@id": `${url}/#organization` },
        telephone: site.contact.phoneHref,
        email: site.contact.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: `${a.line1}, ${a.line2}`,
          addressLocality: a.city,
          addressRegion: a.state,
          postalCode: a.pincode,
          addressCountry: "IN",
        },
        hasMap: site.contact.mapsUrl,
        areaServed: { "@type": "Country", name: "India" },
        identifier: [
          { "@type": "PropertyValue", name: "AMFI ARN", value: site.registration.arn },
          { "@type": "PropertyValue", name: "EUIN", value: site.registration.euin },
        ],
        knowsAbout: ["Stock market investments", "IPO", "Mutual funds", "SIP", "Bonds", "Real estate advisory"],
        slogan: site.firm.tagline,
        disambiguatingDescription: `Mutual fund distributor, not a SEBI-registered investment adviser. Office: ${formattedAddress()}.`,
      },
    ],
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.q,
      acceptedAnswer: { "@type": "Answer", text: i.a },
    })),
  };
}

export function calculatorJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: `${siteUrl()}${path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any (web browser)",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    provider: { "@id": `${siteUrl()}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${siteUrl()}${it.path}`,
    })),
  };
}
