import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { palette } from "@/styles/tokens";

function luminance(hex: string) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a: string, b: string) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// [foreground, background, minimum ratio, description]
const pairs = (t: (typeof palette)["light"] | (typeof palette)["dark"]): [string, string, number, string][] => [
  [t["on-primary"], t.primary, 4.5, "primary button"],
  [t["on-primary"], t["primary-hover"], 4.5, "primary button hover"],
  [t["on-accent"], t.accent, 4.5, "accent button"],
  [t["on-accent"], t["accent-hover"], 4.5, "accent button hover"],
  [t.fg, t.bg, 4.5, "body text"],
  [t.fg, t.surface, 4.5, "text on cards"],
  [t.muted, t.bg, 4.5, "muted text"],
  [t.muted, t.surface, 4.5, "muted text on cards"],
  [t.muted, t["surface-2"], 4.5, "muted text on subtle surface"],
  [t.primary, t.bg, 4.5, "links / secondary-button hover"],
  [t.primary, t.surface, 4.5, "links on cards"],
  [t.danger, t.surface, 4.5, "error text"],
  [t.accent, t.bg, 3, "accent display word (large text only)"],
  [t.mocha, t.surface, 3, "chart series (non-text)"],
];

describe.each(["light", "dark"] as const)("WCAG AA contrast, %s mode", (mode) => {
  it.each(pairs(palette[mode]))("%s on %s ≥ %s (%s)", (fg, bg, min) => {
    expect(contrast(fg, bg)).toBeGreaterThanOrEqual(min);
  });
});

describe("design decisions", () => {
  it("white text on Vermilion fails AA, which is why accent buttons use dark text", () => {
    expect(contrast("#FFFFFF", palette.light.accent)).toBeLessThan(4.5);
  });
  it("tokens.css mirrors tokens.ts", () => {
    const css = readFileSync(path.join(__dirname, "../../src/styles/tokens.css"), "utf8");
    const [lightBlock, darkBlock] = css.split(".dark");
    for (const [k, v] of Object.entries(palette.light)) expect(lightBlock).toContain(`--${k}: ${v};`);
    for (const [k, v] of Object.entries(palette.dark)) expect(darkBlock).toContain(`--${k}: ${v};`);
  });
});
