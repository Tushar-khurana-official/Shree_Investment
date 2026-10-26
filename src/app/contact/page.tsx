import type { Metadata } from "next";
import { formattedAddress, site, whatsappHref } from "@config";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = buildMetadata({
  title: "Contact us: request a call back",
  description: `Talk to ${site.firm.name}. The first conversation is free and names no products. Call, WhatsApp, email or request a call back.`,
  path: "/contact",
});

export default function ContactPage() {
  const c = site.contact;
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={<>Start a <em className="italic text-primary">conversation</em>.</>}
        intro="Tell us a little about what you are planning for. We will call you back within one working day to set up a first conversation: free, about 45 minutes, with no products named."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />
      <div className="container-content grid gap-10 pb-20 grid-cols-1 lg:grid-cols-12">
        <div className="rounded-card border border-border bg-surface p-6 md:p-10 lg:col-span-8">
          <ContactForm />
        </div>
        <aside aria-label="Other ways to reach us" className="space-y-8 lg:col-span-4">
          <dl className="space-y-6">
            <div>
              <dt className="eyebrow">Phone</dt>
              <dd className="mt-1 font-display text-2xl">
                <a href={`tel:${c.phoneHref}`} className="hover:text-primary hover:underline">{c.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">WhatsApp</dt>
              <dd className="mt-1 font-display text-2xl">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="hover:text-primary hover:underline">
                  Message us<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Email</dt>
              <dd className="mt-1 break-all font-display text-2xl">
                <a href={`mailto:${c.email}`} className="hover:text-primary hover:underline">{c.email}</a>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Office hours</dt>
              <dd className="mt-2">
                <ul className="space-y-1">
                  {c.hours.map((h) => (
                    <li key={h.days} className="flex justify-between gap-4 border-b border-border pb-1 text-sm">
                      <span>{h.days}</span>
                      <span className="text-muted">{h.time}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Office</dt>
              <dd className="mt-1">
                <address className="not-italic">{formattedAddress()}</address>
                <a href={c.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-medium text-primary underline">
                  Open in Google Maps<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </dd>
            </div>
          </dl>
          <p className="rounded-card-sm border border-border p-4 text-sm text-muted">
            No newsletter, no drip campaign. One call, and we both decide whether there is a fit.
          </p>
        </aside>
      </div>
    </>
  );
}
