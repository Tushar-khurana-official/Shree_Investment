import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { site, uniqueFundHouses } from "@config";

const root = path.join(__dirname, "../..");

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? files(p) : /\.(tsx?|mdx|json)$/.test(f) ? [p] : [];
  });
}

const sources = [...files(path.join(root, "src")), path.join(root, "site.config.ts")].map((p) => ({ p, text: readFileSync(p, "utf8") }));

describe("compliance copy rules", () => {
  it.each([/\bbest funds?\b/i, /\btop picks?\b/i, /\brisk[- ]free\b/i, /\bassured returns?\b/i, /\bsure[- ]shot\b/i])("never uses %s", (re) => {
    const hits = sources.filter((s) => re.test(s.text)).map((s) => path.relative(root, s.p));
    expect(hits).toEqual([]);
  });

  it('only uses "guaranteed" in a negation ("not guaranteed" / "guaranteed?")', () => {
    for (const { p, text } of sources) {
      for (const m of text.matchAll(/guarantee[ds]?\b/gi)) {
        const before = text.slice(Math.max(0, m.index! - 25), m.index!);
        const after = text.slice(m.index! + m[0].length, m.index! + m[0].length + 2);
        const ok = /\b(not|never|no)\b[^.]*$/i.test(before) || after.startsWith("?");
        expect(ok, `${path.relative(root, p)}: "...${before}${m[0]}"`).toBe(true);
      }
    }
  });

  it("keeps the required statements", () => {
    const all = sources.map((s) => s.text).join("\n");
    expect(all).toContain("Insurance is not an investment, and we will not sell it as one.");
    expect(all).toContain("Illustration only.");
    expect(all).toContain("Your money is invested directly with the fund house. It never sits with us.");
    expect(all).toContain("No newsletter, no drip campaign. One call, and we both decide whether there is a fit.");
    expect(all).toContain("Most of the value is in the fourth step.");
    expect(all).toContain("Decline non-essential");
  });

  it("has no pre-ticked consent box", () => {
    const form = readFileSync(path.join(root, "src/components/contact/ContactForm.tsx"), "utf8");
    expect(form).toMatch(/consent: false/);
    expect(form).not.toMatch(/defaultChecked/);
  });
});

describe("site config", () => {
  it("lists each fund house once", () => {
    const names = site.fundHouses.map((f) => f.name.toLowerCase().trim());
    expect(new Set(names).size).toBe(names.length);
    expect(uniqueFundHouses()).toHaveLength(names.length);
  });

  it("has registration fields filled (even if placeholders)", () => {
    for (const v of [site.registration.arn, site.registration.euin, site.registration.amfiRegistrationDate, site.registration.validTill]) {
      expect(v.length).toBeGreaterThan(0);
    }
  });
});
