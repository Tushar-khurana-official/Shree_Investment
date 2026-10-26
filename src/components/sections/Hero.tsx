import Image from "next/image";
import { site } from "@config";
import { ButtonLink } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { PlaceholderBadge } from "@/components/ui/Badge";

export function Hero() {
  const unverified = !site.stats.verified;
  return (
    <section aria-labelledby="hero-heading" className="container-content pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid items-center gap-12 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">AMFI-registered mutual fund distributor · {site.firm.city}</p>
          <h1 id="hero-heading" className="mt-5 text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.75rem]">
            A financial plan you can <em className="italic text-accent">actually</em> keep.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted md:text-xl">
            We help Indian families plan for retirement, education and the big purchases in between, with a written plan, mutual
            funds chosen for a reason, and reviews that change something.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact?source=home" variant="primary" size="lg">
              Start planning
            </ButtonLink>
            <ButtonLink href="/approach" variant="secondary" size="lg">
              See how it works
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-muted">
            AMFI {site.registration.arn} · EUIN {site.registration.euin} · Mutual fund distributor, not an investment adviser
          </p>
        </div>
        <div className="lg:col-span-5">
          <Image
            src="/images/hero-illustration.svg"
            alt="Illustration: a rising line for portfolio value above a gentler dashed line for amount invested, over rolling hills"
            width={560}
            height={620}
            priority
            unoptimized
            className="h-auto w-full rounded-card"
          />
        </div>
      </div>

      <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-border pt-10 md:grid-cols-4">
        {site.stats.items.map((s) => (
          <Stat key={s.label} {...s} footnote={unverified ? "*" : undefined} />
        ))}
        <Stat label="AMFI ARN" text={site.registration.arn} />
      </dl>
      {unverified && (
        <p className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted">
          <PlaceholderBadge />* Figures are placeholders pending verification and must not be relied on.
        </p>
      )}
    </section>
  );
}
