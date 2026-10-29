import Link from "next/link";
import { Fragment } from "react";
import { formattedAddress, showTodos, site } from "@config";
import { ConfigText, allSet } from "@/components/ui/ConfigText";
import { calculators } from "@/content/calculators";
import { legalLinks } from "@/content/navigation";
import { FNO_RISK_NOTE } from "@/content/services";
import { Logo } from "./Logo";
import { CookieSettingsButton } from "./CookieSettingsButton";

const columns = [
  {
    title: "Firm",
    links: [
      { label: "About", href: "/about" },
      { label: "How we work", href: "/approach" },
      { label: "Services", href: "/services" },
      { label: "Existing clients", href: "/clients" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Tools",
    links: [...calculators.slice(0, 5).map((c) => ({ label: c.navLabel, href: `/calculators/${c.slug}` })), { label: "MF Research", href: "/mf-research" }],
  },
  {
    title: "Resources",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "News", href: "/news" },
      { label: "Mutual Funds Explained", href: "/mutual-funds-explained" },
    ],
  },
];

export function Footer() {
  const r = site.registration;
  // Placeholder values show a TODO marker in development and are hidden in production builds.
  const registration = [
    { label: "AMFI ARN", value: r.arn, todo: "ARN" },
    { label: "EUIN", value: r.euin, todo: "EUIN" },
    { label: "Registered on", value: r.amfiRegistrationDate, todo: "AMFI registration date" },
    { label: "Validity", value: r.validTill, todo: "ARN validity date", prefix: allSet(r.validTill) ? "Valid till " : "" },
  ].filter((row) => showTodos || allSet(row.value));
  return (
    <footer className="border-t border-border bg-surface pb-20 text-sm md:pb-0">
      <div className="container-content py-14">
        <div className="grid gap-10 grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-muted">{site.firm.description}</p>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 tabular">
              {registration.map((row) => (
                <Fragment key={row.label}>
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="font-medium">
                    {row.prefix}
                    <ConfigText value={row.value} label={row.todo} />
                  </dd>
                </Fragment>
              ))}
            </dl>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={`Footer: ${col.title}`} className="lg:col-span-2">
              <h2 className="eyebrow">{col.title}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-primary hover:underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="lg:col-span-2">
            <h2 className="eyebrow">Contact</h2>
            <address className="mt-4 space-y-2.5 not-italic">
              <p>
                <a href={`tel:${site.contact.phoneHref}`} className="hover:text-primary hover:underline">
                  {site.contact.phone}
                </a>
                <br />
                <a href={`tel:${site.contact.phoneAltHref}`} className="hover:text-primary hover:underline">
                  {site.contact.phoneAlt}
                </a>
              </p>
              <p>
                <a href={`mailto:${site.contact.email}`} className="break-all hover:text-primary hover:underline">
                  {site.contact.email}
                </a>
              </p>
              <p className="text-muted">{formattedAddress()}</p>
              <p>
                <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                  View on Google Maps<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 grid gap-8 border-t border-border pt-8 lg:grid-cols-2">
          <section aria-labelledby="grievance-heading">
            <h2 id="grievance-heading" className="eyebrow">
              Grievance redressal
            </h2>
            <p className="mt-3 text-muted">
              Write to our grievance officer, {site.grievance.officerName}, at{" "}
              <a href={`mailto:${site.grievance.email}`} className="text-primary underline">
                {site.grievance.email}
              </a>{" "}
              or call {site.grievance.phone}. We respond within {site.grievance.responseDays} working days. If you are not satisfied,
              you can escalate to{" "}
              <a href={site.links.amfi} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                AMFI<span className="sr-only"> (opens in a new tab)</span>
              </a>
              ,{" "}
              <a href={site.links.sebiScores} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                SEBI SCORES<span className="sr-only"> (opens in a new tab)</span>
              </a>{" "}
              and, after that,{" "}
              <a href={site.links.smartOdr} target="_blank" rel="noopener noreferrer" className="text-primary underline">
                SMART ODR<span className="sr-only"> (opens in a new tab)</span>
              </a>
              .
            </p>
          </section>
          <section aria-labelledby="risk-heading">
            <h2 id="risk-heading" className="eyebrow">
              Important
            </h2>
            <p className="mt-3 text-muted">
              {site.firm.name} is an AMFI-registered mutual fund distributor{allSet(r.arn) ? ` (${r.arn})` : ""}, not a SEBI-registered investment adviser.
              We earn trail commission from fund houses on the regular plans we distribute; see our{" "}
              <Link href="/legal/commission-disclosure" className="text-primary underline">
                commission disclosure
              </Link>
              .{" "}
              <strong className="font-medium text-fg">
                Mutual fund investments are subject to market risks, read all scheme related documents carefully.
              </strong>{" "}
              Investments in the securities market are subject to market risks. {FNO_RISK_NOTE} Real estate is not regulated by SEBI;
              check RERA registration before investing. Past performance is not indicative of future returns. Calculator results are
              illustrations based on assumed returns.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.firm.name}.
            {allSet(r.arn, r.euin, r.validTill) && ` ${r.arn} · EUIN ${r.euin} · Valid till ${r.validTill}`}
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {legalLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-primary hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="hover:text-primary hover:underline" />
              </li>
            </ul>
          </nav>
        </div>
        <ul className="mt-6 flex gap-4" aria-label="Social media">
          {site.social.map((s) => (
            <li key={s.name}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary">
                {s.name}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
