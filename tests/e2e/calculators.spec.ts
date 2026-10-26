import { test, expect } from "./fixtures";

test("SIP calculator shows Indian-formatted results and a data table", async ({ page }) => {
  await page.goto("/calculators/sip");
  await expect(page.getByText("Illustration only.").first()).toBeVisible();
  const input = page.getByLabel("Monthly investment", { exact: true });
  await input.fill("10000");
  await input.press("Enter");
  await page.getByLabel("Time period", { exact: true }).fill("10");
  await page.getByLabel("Time period", { exact: true }).press("Enter");
  await page.getByLabel("Expected annual return", { exact: true }).fill("12");
  await page.getByLabel("Expected annual return", { exact: true }).press("Enter");
  await expect(page.getByText("₹23.2 L").first()).toBeVisible();
  await expect(page.getByText("₹12,00,000").first()).toBeVisible();
  await page.getByRole("button", { name: "Show data table" }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await page.getByRole("button", { name: /At 14%/ }).click();
  await expect(page.getByRole("button", { name: /At 14%/ })).toHaveAttribute("aria-pressed", "true");
});

test("calculator result is carried into the contact form, not the URL", async ({ page }) => {
  await page.goto("/calculators/retirement");
  await page.getByRole("button", { name: "Book a review" }).click();
  await expect(page).toHaveURL(/\/contact\?from=calculator&calc=retirement$/);
  const message = page.getByLabel(/Anything we should know/);
  await expect(message).toHaveValue(/From the Retirement calculator: Retirement plan:/);
  await expect(message).toHaveValue(/corpus required/);
  expect(page.url()).not.toMatch(/corpus|₹|%E2%82%B9/);
});

test("home SIP preview links to the full calculator", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("radio", { name: "20 yrs" }).check({ force: true });
  await expect(page.getByText("Projected value")).toBeVisible();
  await page.getByRole("link", { name: "Open full calculator" }).click();
  await expect(page).toHaveURL(/\/calculators\/sip$/);
});

test("every calculator page renders with its disclaimer and CTA", async ({ page }) => {
  for (const slug of ["sip", "lumpsum", "goal", "retirement", "education", "crorepati", "swp"]) {
    await page.goto(`/calculators/${slug}`);
    await expect(page.getByText("Returns are assumed, not guaranteed.").first()).toBeVisible();
    await expect(page.getByRole("button", { name: "Book a review" })).toBeVisible();
    await expect(page.getByText(/At 10%/)).toBeVisible();
  }
});
