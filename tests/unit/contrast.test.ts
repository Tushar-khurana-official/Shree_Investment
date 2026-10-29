import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { darkPalette, palette } from "@/styles/tokens";

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

type Palette = Record<keyof typeof palette, string>;
const t: Palette = palette;

// [foreground, background, minimum ratio, where it is used]
const pairs = (t: Palette): [string, string, number, string][] => [
  [t["on-primary"], t["primary-fill"], 4.5, "primary button / panels (white text)"],
  [t["on-primary"], t["primary-fill-hover"], 4.5, "primary button hover"],
  [t["on-accent"], t["accent-strong"], 4.5, "accent CTA (white text)"],
  [t["on-accent"], t["accent-strong-hover"], 4.5, "accent CTA hover"],
  [t.primary, t.surface, 4.5, "secondary button / links on cards"],
  [t.primary, t["primary-soft"], 4.5, "secondary button hover, chips"],
  [t.primary, t.bg, 4.5, "links and eyebrows on the page background"],
  [t.text, t.bg, 4.5, "body text"],
  [t.text, t.surface, 4.5, "text on cards"],
  [t["text-muted"], t.bg, 4.5, "muted text"],
  [t["text-muted"], t.surface, 4.5, "muted text on cards"],
  [t["text-muted"], t["surface-2"], 4.5, "muted text on table headers"],
  [t.risk, t.surface, 4.5, "risk labels and errors on cards"],
  [t.risk, t.bg, 4.5, "risk labels and errors on the page background"],
  [t.accent, t.bg, 3, "accent display words (large text only)"],
  [t.accent, t.surface, 3, "accent display words on cards (large text only)"],
  [t.mocha, t.surface, 3, "invested-amount chart series (non-text)"],
  [t.primary, t.surface, 3, "portfolio-value chart series (non-text)"],
  [t["hero-ink"], t["primary-fill"], 3, "hero illustration line on its panel (non-text)"],
  [t.gold, t.bg, 4.5, "gold eyebrows and labels"],
  [t.gold, t.surface, 4.5, "gold eyebrows on cards"],
  [t["brand-blue"], t.bg, 3, "'Smart' in the hero (large text)"],
  [t["brand-red"], t.bg, 3, "'Strong' in the hero (large text)"],
  [t["brand-green"], t.bg, 3, "'Secure' in the hero (large text)"],
  [t["on-accent"], t["accent-strong"], 7, "gold CTA with navy text (enhanced)"],
];

describe.each([
  ["light", palette],
  ["dark", darkPalette],
] as const)("WCAG AA contrast (%s mode)", (_mode, p) => {
  it.each(pairs(p))("%s on %s ≥ %s (%s)", (fg, bg, min) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
  });
});

describe("design decisions", () => {
  it("gold CTAs use navy text: white on gold would fail AA", () => {
    expect(contrast("#FFFFFF", darkPalette["accent-strong"])).toBeLessThan(4.5);
    expect(contrast(darkPalette["on-accent"], darkPalette["accent-strong"])).toBeGreaterThan(7);
  });

  it("accent-strong small text is 4.49:1 on Ivory, a hair under AA, so small accent text sits on Surface", () => {
    expect(contrast(t["accent-strong"], t.bg)).toBeLessThan(4.5);
  });

  it("tokens.css mirrors tokens.ts (navy default on :root, light on .light)", () => {
    const css = readFileSync(path.join(__dirname, "../../src/styles/tokens.css"), "utf8");
    const [darkBlock, lightBlock] = css.split(".light {");
    for (const [k, v] of Object.entries(palette)) expect(lightBlock).toContain(`--${k}: ${v};`);
    for (const [k, v] of Object.entries(darkPalette)) expect(darkBlock).toContain(`--${k}: ${v};`);
    expect(lightBlock).toContain("color-scheme: light;");
    expect(darkBlock).toContain("color-scheme: dark;");
  });

  it("components use tokens, not hard-coded hex colours", () => {
    const root = path.join(__dirname, "../../src");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (f.isDirectory()) walk(p);
        else if (/\.(tsx|ts)$/.test(f.name) && !p.includes(`${path.sep}styles${path.sep}`) && /#[0-9a-fA-F]{6}\b/.test(readFileSync(p, "utf8")))
          offenders.push(path.relative(root, p));
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});

describe("token references", () => {
  it("every var(--…) used in components exists in tokens.css (or is a known non-colour variable)", () => {
    const root = path.join(__dirname, "../../src");
    const css = readFileSync(path.join(root, "styles/tokens.css"), "utf8");
    const defined = new Set([...css.matchAll(/--([\w-]+):/g)].map((m) => m[1]));
    const allowed = /^(font-|tw-|d$|i$|fill$)/;
    const missing: string[] = [];
    const walk = (dir: string) => {
      for (const f of readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (f.isDirectory()) walk(p);
        else if (/\.(tsx|ts)$/.test(f.name))
          for (const m of readFileSync(p, "utf8").matchAll(/var\(--([\w-]+)/g))
            if (!defined.has(m[1]) && !allowed.test(m[1])) missing.push(`${path.relative(root, p)}: --${m[1]}`);
      }
    };
    walk(root);
    expect(missing).toEqual([]);
  });
});
