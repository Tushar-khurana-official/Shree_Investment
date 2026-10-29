import { test as base, expect } from "@playwright/test";

/** Pre-records a cookie choice so the banner does not cover the page, unless a test opts out. */
export const test = base.extend<{ consent: "accepted" | "declined" | null; theme: "light" | "dark" }>({
  consent: ["declined", { option: true }],
  theme: ["dark", { option: true }],
  page: async ({ page, consent, theme }, provide) => {
    if (consent) {
      await page.addInitScript((c) => window.localStorage.setItem("mfd-cookie-consent", c), consent);
    }
    if (theme === "light") {
      await page.addInitScript(() => window.localStorage.setItem("mfd-theme", "light"));
    }
    await provide(page);
  },
});

export { expect };

export const ALL_PAGES = [
  "/",
  "/about",
  "/services",
  "/approach",
  "/calculators",
  "/calculators/sip",
  "/calculators/lumpsum",
  "/calculators/goal",
  "/calculators/retirement",
  "/calculators/education",
  "/calculators/crorepati",
  "/calculators/swp",
  "/mf-research",
  "/mutual-funds-explained",
  "/insights",
  "/insights/asset-allocation-and-goals",
  "/news",
  "/contact",
  "/contact/thank-you",
  "/clients",
  "/legal/privacy-policy",
  "/legal/terms-of-use",
  "/legal/disclaimer",
  "/legal/commission-disclosure",
  "/legal/disclosures",
];
