/**
 * Design tokens for Shree Investments, from the visiting card.
 * Navy & gold is the default theme (darkPalette, on :root); a light theme is available from the header toggle.
 * tokens.css must mirror these values (a unit test checks this), and every text/background pair
 * used on the site is contrast-checked in tests/unit/contrast.test.ts.
 */
export const palette = {
  primary: "#1E46B4", // royal blue: links, text accents, lines
  "primary-hover": "#163A99",
  "primary-soft": "#E6ECFB", // tinted chips, hover fills
  "primary-fill": "#0B1F5C", // navy buttons and panels (white text)
  "primary-fill-hover": "#142C7A",
  "on-primary": "#FFFFFF",
  bg: "#F7F5EF", // warm off-white
  surface: "#FFFFFF",
  "surface-2": "#EEF1F8",
  accent: "#D32F2F", // brand red: large display words only
  "accent-strong": "#E3A21A", // gold CTAs (navy text)
  "accent-strong-hover": "#EDB540",
  "on-accent": "#0B1A45",
  text: "#0B1A45", // navy
  "text-muted": "#4B587A",
  border: "#DCE2F0",
  mocha: "#B07A12", // amount-invested chart series (dark gold)
  risk: "#B3261E",
  gold: "#8A5E00", // eyebrows and ornaments (dark gold, readable as small text)
  "brand-blue": "#1F5FD6", // "Smart" in the tagline
  "brand-red": "#D32F2F", // "Strong"
  "brand-green": "#2E7D32", // "Secure"
  "hero-ink": "#FFFFFF",
  "hero-shade": "#020A24",
  "hero-benchmark": "#9DB4EE",
} as const;

/**
 * Default theme, from the Shree Investments visiting card: deep navy with gold, and the logo's
 * blue / red / green for the tagline. Gold CTAs carry navy text (about 9:1).
 */
export const darkPalette = {
  primary: "#F2C14E", // gold: links, text accents, lines (10:1 on navy)
  "primary-hover": "#F7D27A",
  "primary-soft": "#1C2C63",
  "primary-fill": "#2356D9", // royal blue buttons and panels (white text)
  "primary-fill-hover": "#1C47BB",
  "on-primary": "#FFFFFF",
  bg: "#06123A", // card navy
  surface: "#0C1E52",
  "surface-2": "#12286A",
  accent: "#FF6B5E", // bright red: large display words only
  "accent-strong": "#F0B43C", // gold CTAs (navy text)
  "accent-strong-hover": "#F7C766",
  "on-accent": "#06123A",
  text: "#F4F6FB",
  "text-muted": "#B7C2DE",
  border: "#233A7A",
  mocha: "#8EB6FF", // amount-invested chart series (light blue against the gold value line)
  risk: "#FF8A80",
  gold: "#F2C14E",
  "brand-blue": "#5AA2FF",
  "brand-red": "#FF6B5E",
  "brand-green": "#5CCB6F",
  "hero-ink": "#F4F6FB",
  "hero-shade": "#020A24",
  "hero-benchmark": "#8EB6FF",
} satisfies Record<keyof typeof palette, string>;

export type TokenName = keyof typeof palette;

export const typography = {
  display: "Montserrat", // headings and stat numbers, weight 700
  ornament: "Cinzel", // the motto and ornamental labels, as on the card
  body: "Inter", // body and UI
  eyebrow: { size: "0.75rem", tracking: "0.14em", weight: 600, color: "gold" },
} as const;

export const radii = { card: "20px", cardSm: "16px", pill: "999px" } as const;
export const layout = { maxWidth: "1200px" } as const;
