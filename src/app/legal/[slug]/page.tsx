import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { GrievanceRedressal, legalDocs } from "@/content/legal";
import { PageHeader } from "@/components/ui/PageHeader";
import { PlaceholderBadge } from "@/components/ui/Badge";

export const dynamicParams = false;

export function generateStaticParams() {
  return legalDocs.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const found = legalDocs.find((d) => d.slug === slug);
  if (!found) return {};
  return buildMetadata({ title: found.title, description: found.description, path: `/legal/${found.slug}` });
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = legalDocs.find((d) => d.slug === slug);
  if (!doc) notFound();
  return (
    <>
      <PageHeader eyebrow="Legal" title={doc.title} intro={doc.description} crumbs={[{ name: doc.title, path: `/legal/${doc.slug}` }]}>
        <p className="mt-6 flex flex-wrap items-center gap-3 rounded-card-sm border border-accent/40 bg-accent/10 p-4 text-sm">
          <PlaceholderBadge>Placeholder text</PlaceholderBadge>
          To be reviewed by a qualified professional before launch.
        </p>
      </PageHeader>
      <div className="container-content pb-20">
        <div className="prose-editorial text-lg">
          {doc.body()}
          <GrievanceRedressal />
        </div>
      </div>
    </>
  );
}
