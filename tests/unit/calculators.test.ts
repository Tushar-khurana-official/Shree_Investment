import { describe, expect, it } from "vitest";
import {
  annuityDuePresentValue,
  calculateCrorepati,
  calculateEducation,
  calculateGoal,
  calculateLumpsum,
  calculateRetirement,
  calculateSip,
  calculateSwp,
  corpusAfterMonths,
  lumpsumFutureValue,
  requiredMonthlySip,
  sipCrossoverYear,
  sipFutureValue,
  sipSchedule,
} from "@/lib/calculators";

describe("sipFutureValue", () => {
  it("matches FV = P × [((1+i)^n − 1)/i] × (1+i)", () => {
    // ₹10,000 a month, 12%, 10 years. i = 0.01, n = 120.
    const expected = 10000 * ((Math.pow(1.01, 120) - 1) / 0.01) * 1.01;
    expect(sipFutureValue(10000, 12, 10)).toBeCloseTo(expected, 6);
    expect(Math.round(sipFutureValue(10000, 12, 10))).toBe(2323391);
  });

  it("returns the plain sum at 0% return", () => {
    expect(sipFutureValue(5000, 0, 10)).toBe(600000);
  });

  it("returns 0 for no time or no amount", () => {
    expect(sipFutureValue(5000, 12, 0)).toBe(0);
    expect(sipFutureValue(0, 12, 10)).toBe(0);
  });

  it("is monotonic in rate and years", () => {
    expect(sipFutureValue(5000, 14, 15)).toBeGreaterThan(sipFutureValue(5000, 12, 15));
    expect(sipFutureValue(5000, 12, 16)).toBeGreaterThan(sipFutureValue(5000, 12, 15));
  });
});

describe("sipSchedule and calculateSip", () => {
  it("has one point per year including year 0", () => {
    const s = sipSchedule(5000, 12, 10);
    expect(s).toHaveLength(11);
    expect(s[0]).toEqual({ year: 0, invested: 0, value: 0 });
    expect(s[10].invested).toBe(600000);
  });

  it("reports invested, value and growth consistently", () => {
    const r = calculateSip(10000, 12, 10);
    expect(r.invested).toBe(1200000);
    expect(r.growth).toBeCloseTo(r.value - r.invested, 6);
  });
});

describe("sipCrossoverYear", () => {
  it("finds the first year growth exceeds the amount invested", () => {
    const y = sipCrossoverYear(10000, 12)!;
    expect(y).not.toBeNull();
    const growth = (yr: number) => sipFutureValue(10000, 12, yr) - 120000 * yr;
    expect(growth(y)).toBeGreaterThanOrEqual(120000 * y);
    expect(growth(y - 1)).toBeLessThan(120000 * (y - 1));
  });

  it("is 11 years at 12% and earlier at higher returns", () => {
    expect(sipCrossoverYear(10000, 12)).toBe(11);
    expect(sipCrossoverYear(10000, 14)!).toBeLessThan(11);
  });

  it("is independent of the monthly amount", () => {
    expect(sipCrossoverYear(2500, 12)).toBe(sipCrossoverYear(100000, 12));
  });

  it("returns null at 0% return", () => {
    expect(sipCrossoverYear(10000, 0)).toBeNull();
  });
});

describe("lumpsum", () => {
  it("matches FV = P × (1 + r)^t", () => {
    expect(lumpsumFutureValue(100000, 12, 10)).toBeCloseTo(100000 * Math.pow(1.12, 10), 6);
    expect(Math.round(lumpsumFutureValue(100000, 12, 10))).toBe(310585);
  });

  it("returns principal at year 0", () => {
    expect(lumpsumFutureValue(100000, 12, 0)).toBe(100000);
  });

  it("calculateLumpsum reports growth", () => {
    const r = calculateLumpsum(100000, 10, 5);
    expect(r.growth).toBeCloseTo(r.value - 100000, 6);
    expect(r.schedule).toHaveLength(6);
  });
});

