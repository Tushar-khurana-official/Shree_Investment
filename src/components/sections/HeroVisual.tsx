import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import { Tilt } from "./Tilt";

const chips = [
  { label: "Stock Market", icon: "chart", className: "left-0 top-[14%] sm:-left-4" },
  { label: "Mutual Funds", icon: "sprout", className: "right-0 top-[42%] sm:-right-4" },
  { label: "Real Estate", icon: "building", className: "bottom-[10%] left-[6%]" },
] as const;

/**
 * Hero visual: the Shree Investments emblem in a golden sunburst (as on the visiting card), an orbit ring and the
 * three services as floating chips. CSS motion only (rays turn slowly, emblem breathes, chips bob); desktop adds a
 * cursor tilt. Reduced motion: everything still.
 */
export function HeroVisual() {
  return (
    <figure className="relative">
      <Tilt>
        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div aria-hidden="true" className="hero-rays absolute inset-[4%] rounded-full" />
          <div aria-hidden="true" className="absolute inset-[16%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--gold)_45%,transparent),transparent)]" />
          <div aria-hidden="true" className="orbit absolute inset-[8%] rounded-full border border-dashed border-gold/50" />
          <div className="breathe-html absolute inset-[22%] overflow-hidden rounded-[28%] border-2 border-gold/70 shadow-[0_30px_80px_-20px_color-mix(in_srgb,var(--gold)_55%,transparent)]">
            <Image
              src="/images/logo-emblem.webp"
              alt="Shree Investments emblem: a lotus in a golden triangle"
              fill
              priority
              sizes="(min-width: 1024px) 290px, 56vw"
              className="object-cover"
            />
          </div>
          {chips.map((c, i) => (
            <span
              key={c.label}
              aria-hidden="true"
              className={`float-bob absolute ${c.className} inline-flex items-center gap-2 rounded-full border border-gold/50 bg-surface/95 px-4 py-2.5 text-sm font-semibold text-fg shadow-xl`}
              style={{ animationDelay: `${2.5 + i * 1.2}s` }}
            >
              <span className="text-gold">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              {c.label}
            </span>
          ))}
        </div>
      </Tilt>
      <figcaption className="sr-only">Our three services: stock market, mutual funds and real estate.</figcaption>
    </figure>
  );
}
