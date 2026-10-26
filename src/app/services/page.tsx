import type { Metadata } from "next";
import { site } from "@config";
import { buildMetadata } from "@/lib/seo";
import { services, INSURANCE_STATEMENT } from "@/content/services";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Services: mutual funds, insurance, fixed deposits and bonds",
  description: `Mutual fund distribution, protection-first insurance and fixed-income services from ${site.firm.name}, an AMFI-registered distributor (${site.registration.arn}).`,
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>What we do, and <em className="italic text-primary">what we don&apos;t</em>.</>}
        intro="Three service areas, each with a clear job in your plan. We do not sell products that do not have one."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
              {s.number} {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {services.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24">
          <div className="container-content border-t border-border py-16 md:py-24">
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <Eyebrow number={s.number}>{s.title}</Eyebrow>
                <h2 id={`${s.id}-heading`} className="mt-4 text-3xl md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-muted">{s.intro}</p>
                {s.id === "insurance" && (
                  <div className="mt-6 rounded-card-sm border-l-4 border-primary bg-surface p-5">
                    <p className="font-display text-xl">{INSURANCE_STATEMENT}</p>
                    <p className="mt-2 text-sm text-muted">
                      Insurance is distributed under a separate IRDAI registration
                      {site.registration.insurance
                        ? ` (${site.registration.insurance.label}: ${site.registration.insurance.number}, with ${site.registration.insurance.insurer})`
                        : ""}
                      , not under our AMFI registration. We recommend pure protection, term life and health cover, and we do not
                      recommend insurance policies as a way to save or invest.
                    </p>
                  </div>
                )}
              </div>
              <div className="lg:col-span-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="eyebrow">What this covers</h3>
                  <Badge tone="primary">{s.items.length} services</Badge>
                </div>
                <ol className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">
                  {s.items.map((item, i) => (
                    <li key={item.title} className="bg-surface p-6">
                      <span className="text-sm text-primary tabular" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h4 className="mt-2 font-display text-lg">{item.title}</h4>
                      <p className="mt-1 text-sm text-muted">{item.description}</p>
                    </li>
                  ))}
                </ol>
                <ButtonLink href={`/contact?source=services`} variant="primary" className="mt-8">
                  Talk to us about this
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      ))}

      <section aria-labelledby="not-sure-heading" className="container-content pb-20">
        <div className="grid items-center gap-6 rounded-card border border-border bg-surface p-8 grid-cols-1 md:grid-cols-12 md:p-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Not sure which of these you need?</p>
            <h2 id="not-sure-heading" className="mt-3 text-3xl md:text-4xl">
              Bring the question, <em className="italic text-primary">not a product</em>.
            </h2>
          </div>
          <div className="md:col-span-4 md:text-right">
            <ButtonLink href="/contact?goal=not-sure&source=services" variant="accent" size="lg">
              Book a call
            </ButtonLink>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
