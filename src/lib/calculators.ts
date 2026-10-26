/**
 * Calculator formulas. Pure functions, no UI. Every function is unit-tested in tests/unit/calculators.test.ts.
 *
 * Conventions
 *  - Rates are annual percentages (12 means 12% a year).
 *  - SIPs are invested at the start of each month (annuity due), compounding monthly at annual rate / 12.
 *  - Results are illustrations. Returns are assumed, not guaranteed.
 */

export type YearPoint = {
  year: number;
  invested: number;
  value: number;
};

const monthlyRate = (annualPct: number) => annualPct / 100 / 12;

// ---------------------------------------------------------------------------
// SIP
// ---------------------------------------------------------------------------

/** FV = P × [((1 + i)^n − 1) / i] × (1 + i), with i = annual rate / 12 and n = years × 12. */
export function sipFutureValue(monthly: number, annualPct: number, years: number): number {
  const i = monthlyRate(annualPct);
  const n = Math.round(years * 12);
  if (n <= 0 || monthly <= 0) return 0;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}

export function sipSchedule(monthly: number, annualPct: number, years: number): YearPoint[] {
  const points: YearPoint[] = [];
  for (let y = 0; y <= years; y++) {
    points.push({ year: y, invested: monthly * 12 * y, value: sipFutureValue(monthly, annualPct, y) });
  }
  return points;
}

/**
 * First whole year in which estimated growth (value − invested) exceeds the amount invested,
 * i.e. returns overtake invested capital. Searches up to `maxYears`; null if never.
 */
export function sipCrossoverYear(monthly: number, annualPct: number, maxYears = 60): number | null {
  if (monthly <= 0 || annualPct <= 0) return null;
  for (let y = 1; y <= maxYears; y++) {
    const invested = monthly * 12 * y;
    const growth = sipFutureValue(monthly, annualPct, y) - invested;
    if (growth >= invested) return y;
  }
  return null;
}

export type SipResult = {
  invested: number;
  value: number;
  growth: number;
  crossoverYear: number | null;
  schedule: YearPoint[];
};

export function calculateSip(monthly: number, annualPct: number, years: number): SipResult {
  const value = sipFutureValue(monthly, annualPct, years);
  const invested = monthly * 12 * years;
  return {
    invested,
    value,
    growth: value - invested,
    crossoverYear: sipCrossoverYear(monthly, annualPct),
    schedule: sipSchedule(monthly, annualPct, years),
  };
}

// ---------------------------------------------------------------------------
// Lumpsum
// ---------------------------------------------------------------------------

/** FV = P × (1 + r)^t, compounded annually. */
export function lumpsumFutureValue(principal: number, annualPct: number, years: number): number {
  if (principal <= 0 || years <= 0) return Math.max(principal, 0);
  return principal * Math.pow(1 + annualPct / 100, years);
}

export function calculateLumpsum(principal: number, annualPct: number, years: number) {
  const value = lumpsumFutureValue(principal, annualPct, years);
  const schedule: YearPoint[] = [];
  for (let y = 0; y <= years; y++) {
    schedule.push({ year: y, invested: principal, value: lumpsumFutureValue(principal, annualPct, y) });
  }
  return { invested: principal, value, growth: value - principal, schedule };
}

// ---------------------------------------------------------------------------
// Goal planner: required monthly SIP
// ---------------------------------------------------------------------------

/** P = FV × i / [((1 + i)^n − 1) × (1 + i)]. Inverse of sipFutureValue. */
export function requiredMonthlySip(target: number, annualPct: number, years: number): number {
  const i = monthlyRate(annualPct);
  const n = Math.round(years * 12);
  if (target <= 0) return 0;
  if (n <= 0) return target;
  if (i === 0) return target / n;
  return (target * i) / ((Math.pow(1 + i, n) - 1) * (1 + i));
}

export function calculateGoal(target: number, annualPct: number, years: number) {
  const monthly = requiredMonthlySip(target, annualPct, years);
  const invested = monthly * 12 * years;
  return {
    monthly,
    invested,
    growth: target - invested,
    schedule: sipSchedule(monthly, annualPct, years),
  };
}

// ---------------------------------------------------------------------------
// Retirement
// ---------------------------------------------------------------------------

export type RetirementInput = {
  monthlyExpenses: number;
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  inflationPct: number;
  preReturnPct: number;
  postReturnPct: number;
  /** When true, withdrawals rise with inflation during retirement (growing annuity). Default false. */
  indexWithdrawals?: boolean;
};

/**
 * Present value, at the start of retirement, of `months` monthly withdrawals taken at the start of each month
 * (annuity due). With growthPct > 0 the withdrawal rises each month by the monthly equivalent of that annual rate.
 */
export function annuityDuePresentValue(
  firstWithdrawal: number,
  annualReturnPct: number,
  months: number,
  growthPct = 0,
): number {
  if (months <= 0 || firstWithdrawal <= 0) return 0;
  const r = monthlyRate(annualReturnPct);
  const g = growthPct > 0 ? Math.pow(1 + growthPct / 100, 1 / 12) - 1 : 0;
  if (Math.abs(r - g) < 1e-12) return firstWithdrawal * months;
  // Growing annuity due: W × [1 − ((1+g)/(1+r))^m] / (r − g) × (1 + r)
  return firstWithdrawal * ((1 - Math.pow((1 + g) / (1 + r), months)) / (r - g)) * (1 + r);
}

export type RetirementResult = {
  yearsToRetirement: number;
  retirementYears: number;
  monthlyExpenseAtRetirement: number;
  corpus: number;
  monthlySip: number;
  schedule: YearPoint[];
};

