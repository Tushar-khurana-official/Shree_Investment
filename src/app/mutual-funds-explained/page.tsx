import type { Metadata } from "next";
import { buildMetadata, faqJsonLd } from "@/lib/seo";
import { categoryTable, explainedFaq, explainedSections } from "@/content/explained";
import { PageHeader } from "@/components/ui/PageHeader";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Mutual funds explained, in plain language",
  description: "What a mutual fund is, SIP vs lumpsum, asset allocation, risk, direct vs regular plans, exit loads, tax basics, KYC and how to read a factsheet.",
  path: "/mutual-funds-explained",
});

export default function ExplainedPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(explainedFaq)} />
      <PageHeader
        eyebrow="Resources"
        title={<>Mutual funds, <em>explained</em>.</>}
        intro="Plain language, Indian context, no jargon left unexplained. Read it in order, or jump to what you need."
        crumbs={[{ name: "Mutual Funds Explained", path: "/mutual-funds-explained" }]}
      />
      <div className="container-content grid gap-12 pb-20 grid-cols-1 lg:grid-cols-12">
        <nav aria-label="Contents" className="lg:col-span-3">
          <div className="lg:sticky lg:top-24">
            <h2 className="eyebrow">Contents</h2>
            <ol className="mt-4 space-y-2 text-sm">
              {explainedSections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex gap-3 hover:text-primary">
                    <span className="text-muted tabular">{String(i + 1).padStart(2, "0")}</span>
                    {s.title}
                  </a>
                </li>
              ))}
              <li><a href="#categories" className="flex gap-3 hover:text-primary"><span className="text-muted tabular">10</span>Fund categories</a></li>
              <li><a href="#faq" className="flex gap-3 hover:text-primary"><span className="text-muted tabular">11</span>Common questions</a></li>
            </ol>
          </div>
        </nav>
        <div className="lg:col-span-9">
          {explainedSections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="border-t border-border py-10 first:border-t-0 first:pt-0">
              <p className="eyebrow tabular text-primary">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-h`} className="mt-2 text-3xl">{s.title}</h2>
              <div className="prose-editorial mt-4 text-lg">
                {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            </section>
          ))}
          <section id="categories" aria-labelledby="categories-h" className="border-t border-border py-10">
            <h2 id="categories-h" className="text-3xl">Fund categories at a glance</h2>
            <p className="mt-3 text-muted">Typical riskometer levels for each category. Each scheme&apos;s own riskometer is set individually and can differ; always check it.</p>
            <div className="relative mt-6 overflow-x-auto rounded-card border border-border bg-surface">
              <table className="w-full min-w-[680px] text-sm">
                <caption className="sr-only">Mutual fund categories with what they invest in, typical risk level and suggested horizon</caption>
                <thead className="bg-surface-2 text-left">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">Category</th>
                    <th scope="col" className="px-4 py-3 font-medium">Invests in</th>
                    <th scope="col" className="px-4 py-3 font-medium">Typical risk label</th>
                    <th scope="col" className="px-4 py-3 font-medium">Suits money needed in</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryTable.map((r) => (
                    <tr key={r.category} className="border-t border-border">
                      <th scope="row" className="px-4 py-3 text-left font-medium">{r.category}</th>
                      <td className="px-4 py-3 text-muted">{r.invests}</td>
                      <td className="px-4 py-3"><span className="rounded-full border border-border px-2.5 py-0.5">{r.typicalRisk}</span></td>
                      <td className="px-4 py-3">{r.horizon}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <section id="faq" aria-labelledby="faq-h" className="border-t border-border py-10">
            <h2 id="faq-h" className="mb-6 text-3xl">Common questions</h2>
            <Accordion items={explainedFaq.map((f) => ({ title: f.q, content: <p>{f.a}</p> }))} />
          </section>
          <p className="text-sm text-muted">This page is general education, not advice. Mutual fund investments are subject to market risks, read all scheme related documents carefully.</p>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
