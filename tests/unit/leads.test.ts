import { describe, expect, it } from "vitest";
import { AMOUNT_BANDS, GOAL_VALUES, isHoneypotTripped, normaliseIndianMobile, validateLead } from "@/lib/leads/schema";
import { goalOptions, goals, goalsByHorizon } from "@/content/goals";
import { createRateLimiter } from "@/lib/rate-limit";

const valid = {
  fullName: "Asha Kulkarni",
  mobile: "98765 43210",
  email: "asha@example.com",
  goal: "retire",
  amountBand: "10k-25k",
  city: "Pune",
  message: "",
  consent: true,
  website: "",
};

describe("Indian mobile validation", () => {
  it.each([
    ["9876543210", "9876543210"],
    ["98765 43210", "9876543210"],
    ["+91 98765 43210", "9876543210"],
    ["+91-98765-43210", "9876543210"],
    ["919876543210", "9876543210"],
    ["09876543210", "9876543210"],
    ["6000000000", "6000000000"],
  ])("accepts %s", (input, expected) => {
    expect(normaliseIndianMobile(input)).toBe(expected);
  });

  it.each(["5876543210", "987654321", "98765432101", "abcdefghij", "", "+1 9876543210", "0000000000"])("rejects %s", (input) => {
    expect(normaliseIndianMobile(input)).toBeNull();
  });
});

describe("validateLead", () => {
  it("accepts a valid lead and normalises it", () => {
    const r = validateLead({ ...valid, email: " Asha@Example.com " });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.lead.mobile).toBe("9876543210");
      expect(r.lead.email).toBe("asha@example.com");
      expect(r.lead.source).toBe("contact");
      expect(r.lead.referral).toBe(false);
    }
  });

  it("requires consent to be explicitly true", () => {
    for (const consent of [false, undefined, "true", 1]) {
      const r = validateLead({ ...valid, consent });
      expect(r.ok).toBe(false);
      if (!r.ok) expect(r.errors.consent).toBeTruthy();
    }
  });

  it("rejects invalid mobile numbers with a helpful message", () => {
    const r = validateLead({ ...valid, mobile: "12345" });
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.errors.mobile).toMatch(/10-digit/);
  });

  it("rejects unknown goals and amount bands", () => {
    const r = validateLead({ ...valid, goal: "lottery", amountBand: "1-crore" });
    expect(r.ok).toBe(false);
    if (!r.ok) {
      expect(r.errors.goal).toBeTruthy();
      expect(r.errors.amountBand).toBeTruthy();
    }
  });

  it("reports every missing required field", () => {
    const r = validateLead({});
    expect(r.ok).toBe(false);
    if (!r.ok) {
      for (const k of ["fullName", "mobile", "email", "goal", "amountBand", "city", "consent"]) {
        expect(r.errors[k as keyof typeof r.errors]).toBeTruthy();
      }
    }
  });

  it("limits message length", () => {
    expect(validateLead({ ...valid, message: "x".repeat(2001) }).ok).toBe(false);
  });
});

describe("monthly amount bands", () => {
  it("has the five required bands in order", () => {
    expect(AMOUNT_BANDS.map((b) => b.label)).toEqual([
      "Under ₹10,000",
      "₹10,000 to ₹25,000",
      "₹25,000 to ₹50,000",
      "₹50,000 to ₹1,00,000",
      "Above ₹1,00,000",
    ]);
  });

  it("accepts every band value", () => {
    for (const b of AMOUNT_BANDS) expect(validateLead({ ...valid, amountBand: b.value }).ok).toBe(true);
  });
});

describe("goals", () => {
  it("has six goals plus Not sure yet in the dropdown, each once", () => {
    expect(goals).toHaveLength(6);
    expect(goalOptions).toHaveLength(7);
    expect(goalOptions.at(-1)?.label).toBe("Not sure yet");
    expect(new Set(GOAL_VALUES).size).toBe(GOAL_VALUES.length);
  });

  it("sorts by horizon longest first, with Now last", () => {
    expect(goalsByHorizon().map((g) => g.horizonLabel)).toEqual([
      "25 years away",
      "15 years away",
      "10 years away",
      "6 years away",
      "3 years away",
      "Now",
    ]);
  });
});

describe("honeypot", () => {
  it("trips only when the hidden field has content", () => {
    expect(isHoneypotTripped({ ...valid, website: "http://spam" })).toBe(true);
    expect(isHoneypotTripped({ ...valid, website: "" })).toBe(false);
    expect(isHoneypotTripped(null)).toBe(false);
  });
});

describe("rate limiter", () => {
  it("allows up to max requests per window, then blocks until reset", () => {
    const rl = createRateLimiter({ max: 3, windowMs: 1000 });
    expect([1, 2, 3].map(() => rl.check("ip", 0).allowed)).toEqual([true, true, true]);
    const blocked = rl.check("ip", 10);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBe(1);
    expect(rl.check("other-ip", 10).allowed).toBe(true);
    expect(rl.check("ip", 1001).allowed).toBe(true);
  });
});
