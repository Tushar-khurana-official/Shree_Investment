import { test, expect } from "./fixtures";

test("skip link moves focus to main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: "Skip to content" });
  await expect(skip).toBeFocused();
  await skip.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("footer shows registration details and legal links on every page type", async ({ page }) => {
  for (const path of ["/", "/calculators/sip", "/legal/disclaimer"]) {
    await page.goto(path);
    const footer = page.locator("footer");
    await expect(footer).toContainText("AMFI ARN");
    await expect(footer).toContainText("EUIN");
    await expect(footer).toContainText("Validity");
    await expect(footer).toContainText("Mutual fund investments are subject to market risks");
    for (const name of ["Privacy Policy", "Terms of Use", "Disclaimer", "Commission Disclosure", "Disclosures"]) {
      await expect(footer.getByRole("link", { name, exact: true })).toBeVisible();
    }
    await expect(page.getByRole("link", { name: /WhatsApp/ }).last()).toBeVisible();
  }
});

test("fund houses are announced once each; the marquee copy is aria-hidden", async ({ page }) => {
  await page.goto("/");
  const announced = await page.locator("#fund-houses .marquee ul:not([aria-hidden]) li").allTextContents();
  expect(announced.length).toBeGreaterThan(0);
  expect(new Set(announced).size).toBe(announced.length);
  await expect(page.locator("#fund-houses .marquee ul[aria-hidden='true']")).toHaveCount(1);
  const listItems = await page.getByRole("region", { name: /empanelled fund houses/ }).getByRole("listitem").count();
  expect(listItems).toBe(announced.length);
});

test("navy & gold by default (even with a light OS preference); the toggle switches to light and is remembered", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "light" });
  const page = await ctx.newPage();
  await page.goto("/");
  const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(await bg()).toBe("rgb(6, 18, 58)");
  await expect(page.getByRole("link", { name: "Start planning" })).toHaveCSS("background-color", "rgb(240, 180, 60)");
  const toggle = page.getByRole("button", { name: "Light mode" });
  await expect(toggle).toHaveAttribute("aria-pressed", "false");
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(await bg()).toBe("rgb(247, 245, 239)");
  await page.reload();
  expect(await bg()).toBe("rgb(247, 245, 239)");
  await page.getByRole("button", { name: "Light mode" }).click();
  expect(await bg()).toBe("rgb(6, 18, 58)");
  await ctx.close();
});

test("menu works by keyboard (desktop) or drawer (mobile)", async ({ page, isMobile }) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Open menu" }).click();
    const dialog = page.getByRole("dialog", { name: "Site menu" });
    await dialog.getByRole("button", { name: "Tools" }).click();
    await dialog.getByRole("link", { name: "Retirement calculator" }).click();
  } else {
    const tools = page.getByRole("navigation", { name: "Main" }).getByRole("button", { name: "Tools" });
    await tools.focus();
    await page.keyboard.press("Enter");
    await expect(tools).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(tools).toHaveAttribute("aria-expanded", "false");
    await tools.click();
    await page.getByRole("link", { name: "Retirement calculator" }).first().click();
  }
  await expect(page).toHaveURL(/\/calculators\/retirement$/);
});

test.describe("cookie banner", () => {
  test.use({ consent: null });
  test("offers decline and accept with equal prominence and remembers the choice", async ({ page }) => {
    await page.goto("/");
    const region = page.getByRole("region", { name: "Cookie preferences" });
    const decline = region.getByRole("button", { name: "Decline non-essential" });
    const accept = region.getByRole("button", { name: "Accept all" });
    await expect(decline).toBeVisible();
    const [d, a] = [await decline.boundingBox(), await accept.boundingBox()];
    expect(Math.abs(d!.width - a!.width)).toBeLessThan(2);
    expect(Math.abs(d!.height - a!.height)).toBeLessThan(2);
    expect(await decline.getAttribute("class")).toBe(await accept.getAttribute("class"));
    await decline.click();
    await expect(region).toBeHidden();
    await page.reload();
    await expect(page.getByRole("region", { name: "Cookie preferences" })).toBeHidden();
  });
});

test("no page scrolls horizontally", async ({ page }) => {
  const { ALL_PAGES } = await import("./fixtures");
  for (const path of ALL_PAGES) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
