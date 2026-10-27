import AxeBuilder from "@axe-core/playwright";
import { test, expect, ALL_PAGES } from "./fixtures";

for (const theme of ["light", "dark"] as const) {
  test.describe(`accessibility (${theme} theme)`, () => {
    test.use({ theme });
    for (const path of ALL_PAGES) {
      test(`${path} has no WCAG 2.1 A/AA violations`, async ({ page }) => {
        await page.goto(path);
        // Reveal scroll-animated content so axe evaluates final colours.
        await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => e.classList.add("is-visible")));
        await page.waitForTimeout(800);
        const results = await new AxeBuilder({ page: page as unknown as ConstructorParameters<typeof AxeBuilder>[0]["page"] }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} × ${v.nodes[0]?.target.join(" ")} — ${v.help}`);
        expect(summary).toEqual([]);
      });
    }
  });
}

test("every page has a unique title and a description", async ({ page }) => {
  const titles = new Set<string>();
  for (const path of ALL_PAGES) {
    await page.goto(path);
    const title = await page.title();
    expect(title.length, path).toBeGreaterThan(10);
    expect(titles.has(title), `duplicate title on ${path}: ${title}`).toBe(false);
    titles.add(title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /.{40,}/);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});
