import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { palette as t } from "@/styles/tokens";

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

// [foreground, background, minimum ratio, where it is used]
const pairs: [string, string, number, string][] = [
  [t["on-primary"], t.primary, 4.5, "primary button (Emerald, white text)"],
  [t["on-primary"], t["primary-hover"], 4.5, "primary button hover"],
  [t["on-accent"], t["accent-strong"], 4.5, "accent CTA (accent-strong, white text)"],
  [t["on-accent"], t["accent-strong-hover"], 4.5, "accent CTA hover"],
  [t.primary, t.surface, 4.5, "secondary button (Emerald outline on Surface)"],
  [t.primary, t["primary-soft"], 4.5, "secondary button hover, chips"],
  [t.text, t.bg, 4.5, "text on Ivory"],
  [t.text, t.surface, 4.5, "text on cards"],
  [t["text-muted"], t.bg, 4.5, "muted text on Ivory"],
  [t["text-muted"], t.surface, 4.5, "muted text on cards"],
  [t["text-muted"], t["surface-2"], 4.5, "muted text on table headers"],
  [t.primary, t.bg, 4.5, "links and eyebrows on Ivory"],
  [t.risk, t.surface, 4.5, "risk labels and errors on cards"],
  [t.risk, t.bg, 4.5, "risk labels and errors on Ivory"],
  [t["accent-strong"], t.surface, 4.5, "accent on small text (on Surface only)"],
  [t.accent, t.bg, 3, "Vermilion display words (large text only)"],
  [t.accent, t.surface, 3, "Vermilion display words on cards (large text only)"],
  [t.mocha, t.surface, 3, "invested-amount chart series (non-text)"],
  [t.primary, t.surface, 3, "portfolio-value chart series (non-text)"],
];

describe("WCAG AA contrast (light mode)", () => {
  it.each(pairs)("%s on %s ≥ %s (%s)", (fg, bg, min) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
  });
});

describe("design decisions", () => {
  it("white on Vermilion #E84A27 fails AA, which is why buttons use accent-strong", () => {
    expect(contrast("#FFFFFF", t.accent)).toBeLessThan(4.5);
    expect(contrast("#FFFFFF", t["accent-strong"])).toBeGreaterThan(5);
  });

  it("accent-strong small text is 4.49:1 on Ivory, a hair under AA, so small accent text sits on Surface", () => {
    expect(contrast(t["accent-strong"], t.bg)).toBeLessThan(4.5);
  });

  it("tokens.css mirrors tokens.ts and has no dark theme", () => {
    const css = readFileSync(path.join(__dirname, "../../src/styles/tokens.css"), "utf8");
    for (const [k, v] of Object.entries(t)) expect(css).toContain(`--${k}: ${v};`);
    expect(css).toContain("color-scheme: light;");
    expect(css).not.toMatch(/\.dark|prefers-color-scheme/);
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
