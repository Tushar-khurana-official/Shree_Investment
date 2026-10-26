import Image from "next/image";
import { uniqueFundHouses } from "@config";
import { Section } from "@/components/ui/Section";

/** Logo grid of empanelled AMCs. Duplicates are removed, so each fund house renders exactly once. */
export function FundHouses() {
  const houses = uniqueFundHouses();
  return (
    <Section
      id="fund-houses"
      eyebrow="Fund houses we work with"
      title={<>Your money goes to the <em className="italic text-primary">fund house</em>.</>}
      intro={<p>Your money is invested directly with the fund house. It never sits with us.</p>}
    >
      <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-3 lg:grid-cols-4" aria-label={`${houses.length} empanelled fund houses`}>
        {houses.map((h) => (
          <li key={h.name} className="flex min-h-24 items-center justify-center bg-surface p-5 text-center">
            {h.logo ? (
              <Image src={h.logo} alt={h.name} width={140} height={48} className="h-10 w-auto object-contain" />
            ) : (
              <span className="font-display text-base leading-tight">{h.name}</span>
            )}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-muted">
        Fund house names are shown for identification only. Listing does not imply a recommendation of any scheme.
      </p>
    </Section>
  );
}
