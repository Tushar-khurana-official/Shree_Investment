import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata, calculatorJsonLd } from "@/lib/seo";
import { calculators, getCalculator } from "@/content/calculators";
import { calculatorComponents } from "@/components/calculators/registry";
import { PageHeader } from "@/components/ui/PageHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { formulaNotes } from "@/content/formulas";

export const dynamicParams = false;

export function generateStaticParams() {
  return calculators.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCalculator(slug);
  if (!c) return {};
  return buildMetadata({ title: c.title, description: c.description, path: `/calculators/${c.slug}` });
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getCalculator(slug);
  if (!meta) notFound();
  const Calculator = calculatorComponents[meta.slug];
  const others = calculators.filter((c) => c.slug !== meta.slug);
  return (
    <>
      <JsonLd data={calculatorJsonLd({ name: meta.name, description: meta.description, path: `/calculators/${meta.slug}` })} />
      <PageHeader
        eyebrow="Calculator · Illustration only"
        title={meta.question}
        intro={meta.description}
        crumbs={[
          { name: "Calculators", path: "/calculators" },
          { name: meta.name, path: `/calculators/${meta.slug}` },
        ]}
      />
      <div className="container-content pb-16">
        <Calculator />
        <section aria-labelledby="formula-heading" className="mt-16 grid gap-6 border-t border-border pt-12 grid-cols-1 md:grid-cols-12">
          <h2 id="formula-heading" className="text-2xl md:col-span-4">How this is calculated</h2>
          <div className="space-y-3 text-muted md:col-span-8">
            {formulaNotes[meta.slug].map((n) => (
              <p key={n}>{n}</p>
            ))}
            <p>Past performance is not indicative of future returns. Actual returns vary, can be negative, and are not guaranteed.</p>
          </div>
        </section>
        <nav aria-label="Other calculators" className="mt-16 border-t border-border pt-10">
          <h2 className="eyebrow">Other calculators</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/calculators/${c.slug}`} className="inline-block rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
