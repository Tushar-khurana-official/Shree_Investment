/**
 * Design tokens: Emerald & Warm Ivory.
 * The CSS custom properties in tokens.css must mirror these values (a unit test checks this),
 * and every text/background pair used on buttons is contrast-checked in tests/unit/contrast.test.ts.
 */
export const palette = {
  light: {
    bg: "#F5EEDC", // Warm Ivory
    surface: "#FFFDF7",
    "surface-2": "#EFE7D2",
    fg: "#1B2420",
    muted: "#5C6661",
    border: "#E3DCC8",
    primary: "#0A6A4A", // Emerald
    "primary-hover": "#084F38",
    "on-primary": "#FFFFFF",
    accent: "#E84A27", // Vermilion: key CTAs and highlights only, never body text
    "accent-hover": "#F2603E",
    "on-accent": "#0B0F0D", // white on Vermilion is 3.9:1 (fails AA for button text), so CTAs use near-black
    mocha: "#7B4A2E", // secondary chart series (amount invested)
    success: "#0A6A4A",
    danger: "#B3361B",
  },
  dark: {
    bg: "#0F1A16",
    surface: "#17261F",
    "surface-2": "#1E3128",
    fg: "#EEF3EF",
    muted: "#A9B8B0",
    border: "#2C4037",
    primary: "#4FBF94",
    "primary-hover": "#6FD0A9",
    "on-primary": "#0F1A16", // white on #4FBF94 fails AA, so dark text
    accent: "#FF6B47",
    "accent-hover": "#FF8566",
    "on-accent": "#0F1A16",
    mocha: "#D29A74",
    success: "#4FBF94",
    danger: "#FF8A70",
  },
} as const;

export type TokenName = keyof typeof palette.light;

export const typography = {
  display: "Fraunces", // high-contrast serif for display and headings
  body: "Inter", // clean sans for body and UI
  eyebrow: { size: "0.75rem", tracking: "0.16em", weight: 600 },
} as const;

export const radii = { card: "20px", cardSm: "16px", pill: "999px" } as const;
export const layout = { maxWidth: "1200px" } as const;
