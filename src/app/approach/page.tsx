import type { Metadata } from "next";
import Link from "next/link";
import { site, arnInParens } from "@config";
import { buildMetadata } from "@/lib/seo";
import { processSteps, whyUsDetail } from "@/content/process";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { DistributorNotice } from "@/components/sections/DistributorNotice";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "How we work: a four-step planning process",
  description:
    "Understand your goals, build a written strategy, invest and monitor, then review and refine every six months. How we work, and how we are paid as a mutual fund distributor.",
  path: "/approach",
});

export default function ApproachPage() {
  return (
    <>
      <PageHeader
        eyebrow="How we work"
        title={<>Four steps. Most of the value is in the <em className="italic text-primary">fourth</em>.</>}
        intro="A clear process, with a timeline for each step, so you always know what happens next and when."
        crumbs={[{ name: "How we work", path: "/approach" }]}
      />

      <section aria-label="The four steps" className="container-content pb-8">
        <ol className="border-t border-border">
          {processSteps.map((s) => (
            <li key={s.number} id={`step-${s.number}`} className="grid gap-6 border-b border-border py-12 grid-cols-1 md:grid-cols-12">
              <div className="md:col-span-4">
                <span className="font-display text-6xl text-primary tabular" aria-hidden="true">
                  {s.number}
                </span>
                <h2 className="mt-4 text-3xl">
                  <span className="sr-only">Step {s.number}: </span>
                  {s.title}
                </h2>
                <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 1.5" strokeLinecap="round" />
                  </svg>
                  Timeline: {s.timeline}
                </p>
              </div>
              <div className="space-y-4 text-lg md:col-span-8">
                <p className="font-display text-2xl">{s.summary}</p>
                <ul className="space-y-3 text-muted">
                  {s.detail.map((d) => (
                    <li key={d} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <Section id="distributor" eyebrow="Distributor, not adviser" title="How we are paid, plainly">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 text-lg">
            <p>
              {site.firm.name} is a registered <strong>mutual fund distributor</strong>{arnInParens()}. We are{" "}
              <strong>not a SEBI-registered investment adviser</strong> (RIA). The difference matters: an RIA charges you a fee for advice
              and may not earn commission; a distributor is paid by the fund house.
            </p>
            <p>
              We are paid a <strong>trail commission</strong> by the AMC (asset management company, or fund house), a small annual
              percentage of the value you hold in the regular plan of a scheme, built into that scheme&apos;s expense ratio. The rate for
              each scheme we recommend is <strong>disclosed to you before you invest</strong>.
            </p>
            <p>
              You pay <strong>no direct fee</strong> for distribution. Regular plans have a higher expense ratio than direct plans
              because they include this commission; direct plans are available if you prefer to invest without a distributor.
            </p>
            <p>
              <Link href="/legal/commission-disclosure" className="font-medium text-primary underline">
                Read the full commission disclosure
              </Link>
            </p>
          </div>
          <DistributorNotice compact />
        </div>
      </Section>

      <Section id="why-us" eyebrow="Why us" title={<>Four promises you can <em className="italic text-primary">check</em>.</>}>
        <ol className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2">
          {whyUsDetail.map((v, i) => (
            <li key={v.title} className="bg-surface p-8">
              <span className="font-display text-3xl text-primary tabular" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl">{v.title}</h3>
              <p className="mt-2 text-muted">{v.body}</p>
            </li>
          ))}
        </ol>
      </Section>
      <CtaBand />
    </>
  );
}