export function calculateRetirement(input: RetirementInput): RetirementResult {
  const yearsToRetirement = Math.max(0, input.retirementAge - input.currentAge);
  const retirementYears = Math.max(0, input.lifeExpectancy - input.retirementAge);
  const monthlyExpenseAtRetirement =
    input.monthlyExpenses * Math.pow(1 + input.inflationPct / 100, yearsToRetirement);
  const corpus = annuityDuePresentValue(
    monthlyExpenseAtRetirement,
    input.postReturnPct,
    retirementYears * 12,
    input.indexWithdrawals ? input.inflationPct : 0,
  );
  const monthlySip = yearsToRetirement > 0 ? requiredMonthlySip(corpus, input.preReturnPct, yearsToRetirement) : corpus;
  return {
    yearsToRetirement,
    retirementYears,
    monthlyExpenseAtRetirement,
    corpus,
    monthlySip,
    schedule: yearsToRetirement > 0 ? sipSchedule(monthlySip, input.preReturnPct, yearsToRetirement) : [],
  };
}

// ---------------------------------------------------------------------------
// Child education
// ---------------------------------------------------------------------------

export function calculateEducation(currentFee: number, years: number, educationInflationPct: number, returnPct: number) {
  const futureFee = currentFee * Math.pow(1 + educationInflationPct / 100, years);
  const monthlySip = requiredMonthlySip(futureFee, returnPct, years);
  return {
    futureFee,
    monthlySip,
    invested: monthlySip * 12 * years,
    schedule: sipSchedule(monthlySip, returnPct, years),
  };
}

// ---------------------------------------------------------------------------
// SWP (systematic withdrawal plan)
// ---------------------------------------------------------------------------

export type SwpInput = {
  corpus: number;
  monthlyWithdrawal: number;
  annualReturnPct: number;
  /** Optional cap on the simulation, in years. Defaults to 100 years. */
  maxYears?: number;
};

export type SwpPoint = { year: number; balance: number; withdrawn: number };

export type SwpResult = {
  /** Months in which a withdrawal was made in full or in part. */
  monthsLasted: number;
  /** True when the corpus was not exhausted within the simulated duration. */
  outlastsDuration: boolean;
  endingBalance: number;
  totalWithdrawn: number;
  schedule: SwpPoint[];
};

/**
 * Each month the balance first earns a month of return, then the withdrawal is taken.
 * The last withdrawal may be partial if the balance runs short.
 */
export function calculateSwp({ corpus, monthlyWithdrawal, annualReturnPct, maxYears = 100 }: SwpInput): SwpResult {
  const i = monthlyRate(annualReturnPct);
  const maxMonths = Math.round(maxYears * 12);
  let balance = Math.max(0, corpus);
  let totalWithdrawn = 0;
  let monthsLasted = 0;
  const schedule: SwpPoint[] = [{ year: 0, balance, withdrawn: 0 }];

  for (let m = 1; m <= maxMonths; m++) {
    if (balance <= 0) break;
    balance += balance * i;
    const take = Math.min(monthlyWithdrawal, balance);
    balance -= take;
    totalWithdrawn += take;
    if (take > 0) monthsLasted = m;
    if (balance < 0.005) balance = 0;
    if (m % 12 === 0) schedule.push({ year: m / 12, balance, withdrawn: totalWithdrawn });
  }
  const last = schedule[schedule.length - 1];
  if (last && last.balance !== balance) {
    schedule.push({ year: Math.ceil(monthsLasted / 12), balance, withdrawn: totalWithdrawn });
  }
  return {
    monthsLasted,
    outlastsDuration: balance > 0,
    endingBalance: balance,
    totalWithdrawn,
    schedule,
  };
}

// ---------------------------------------------------------------------------
// Crorepati: when does the corpus reach the target?
// ---------------------------------------------------------------------------

export type CrorepatiInput = {
  currentSavings: number;
  monthlySip: number;
  annualReturnPct: number;
  target?: number;
  maxYears?: number;
};

/** Value after m months: S × (1 + i)^m + SIP future value over m months. */
export function corpusAfterMonths(currentSavings: number, monthlySip: number, annualPct: number, months: number): number {
  const i = monthlyRate(annualPct);
  const grownSavings = currentSavings * Math.pow(1 + i, months);
  return grownSavings + sipFutureValue(monthlySip, annualPct, months / 12);
}

export function calculateCrorepati({
  currentSavings,
  monthlySip,
  annualReturnPct,
  target = 1_00_00_000,
  maxYears = 60,
}: CrorepatiInput) {
  let monthsToTarget: number | null = null;
  for (let m = 0; m <= maxYears * 12; m++) {
    if (corpusAfterMonths(currentSavings, monthlySip, annualReturnPct, m) >= target) {
      monthsToTarget = m;
      break;
    }
  }
  const horizon = monthsToTarget === null ? maxYears : Math.max(1, Math.ceil(monthsToTarget / 12));
  const schedule: YearPoint[] = [];
  for (let y = 0; y <= horizon; y++) {
    schedule.push({
      year: y,
      invested: currentSavings + monthlySip * 12 * y,
      value: corpusAfterMonths(currentSavings, monthlySip, annualReturnPct, y * 12),
    });
  }
  return {
    monthsToTarget,
    yearsToTarget: monthsToTarget === null ? null : monthsToTarget / 12,
    invested: monthsToTarget === null ? null : currentSavings + monthlySip * monthsToTarget,
    schedule,
  };
}

/** Rates shown side by side on every calculator. */
export const COMPARISON_RATES = [10, 12, 14] as const;
