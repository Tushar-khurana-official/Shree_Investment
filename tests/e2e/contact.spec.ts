import { test, expect } from "./fixtures";

async function fillValid(page: import("@playwright/test").Page) {
  await page.getByLabel("Full name").fill("Asha Kulkarni");
  await page.getByLabel("Mobile number").fill("98765 43210");
  await page.getByLabel("Email").fill("asha@example.com");
  await page.getByLabel("City").fill("Pune");
  await page.getByLabel("Monthly investable amount").selectOption({ label: "₹10,000 to ₹25,000" });
}

test.describe("contact flow", () => {
  test("shows validation errors and does not submit an empty form", async ({ page }) => {
    await page.goto("/contact");
    await page.getByRole("button", { name: "Request a call back" }).click();
    await expect(page.getByText(/Please fix \d+ fields below/)).toBeVisible();
    await expect(page.getByText("Enter a 10-digit Indian mobile number", { exact: false })).toBeVisible();
    await expect(page.getByLabel("Full name")).toBeFocused();
    await expect(page).toHaveURL(/\/contact$/);
  });

  test("consent box starts unticked and is required", async ({ page }) => {
    await page.goto("/contact");
    const consent = page.getByRole("checkbox", { name: /I agree to be contacted/ });
    await expect(consent).not.toBeChecked();
    await fillValid(page);
    await page.getByLabel("Investment goal").selectOption("retire");
    await page.getByRole("button", { name: "Request a call back" }).click();
    await expect(page.getByText(/Please agree to be contacted/)).toBeVisible();
  });

  test("goal dropdown has the six goals plus Not sure yet", async ({ page }) => {
    await page.goto("/contact");
    const options = await page.getByLabel("Investment goal").locator("option").allTextContents();
    expect(options.slice(1)).toEqual([
      "Retire without a pay cut",
      "Fund the degree, not the loan",
      "Build the first crore",
      "Buy the house in cash-flow terms",
      "Save tax without wrecking liquidity",
      "Protect the plan itself",
      "Not sure yet",
    ]);
  });

  test("submits a valid enquiry and lands on the confirmation page", async ({ page }) => {
    await page.goto("/contact?goal=house");
    await expect(page.getByLabel("Investment goal")).toHaveValue("house");
    await fillValid(page);
    await page.getByRole("checkbox", { name: /I agree to be contacted/ }).check();
    await page.getByRole("button", { name: "Request a call back" }).click();
    await expect(page).toHaveURL(/\/contact\/thank-you$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Thank you");
    await expect(page.getByRole("heading", { name: "What happens next" })).toBeVisible();
  });

  test("ignores unknown goal values in the URL", async ({ page }) => {
    await page.goto("/contact?goal=<script>");
    await expect(page.getByLabel("Investment goal")).toHaveValue("");
  });

  test("referral link marks the form as an introduction", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Introduce someone" }).click();
    await expect(page).toHaveURL(/ref=referral/);
    await expect(page.getByRole("heading", { name: "Introduce someone" })).toBeVisible();
  });
});

test.describe("lead API", () => {
  test("rejects invalid input with field errors", async ({ request }) => {
    const res = await request.post("/api/leads", { data: { fullName: "A" } });
    expect(res.status()).toBe(422);
    const body = await res.json();
    expect(body.errors.mobile).toBeTruthy();
    expect(body.errors.consent).toBeTruthy();
  });

  test("silently accepts but discards honeypot submissions", async ({ request }) => {
    const res = await request.post("/api/leads", {
      data: { fullName: "Bot", mobile: "9876543210", email: "b@x.io", goal: "retire", amountBand: "under-10k", city: "X", consent: true, website: "spam.example" },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).reference).toBe("RECEIVED");
  });

  test("refuses non-JSON bodies", async ({ request }) => {
    const res = await request.post("/api/leads", { form: { a: "b" } });
    expect(res.status()).toBe(415);
  });
});
