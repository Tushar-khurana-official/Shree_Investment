import { isPlaceholder, showTodos, site } from "@config";
import { ButtonLink } from "@/components/ui/Button";
import { Stat } from "@/components/ui/Stat";
import { TodoMarker, allSet } from "@/components/ui/ConfigText";
import { HeroVisual } from "./HeroVisual";

const HEADLINE: { word: string; accent?: boolean }[] = [
  { word: "A" },
  { word: "financial" },
  { word: "plan" },
  { word: "you" },
  { word: "can" },
  { word: "actually", accent: true },
  { word: "keep." },
];

/** Delay (ms) for each element after the headline: the subheadline starts as the last words land, then 120ms apart. */
const AFTER_HEADLINE = 380;
const fadeDelay = (step: number) => ({ ["--d" as string]: `${AFTER_HEADLINE + step * 120}ms` });

export function Hero() {
  const r = site.registration;
  const city = isPlaceholder(site.firm.city) ? null : site.firm.city;
  const registrationSet = allSet(r.arn, r.euin);
  const families = site.stats.items.find((s) => /famil/i.test(s.label));
  const statsVerified = site.stats.verified;
  const visibleStats = statsVerified || showTodos ? site.stats.items : [];

  return (
    <section data-hero aria-labelledby="hero-heading" className="container-content pb-16 pt-10 md:pb-24 md:pt-16">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="hero-in inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
            AMFI-registered mutual fund distributor{city ? ` · ${city}` : ""}
          </p>
          <h1 id="hero-heading" className="mt-6 text-[2.75rem] leading-[1.04] sm:text-6xl lg:text-[4.75rem]">
            {HEADLINE.map((w, i) => (
              <span key={w.word}>
                <span className="hero-word-mask">
                  <span className="hero-word" style={{ ["--i" as string]: i }}>
                    {w.accent ? <em className="accent-shift italic">{w.word}</em> : w.word}
                  </span>
                </span>
                {i < HEADLINE.length - 1 ? " " : ""}
              </span>
            ))}
          </h1>
          <p className="hero-fade-text mt-6 max-w-xl text-lg text-muted md:text-xl" style={fadeDelay(0)}>
            We help Indian families plan for retirement, education and the big purchases in between, with a written plan, mutual
            funds chosen for a reason, and reviews that change something.
          </p>
          <div className="hero-fade mt-8 flex flex-wrap gap-3" style={fadeDelay(1)}>
            <ButtonLink href="/contact?source=home" variant="primary" size="lg">
              Start planning
            </ButtonLink>
            <ButtonLink href="/approach" variant="secondary" size="lg">
              See how it works
            </ButtonLink>
          </div>
          <p className="hero-fade mt-4 text-sm font-medium text-fg" style={fadeDelay(1)}>
            No fee from you. The AMC pays a trail commission, disclosed on every plan.
          </p>
          <p className="hero-fade mt-5 text-sm text-muted" style={fadeDelay(2)}>
            {registrationSet ? (
              <>
                AMFI {r.arn} · EUIN {r.euin} ·{" "}
              </>
            ) : showTodos ? (
              <>
                <TodoMarker>set ARN and EUIN in site.config.ts</TodoMarker>{" "}
              </>
            ) : null}
            Mutual fund distributor, not an investment adviser
          </p>
          {statsVerified && families && city ? (
            <p className="hero-fade mt-3 text-sm font-medium text-primary" style={fadeDelay(3)}>
              Trusted by {families.prefix ?? ""}
              {families.value.toLocaleString("en-IN")}
              {families.suffix ?? ""} families in {city}
            </p>
          ) : showTodos ? (
            <p className="hero-fade mt-3 text-sm" style={fadeDelay(3)}>
              <TodoMarker>trust line appears once stats are verified and the city is set</TodoMarker>
            </p>
          ) : null}
        </div>
        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      {(visibleStats.length > 0 || registrationSet || showTodos) && (
        <dl className="mt-16 grid grid-cols-2 gap-y-8 border-t border-border pt-10 md:grid-cols-4">
          {visibleStats.map((s) => (
            <Stat key={s.label} {...s} footnote={statsVerified ? undefined : "*"} />
          ))}
          {registrationSet ? (
            <Stat label="AMFI ARN" text={r.arn} />
          ) : showTodos ? (
            <Stat label="AMFI ARN" text="TODO" />
          ) : null}
        </dl>
      )}
      {!statsVerified && showTodos && (
        <p className="mt-6 text-xs text-muted">
          <TodoMarker>verify these figures, then set stats.verified = true</TodoMarker> * Placeholder figures. They are hidden
          in production until verified.
        </p>
      )}
    </section>
  );
}
