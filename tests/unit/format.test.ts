import { describe, expect, it } from "vitest";
import { formatAxisINR, formatDuration, formatIndianNumber, formatINR, formatINRCompact, parseAmount } from "@/lib/format";

describe("Indian number formatting", () => {
  it("groups digits in lakhs and crores", () => {
    expect(formatIndianNumber(250000)).toBe("2,50,000");
    expect(formatIndianNumber(12345678)).toBe("1,23,45,678");
    expect(formatINR(250000)).toBe("₹2,50,000");
    expect(formatINR(999)).toBe("₹999");
  });

  it("uses Cr with 2 decimals and L with 1 decimal", () => {
    expect(formatINRCompact(25000000)).toBe("₹2.50 Cr");
    expect(formatINRCompact(6000000)).toBe("₹60.0 L");
    expect(formatINRCompact(10000000)).toBe("₹1.00 Cr");
    expect(formatINRCompact(99999)).toBe("₹99,999");
  });

  it("formats axis labels compactly", () => {
    expect(formatAxisINR(25000000)).toBe("₹2.5 Cr");
    expect(formatAxisINR(6000000)).toBe("₹60 L");
    expect(formatAxisINR(25000)).toBe("₹25K");
  });

  it("formats durations", () => {
    expect(formatDuration(134)).toBe("11 years 2 months");
    expect(formatDuration(12)).toBe("1 year");
    expect(formatDuration(5)).toBe("5 months");
  });

  it("parses typed amounts", () => {
    expect(parseAmount("2,50,000")).toBe(250000);
    expect(parseAmount("₹ 1,000")).toBe(1000);
    expect(parseAmount("Rs. 500")).toBe(500);
    expect(Number.isNaN(parseAmount("abc"))).toBe(true);
  });
});
