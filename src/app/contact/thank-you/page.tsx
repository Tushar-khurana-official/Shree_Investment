import type { Metadata } from "next";
import { site, whatsappHref } from "@config";
import { buildMetadata } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Thank you: we will call you back",
  description: "Your request has been received. Here is what happens next.",
  path: "/contact/thank-you",
  noindex: true,
});

const steps = [
  { title: "We call you back", body: "Within one working day, from the number on this site, to find a time for the first conversation." },
  { title: "The first conversation", body: "About 45 minutes, in person or on a video call. We ask about income, obligations and goals. No product is named." },
  { title: "We both decide", body: "If there is a fit, we explain how we would work together and what we would earn. If not, we say so." },
];

export default function ThankYouPage() {
  return (
    <div className="container-content py-16 md:py-24">
      <p className="eyebrow">Request received</p>
      <h1 className="mt-4 max-w-3xl text-4xl md:text-6xl">
        Thank you. We will be in <em className="italic text-primary">touch</em>.
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted">
        Your request has reached {site.firm.name}. Nothing else is needed from you right now, and you will not be added to any mailing list.
      </p>
      <h2 className="mt-14 text-2xl">What happens next</h2>
      <ol className="mt-6 grid gap-px overflow-hidden rounded-card border border-border bg-border md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.title} className="bg-surface p-7">
            <span className="font-display text-3xl text-primary tabular" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-3 text-xl">{s.title}</h3>
            <p className="mt-2 text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-10 text-muted">
        In a hurry? Call{" "}
        <a href={`tel:${site.contact.phoneHref}`} className="text-primary underline">{site.contact.phone}</a> or{" "}
        <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="text-primary underline">
          message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
        .
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/mutual-funds-explained" variant="secondary">Read: Mutual funds explained</ButtonLink>
        <ButtonLink href="/" variant="ghost">Back to home</ButtonLink>
      </div>
    </div>
  );
}
