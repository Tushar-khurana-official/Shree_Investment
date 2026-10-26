import { site } from "@config";
import { PlaceholderBadge } from "@/components/ui/Badge";

/** Founder quote. Labelled as a placeholder until site.founder.quoteVerified is true. */
export function QuoteBlock() {
  return (
    <figure className="rounded-card border border-border bg-surface p-8 md:p-12">
      {!site.founder.quoteVerified && (
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <PlaceholderBadge>Placeholder quote</PlaceholderBadge>
          <span className="text-xs text-muted">Replace with the distributor&apos;s own words before launch.</span>
        </div>
      )}
      <blockquote>
        <p className="font-display text-3xl italic leading-snug md:text-4xl">
          <span aria-hidden="true" className="text-primary">
            &ldquo;
          </span>
          {site.founder.quote}
          <span aria-hidden="true" className="text-primary">
            &rdquo;
          </span>
        </p>
      </blockquote>
      <figcaption className="mt-6 text-sm text-muted">
        {site.founder.name}, {site.founder.title}
      </figcaption>
    </figure>
  );
}
