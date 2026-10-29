import type { Metadata } from "next";
import { isPlaceholder, showTodos, site } from "@config";
import { buildMetadata } from "@/lib/seo";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/Icon";
import { TodoMarker } from "@/components/ui/ConfigText";
import { PageHeader } from "@/components/ui/PageHeader";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand } from "@/components/sections/CtaBand";

export const metadata: Metadata = buildMetadata({
  title: "Services: stock market, mutual funds and real estate advisory",
  description: `Stock market investments, mutual funds (SIP, lump sum, bonds) and real estate advisory in ${site.firm.city} from ${site.firm.name}.`,
  path: "/services",
});

/** The registration each service is offered under. Placeholders show TODO in development and are hidden in production. */
function RegistrationNote({ id }: { id: (typeof services)[number]["id"] }) {
  const r = site.registration;
  const text =
    id === "stock-market"
      ? !isPlaceholder(r.stockBroking.broker) && !isPlaceholder(r.stockBroking.apCode)
        ? `Offered as an Authorised Person of ${r.stockBroking.broker} (SEBI reg. ${r.stockBroking.brokerSebiReg}), AP code ${r.stockBroking.apCode}.`
        : null
      : id === "mutual-funds"
        ? !isPlaceholder(r.arn)
          ? `Offered as an AMFI-registered mutual fund distributor, ${r.arn}${isPlaceholder(r.euin) ? "" : `, EUIN ${r.euin}`}.`
          : null
        : !isPlaceholder(r.rera.number)
          ? `RERA Rajasthan agent registration ${r.rera.number}.`
          : null;
  if (text) return <p className="mt-3 text-sm text-muted">{text}</p>;
  return showTodos ? (
    <p className="mt-3 text-sm">
      <TodoMarker>
        {id === "stock-market" ? "broker and AP code" : id === "mutual-funds" ? "ARN and EUIN" : "RERA agent registration"} in site.config.ts
      </TodoMarker>
    </p>
  ) : null;
}

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title={<>Shares, funds and property, <em>under one roof</em>.</>}
        intro="Three service areas, each with a clear job in your plan, and an honest word on the risks of each."
        crumbs={[{ name: "Services", path: "/services" }]}
      >
        <nav aria-label="On this page" className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`} className="rounded-full border border-border px-4 py-2 text-sm hover:border-primary hover:text-primary">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHeader>

      {services.map((s) => (
        <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="scroll-mt-24">
          <div className="container-content border-t border-border py-16 md:py-24">
            <div className="grid gap-10 grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold text-gold">
                  <Icon name={s.icon} />
                </span>
                <Eyebrow number={s.number} className="mt-5">
                  {s.highlights.join(" · ")}
                </Eyebrow>
                <h2 id={`${s.id}-heading`} className="mt-4 text-3xl md:text-4xl">
                  {s.title}
                </h2>
                <p className="mt-4 text-muted">{s.intro}</p>
                <p className="mt-6 flex items-start gap-3 rounded-card-sm border-l-4 border-gold bg-surface p-5 text-sm">
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0 text-gold" fill="currentColor">
                    <path d="M8 1.5 15 14H1L8 1.5Zm-.75 4.5v4h1.5V6h-1.5Zm0 5v1.5h1.5V11h-1.5Z" />
                  </svg>
                  <span>
                    <strong className="font-semibold">Risk: </strong>
                    {s.riskNote}
                  </span>
                </p>
                <RegistrationNote id={s.id} />
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
              Bring the question, <em>not a product</em>.
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
