import { site } from "@config";
import { values } from "@/content/services";
import { Icon } from "@/components/ui/Icon";

/** The four values and the motto from the visiting card. */
export function ValuesBand() {
  return (
    <section aria-labelledby="values-heading" className="container-content py-6">
      <div className="relative overflow-hidden rounded-card border border-gold/40 bg-surface p-8 md:p-12">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--gold)_22%,transparent),transparent)]" />
        <h2 id="values-heading" className="eyebrow text-center">
          What we stand for
        </h2>
        <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.title} className={`flex gap-4 ${i > 0 ? "lg:border-l lg:border-gold/30 lg:pl-8" : ""}`}>
              <span className="text-gold">
                <Icon name={v.icon} className="h-10 w-10" />
              </span>
              <span>
                <span className="block font-display text-base font-bold uppercase tracking-wide">{v.title}</span>
                <span className="mt-1 block text-sm text-muted">{v.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex items-center justify-center gap-4" aria-hidden="false">
          <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-gold sm:block" />
          <p className="motto-banner font-ornament text-center text-xl uppercase tracking-[0.18em] text-gold md:text-3xl">
            {site.firm.motto}
          </p>
          <span aria-hidden="true" className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-gold sm:block" />
        </div>
      </div>
    </section>
  );
}
