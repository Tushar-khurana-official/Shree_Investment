/**
 * Design tokens: Emerald & Warm Ivory. Light mode only.
 * tokens.css must mirror these values (a unit test checks this), and every text/background pair
 * used on the site is contrast-checked in tests/unit/contrast.test.ts.
 */
export const palette = {
  primary: "#0A6A4A", // Emerald: headers, primary buttons, portfolio-value chart line
  "primary-hover": "#084F38",
  "primary-soft": "#DCEFE6", // tinted chips, hover fills, highlight backgrounds
  "on-primary": "#FFFFFF",
  bg: "#F5EEDC", // Warm Ivory
  surface: "#FFFDF7", // cards, header, form panels
  "surface-2": "#EFE7D2", // neutral fills such as table headers
  accent: "#E84A27", // Vermilion: large display text and decorative highlights only
  "accent-strong": "#C2401F", // accent buttons (white text, 5.2:1) and any accent on small text
  "accent-strong-hover": "#A93619",
  "on-accent": "#FFFFFF",
  text: "#1B2420",
  "text-muted": "#5C6661",
  border: "#E3DCC8",
  mocha: "#7B4A2E", // amount-invested chart series, small icon accents
  risk: "#B3361B", // risk labels and error text, always with a text label or icon
} as const;

export type TokenName = keyof typeof palette;

export const typography = {
  display: "Fraunces", // H1, H2 and stat numbers, weight 500–600
  body: "Inter", // body and UI
  eyebrow: { size: "0.75rem", tracking: "0.12em", weight: 600, color: "primary" },
} as const;

export const radii = { card: "20px", cardSm: "16px", pill: "999px" } as const;
export const layout = { maxWidth: "1200px" } as const;
