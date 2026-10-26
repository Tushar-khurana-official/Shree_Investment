import type { CSSProperties } from "react";
import { Tilt } from "./Tilt";

const hill = (mix: number): CSSProperties => ({ fill: `color-mix(in srgb, var(--primary-hover) ${mix}%, var(--text))` });

/**
 * Hero illustration. The growth line draws in, then the dashed benchmark; the vermilion sun breathes, the glass
 * card floats and the chip slides in (all CSS, see globals.css). On desktop with a fine pointer the visual tilts
 * up to 4° toward the cursor (Tilt, which loads Motion only there). Reduced motion: final states, no loops, no tilt.
 */
export function HeroVisual() {
  return (
    <figure className="relative">
      <Tilt>
          <svg
            viewBox="0 0 560 620"
            className="h-auto w-full rounded-card shadow-[0_30px_60px_-30px_color-mix(in_srgb,var(--primary)_55%,transparent)]"
            role="img"
            aria-label="Illustration: a rising line for portfolio value above a gentler dashed line for amount invested, over rolling hills"
          >
            <defs>
              <clipPath id="hero-benchmark-clip">
                <rect className="draw-clip" x="40" y="370" width="440" height="120" />
              </clipPath>
            </defs>
            <rect width="560" height="620" rx="28" style={{ fill: "var(--primary)" }} />
            <g className="breathe">
              <circle cx="404" cy="168" r="74" style={{ fill: "var(--accent)" }} />
            </g>
            <circle cx="404" cy="168" r="112" fill="none" style={{ stroke: "var(--bg)" }} strokeOpacity=".25" />
            <circle cx="404" cy="168" r="150" fill="none" style={{ stroke: "var(--bg)" }} strokeOpacity=".12" />
            <path d="M0 470c90-40 150-120 240-112s140 70 210 40 80-60 110-70v292H0z" style={hill(100)} />
            <path d="M0 520c110-30 170-90 270-70s150 60 290 10v160H0z" style={hill(78)} />
            <g style={{ stroke: "var(--bg)" }} strokeOpacity=".18">
              <path d="M60 120v380M140 120v380M220 120v380M300 120v380M380 120v380M460 120v380" />
              <path d="M40 200h480M40 280h480M40 360h480M40 440h480" />
            </g>
            <path
              d="M60 470 140 452 220 440 300 424 380 410 460 396"
              clipPath="url(#hero-benchmark-clip)"
              fill="none"
              style={{ stroke: "var(--border)" }}
              strokeWidth="3"
              strokeDasharray="10 9"
              strokeLinecap="round"
            />
            <path
              className="draw-line"
              pathLength={1}
              d="M60 430 140 400 220 404 300 330 380 300 460 214"
              fill="none"
              style={{ stroke: "var(--bg)" }}
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g style={{ fill: "var(--bg)" }}>
              {[
                [140, 400, 6, 500],
                [220, 404, 6, 760],
                [300, 330, 6, 1020],
                [380, 300, 6, 1280],
                [460, 214, 10, 1600],
              ].map(([cx, cy, r, d]) => (
                <circle key={cx} cx={cx} cy={cy} r={r} className="hero-fade" style={{ ["--d" as string]: `${d}ms` }} />
              ))}
            </g>
          </svg>

          <span
            className="chip-in absolute right-5 top-5 rounded-full border border-on-primary/30 bg-primary-hover px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-on-primary"
            aria-hidden="true"
          >
            Illustration
          </span>

          {/* Stacked glass card */}
          <div className="float-bob absolute -bottom-6 -left-3 w-[58%] max-w-64 sm:-left-8" aria-hidden="true">
            <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-card-sm border border-on-primary/25 bg-primary-soft/70" />
            <div className="relative rounded-card-sm border border-on-primary/40 bg-surface/95 p-4 shadow-xl">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary">Goal · Retirement</p>
              <p className="mt-1 flex items-center gap-1.5 font-display text-lg text-fg">
                <svg viewBox="0 0 16 16" className="h-4 w-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Reviewed every 6 months
              </p>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-primary-soft">
                <div className="h-full w-2/3 rounded-full bg-primary" />
              </div>
            </div>
          </div>
      </Tilt>
      <figcaption className="mt-10 text-right text-sm text-muted">Illustration only. Not a projection.</figcaption>
    </figure>
  );
}
