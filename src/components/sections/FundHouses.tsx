import Image from "next/image";
import { uniqueFundHouses, type FundHouse } from "@config";
import { Section } from "@/components/ui/Section";

function FundHouseTile({ house }: { house: FundHouse }) {
  return (
    <span className="flex h-16 min-w-44 items-center justify-center whitespace-nowrap rounded-card-sm border border-border bg-bg px-5 text-center">
      {house.logo ? (
        <Image src={house.logo} alt={house.name} width={140} height={48} className="h-9 w-auto object-contain" />
      ) : (
        <span className="font-display text-base leading-tight">{house.name}</span>
      )}
    </span>
  );
}

/** Empanelled AMCs as a slow marquee. Duplicates are removed from config, so each fund house is announced once. */
export function FundHouses() {
  const houses = uniqueFundHouses();
  return (
    <Section
      id="fund-houses"
      eyebrow="Fund houses we work with"
      title={<>Your money goes to the <em>fund house</em>.</>}
      intro={<p>Your money is invested directly with the fund house. It never sits with us.</p>}
    >
      {/*
        Marquee: the list is rendered once for assistive tech; the second copy exists only to make the loop
        seamless and is aria-hidden. Pauses on hover and keyboard focus; static and wrapped with reduced motion.
      */}
      <div
        className="marquee rounded-card border border-border bg-surface py-6"
        tabIndex={0}
        role="region"
        aria-label={`${houses.length} empanelled fund houses (scrolling list; pauses on focus)`}
      >
        <div className="marquee-track">
          <ul className="flex shrink-0 items-center gap-4 px-2">
            {houses.map((h) => (
              <li key={h.name}>
                <FundHouseTile house={h} />
              </li>
            ))}
          </ul>
          <ul className="marquee-dup flex shrink-0 items-center gap-4 px-2" aria-hidden="true">
            {houses.map((h) => (
              <li key={h.name}>
                <FundHouseTile house={h} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-4 text-sm text-muted">
        Fund house names are shown for identification only. Listing does not imply a recommendation of any scheme.
      </p>
    </Section>
  );
}