describe("requiredMonthlySip (goal planner)", () => {
  it("matches P = FV × i / [((1+i)^n − 1) × (1+i)]", () => {
    const i = 0.01;
    const n = 120;
    const expected = (2500000 * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
    expect(requiredMonthlySip(2500000, 12, 10)).toBeCloseTo(expected, 6);
  });

  it("is the inverse of sipFutureValue", () => {
    for (const [target, rate, years] of [
      [1_00_00_000, 12, 15],
      [50_00_000, 10, 8],
      [5_00_000, 14, 3],
    ]) {
      const p = requiredMonthlySip(target, rate, years);
      expect(sipFutureValue(p, rate, years)).toBeCloseTo(target, 4);
    }
  });

  it("divides evenly at 0%", () => {
    expect(requiredMonthlySip(120000, 0, 10)).toBe(1000);
  });

  it("calculateGoal returns monthly, invested and growth", () => {
    const g = calculateGoal(1000000, 12, 10);
    expect(g.invested).toBeCloseTo(g.monthly * 120, 6);
    expect(g.growth).toBeCloseTo(1000000 - g.invested, 6);
  });
});

describe("annuityDuePresentValue", () => {
  it("equals withdrawals × months at 0% return", () => {
    expect(annuityDuePresentValue(50000, 0, 240)).toBe(50000 * 240);
  });

  it("matches the level annuity-due formula", () => {
    const r = 0.08 / 12;
    const expected = 50000 * ((1 - Math.pow(1 + r, -240)) / r) * (1 + r);
    expect(annuityDuePresentValue(50000, 8, 240)).toBeCloseTo(expected, 4);
  });

  it("is larger when withdrawals grow with inflation", () => {
    expect(annuityDuePresentValue(50000, 8, 240, 6)).toBeGreaterThan(annuityDuePresentValue(50000, 8, 240));
  });

  it("is exactly depleted by the withdrawals it funds", () => {
    // Withdraw at the start of each month, then earn a month's return.
    const pv = annuityDuePresentValue(40000, 7, 300);
    let bal = pv;
    const r = 0.07 / 12;
    for (let m = 0; m < 300; m++) bal = (bal - 40000) * (1 + r);
    expect(Math.abs(bal)).toBeLessThan(1);
  });
});

describe("calculateRetirement", () => {
  const input = {
    monthlyExpenses: 50000,
    currentAge: 35,
    retirementAge: 60,
    lifeExpectancy: 85,
    inflationPct: 6,
    preReturnPct: 12,
    postReturnPct: 8,
  };

  it("inflates expenses to the retirement year", () => {
    const r = calculateRetirement(input);
    expect(r.yearsToRetirement).toBe(25);
    expect(r.retirementYears).toBe(25);
    expect(r.monthlyExpenseAtRetirement).toBeCloseTo(50000 * Math.pow(1.06, 25), 4);
  });

  it("sizes the corpus as the PV of the retirement annuity at the post-retirement return", () => {
    const r = calculateRetirement(input);
    expect(r.corpus).toBeCloseTo(annuityDuePresentValue(r.monthlyExpenseAtRetirement, 8, 300), 4);
  });

  it("finds the SIP that builds the corpus at the pre-retirement return", () => {
    const r = calculateRetirement(input);
    expect(sipFutureValue(r.monthlySip, 12, 25)).toBeCloseTo(r.corpus, 2);
  });

  it("needs a bigger corpus if withdrawals are indexed to inflation", () => {
    expect(calculateRetirement({ ...input, indexWithdrawals: true }).corpus).toBeGreaterThan(calculateRetirement(input).corpus);
  });

  it("handles already being at retirement age", () => {
    const r = calculateRetirement({ ...input, currentAge: 60 });
    expect(r.yearsToRetirement).toBe(0);
    expect(r.monthlySip).toBe(r.corpus);
  });
});

describe("calculateEducation", () => {
  it("inflates the fee at education inflation and finds the SIP", () => {
    const r = calculateEducation(2000000, 15, 10, 12);
    expect(r.futureFee).toBeCloseTo(2000000 * Math.pow(1.1, 15), 4);
    expect(sipFutureValue(r.monthlySip, 12, 15)).toBeCloseTo(r.futureFee, 2);
  });
});

describe("calculateSwp", () => {
  it("never runs out when monthly return exceeds the withdrawal", () => {
    const r = calculateSwp({ corpus: 10000000, monthlyWithdrawal: 50000, annualReturnPct: 8, maxYears: 30 });
    expect(r.outlastsDuration).toBe(true);
    expect(r.monthsLasted).toBe(360);
    expect(r.endingBalance).toBeGreaterThan(10000000);
  });

  it("depletes with no return after exactly corpus / withdrawal months", () => {
    const r = calculateSwp({ corpus: 1200000, monthlyWithdrawal: 10000, annualReturnPct: 0 });
    expect(r.monthsLasted).toBe(120);
    expect(r.endingBalance).toBe(0);
    expect(r.totalWithdrawn).toBe(1200000);
    expect(r.outlastsDuration).toBe(false);
  });

  it("handles a partial final withdrawal", () => {
    const r = calculateSwp({ corpus: 105000, monthlyWithdrawal: 10000, annualReturnPct: 0 });
    expect(r.monthsLasted).toBe(11);
    expect(r.totalWithdrawn).toBe(105000);
  });

  it("lasts longer with higher returns", () => {
    const low = calculateSwp({ corpus: 5000000, monthlyWithdrawal: 50000, annualReturnPct: 6 });
    const high = calculateSwp({ corpus: 5000000, monthlyWithdrawal: 50000, annualReturnPct: 9 });
    expect(high.monthsLasted).toBeGreaterThan(low.monthsLasted);
  });

  it("produces yearly balance points starting at the corpus", () => {
    const r = calculateSwp({ corpus: 5000000, monthlyWithdrawal: 50000, annualReturnPct: 8 });
    expect(r.schedule[0]).toEqual({ year: 0, balance: 5000000, withdrawn: 0 });
    expect(r.schedule[r.schedule.length - 1].balance).toBe(r.endingBalance);
  });
});

describe("calculateCrorepati", () => {
  it("finds the first month the corpus reaches the target", () => {
    const r = calculateCrorepati({ currentSavings: 500000, monthlySip: 25000, annualReturnPct: 12 });
    const m = r.monthsToTarget!;
    expect(corpusAfterMonths(500000, 25000, 12, m)).toBeGreaterThanOrEqual(1_00_00_000);
    expect(corpusAfterMonths(500000, 25000, 12, m - 1)).toBeLessThan(1_00_00_000);
  });

  it("is zero months if savings already meet the target", () => {
    expect(calculateCrorepati({ currentSavings: 1_20_00_000, monthlySip: 0, annualReturnPct: 12 }).monthsToTarget).toBe(0);
  });

  it("returns null when the target is out of reach within the cap", () => {
    expect(calculateCrorepati({ currentSavings: 0, monthlySip: 100, annualReturnPct: 0, maxYears: 40 }).monthsToTarget).toBeNull();
  });

  it("respects a custom target", () => {
    const one = calculateCrorepati({ currentSavings: 0, monthlySip: 20000, annualReturnPct: 12 });
    const two = calculateCrorepati({ currentSavings: 0, monthlySip: 20000, annualReturnPct: 12, target: 2_00_00_000 });
    expect(two.monthsToTarget!).toBeGreaterThan(one.monthsToTarget!);
  });

  it("corpusAfterMonths combines grown savings with the SIP value", () => {
    expect(corpusAfterMonths(100000, 0, 12, 12)).toBeCloseTo(100000 * Math.pow(1.01, 12), 6);
    expect(corpusAfterMonths(0, 5000, 12, 120)).toBeCloseTo(sipFutureValue(5000, 12, 10), 6);
  });
});
