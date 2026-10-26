import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@config";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PlaceholderBadge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { QuoteBlock } from "@/components/sections/QuoteBlock";
import { CtaBand } from "@/components/sections/CtaBand";
import { whyUsDetail } from "@/content/process";

export const metadata: Metadata = buildMetadata({
  title: `About ${site.founder.name} and ${site.firm.name}`,
  description: `Meet ${site.founder.name}, ${site.founder.title} at ${site.firm.name}: qualifications, AMFI registration (${site.registration.arn}) and the approach behind the practice.`,
  path: "/about",
});

export default function AboutPage() {
  const f = site.founder;
  const r = site.registration;
  return (
    <>
      <PageHeader
        eyebrow="About"
        title={<>A practice built to be <em className="italic text-primary">unhurried</em>.</>}
        intro={site.firm.description}
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <Section id="founder" eyebrow="The founder" number="01">
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Image src={f.photo} alt={f.photoAlt} width={800} height={800} priority unoptimized className="h-auto w-full rounded-card border border-border" />
          </div>
          <div className="lg:col-span-7">
            <h2 className="text-4xl md:text-5xl">{f.name}</h2>
            <p className="mt-2 text-lg text-muted">{f.title}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Qualifications">
              {[...f.qualifications, f.degree].map((q) => (
                <li key={q.short} className="rounded-full border border-border px-3 py-1 text-sm">
                  {q.short}
                </li>
              ))}
              <li className="rounded-full border border-border px-3 py-1 text-sm tabular">{f.yearsExperience}+ years of experience</li>
            </ul>
            <div className="mt-8 space-y-4 text-lg">
              <PlaceholderBadge>Placeholder bio</PlaceholderBadge>
              {f.bio.map((p) => (
                <p key={p}>{p.replace(/^TODO \(placeholder bio\): /, "")}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12">
          <QuoteBlock />
        </div>
      </Section>

      <Section id="credentials" eyebrow="Credentials" number="02" title="Registration and certifications">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-card border border-border bg-surface p-7">
            <h3 className="text-xl">AMFI registration</h3>
            <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 tabular">
              <dt className="text-muted">ARN</dt>
              <dd className="font-medium">{r.arn}</dd>
              <dt className="text-muted">EUIN</dt>
              <dd className="font-medium">{r.euin}</dd>
              <dt className="text-muted">Registered on</dt>
              <dd>{r.amfiRegistrationDate}</dd>
              <dt className="text-muted">Valid till</dt>
              <dd>{r.validTill}</dd>
            </dl>
            <p className="mt-5 text-sm text-muted">
              You can verify any distributor&apos;s ARN on the{" "}
              <a href={site.links.amfiDistributorSearch} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                AMFI website<span className="sr-only"> (opens in a new tab)</span>
              </a>
              . EUIN (Employee Unique Identification Number) identifies the individual who advises you on a transaction.
            </p>
          </div>
          <div className="rounded-card border border-border bg-surface p-7">
            <h3 className="text-xl">Certifications</h3>
            <ul className="mt-5 space-y-3">
              {f.qualifications.map((q) => (
                <li key={q.short} className="flex gap-3">
                  <span aria-hidden="true" className="text-primary">✓</span>
                  {q.full}
                </li>
              ))}
              <li className="flex gap-3">
                <span aria-hidden="true" className="text-primary">✓</span>
                {f.degree.full}
              </li>
              {r.insurance && (
                <li className="flex gap-3">
                  <span aria-hidden="true" className="text-primary">✓</span>
                  {r.insurance.label}: {r.insurance.number} (valid till {r.insurance.validTill})
                </li>
              )}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="values" eyebrow="Values and approach" number="03" title={<>What you can <em className="italic text-primary">hold us to</em>.</>}>
        <ol className="grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-2">
          {whyUsDetail.map((v, i) => (
            <li key={v.title} className="bg-surface p-7">
              <span className="text-sm text-primary tabular" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-xl">{v.title}</h3>
              <p className="mt-2 text-muted">{v.body}</p>
            </li>
          ))}
        </ol>
        <ButtonLink href="/approach" variant="secondary" className="mt-8">
          See how we work
        </ButtonLink>
      </Section>
      <CtaBand />
    </>
  );
}
