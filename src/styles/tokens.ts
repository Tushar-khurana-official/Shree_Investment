/**
 * Design tokens. Light: Emerald & Warm Ivory (default). Dark: Midnight Navy, Cobalt Blue & Bright Red.
 * tokens.css must mirror these values (a unit test checks this), and every text/background pair
 * used on the site is contrast-checked in tests/unit/contrast.test.ts.
 */
export const palette = {
  primary: "#0A6A4A", // Emerald: text accents, links, lines, borders
  "primary-hover": "#084F38",
  "primary-soft": "#DCEFE6", // tinted chips, hover fills, highlight backgrounds
  "primary-fill": "#0A6A4A", // filled buttons and panels (white text)
  "primary-fill-hover": "#084F38",
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
  "hero-ink": "#F5EEDC", // lines and dots on the hero illustration panel
  "hero-shade": "#1B2420", // mixed into the hero hills
  "hero-benchmark": "#E3DCC8", // dashed benchmark line on the hero panel
} as const;

/**
 * Dark mode: Midnight Navy, Cobalt Blue and Bright Red.
 * Cobalt #255DCE carries white text (6.0:1) on buttons and panels, but is too dark to read as text on navy (2.8:1),
 * so text accents and links use a lighter cobalt. Bright Red #DE1110 carries white text (5.0:1) on CTAs.
 */
export const darkPalette = {
  primary: "#8AABF7", // light cobalt: text accents, links, lines (7.4:1 on navy)
  "primary-hover": "#A9C2FA",
  "primary-soft": "#14306E",
  "primary-fill": "#255DCE", // Cobalt Blue: buttons and panels with white text
  "primary-fill-hover": "#1D4FB8",
  "on-primary": "#FFFFFF",
  bg: "#021851", // Midnight Navy
  surface: "#0A2363",
  "surface-2": "#102B70",
  accent: "#FF5A4F", // brighter red for large display text on navy
  "accent-strong": "#DE1110", // Bright Red: CTA buttons with white text
  "accent-strong-hover": "#C00E0D",
  "on-accent": "#FFFFFF",
  text: "#EEF2FF",
  "text-muted": "#B3C0E3",
  border: "#22408A",
  mocha: "#F4B183", // amount-invested chart series (warm, to contrast with blue)
  risk: "#FF8A80",
  "hero-ink": "#EEF2FF",
  "hero-shade": "#01103A",
  "hero-benchmark": "#9DB4EE",
} satisfies Record<keyof typeof palette, string>;

export type TokenName = keyof typeof palette;

export const typography = {
  display: "Fraunces", // H1, H2 and stat numbers, weight 500–600
  body: "Inter", // body and UI
  eyebrow: { size: "0.75rem", tracking: "0.12em", weight: 600, color: "primary" },
} as const;

export const radii = { card: "20px", cardSm: "16px", pill: "999px" } as const;
export const layout = { maxWidth: "1200px" } as const;
