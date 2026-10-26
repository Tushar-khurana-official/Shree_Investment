import { site, whatsappHref } from "@config";
import { ButtonLink } from "@/components/ui/Button";

export function CtaBand({ title = "Start a conversation" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-heading" className="bg-primary text-on-primary">
      <div className="container-content grid gap-10 py-16 grid-cols-1 md:grid-cols-12 md:py-24">
        <div className="md:col-span-7">
          <p className="eyebrow !text-on-primary/80">Talk to us</p>
          <h2 id="cta-heading" className="mt-4 text-4xl md:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-lg text-on-primary/90">
            The first conversation is free and names no products. We listen, ask questions, and tell you honestly whether we can help.
          </p>
          <ButtonLink href="/contact" variant="accent" size="lg" className="mt-8">
            Book a call
          </ButtonLink>
        </div>
        <ul className="space-y-5 md:col-span-5 md:self-end">
          <li>
            <span className="eyebrow block !text-on-primary/80">Phone</span>
            <a href={`tel:${site.contact.phoneHref}`} className="font-display text-2xl underline-offset-4 hover:underline">
              {site.contact.phone}
            </a>
          </li>
          <li>
            <span className="eyebrow block !text-on-primary/80">WhatsApp</span>
            <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="font-display text-2xl underline-offset-4 hover:underline">
              Message us<span className="sr-only"> on WhatsApp (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <span className="eyebrow block !text-on-primary/80">Email</span>
            <a href={`mailto:${site.contact.email}`} className="break-all font-display text-2xl underline-offset-4 hover:underline">
              {site.contact.email}
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
