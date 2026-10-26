/** The six planning goals used on the home page and in the contact form dropdown. */
export type Goal = {
  id: string;
  title: string;
  /** Years away; null for "Now" (not a time-horizon goal). */
  years: number | null;
  horizonLabel: string;
  description: string;
  tags: string[];
};

export const goals: Goal[] = [
  {
    id: "retire",
    title: "Retire without a pay cut",
    years: 25,
    horizonLabel: "25 years away",
    description:
      "A corpus sized to your real expenses, indexed for inflation, and drawn down in a sequence that survives a bad first decade.",
    tags: ["Equity mutual funds", "NPS", "Debt laddering"],
  },
  {
    id: "education",
    title: "Fund the degree, not the loan",
    years: 15,
    horizonLabel: "15 years away",
    description:
      "Education inflation runs near 10%. We work backwards from the fee in the year your child enrols.",
    tags: ["Equity mutual funds", "Sukanya Samriddhi", "Gift deeds"],
  },
  {
    id: "first-crore",
    title: "Build the first crore",
    years: 10,
    horizonLabel: "10 years away",
    description: "An SIP you can sustain through a drawdown, and a rebalancing rule agreed in advance.",
    tags: ["Equity mutual funds", "Index funds", "Hybrid funds"],
  },
  {
    id: "house",
    title: "Buy the house in cash-flow terms",
    years: 6,
    horizonLabel: "6 years away",
    description:
      "A down payment this close to spending has no business sitting in equity. Park it where the date is safe.",
    tags: ["Short-duration debt", "Arbitrage funds", "FDs"],
  },
  {
    id: "tax",
    title: "Save tax without wrecking liquidity",
    years: 3,
    horizonLabel: "3 years away",
    description:
      "ELSS has the shortest lock-in under Section 80C. Use it deliberately, not as a March panic purchase.",
    tags: ["ELSS", "NPS Tier I", "80C planning"],
  },
  {
    id: "protect",
    title: "Protect the plan itself",
    years: null,
    horizonLabel: "Now",
    description:
      "Term cover and a health floater sized to your liabilities. Insurance is not an investment, and it is not sold as one.",
    tags: ["Term life", "Health floater", "Emergency fund"],
  },
];

/** Time-horizon goals longest first; "Now" (not a time horizon) always last. */
export function goalsByHorizon(list: Goal[] = goals): Goal[] {
  return [...list].sort((a, b) => (b.years ?? -1) - (a.years ?? -1));
}

export const NOT_SURE_GOAL = { id: "not-sure", title: "Not sure yet" } as const;

/** Options for the contact form goal dropdown: all six goals plus "Not sure yet". */
export const goalOptions: { value: string; label: string }[] = [
  ...goals.map((g) => ({ value: g.id, label: g.title })),
  { value: NOT_SURE_GOAL.id, label: NOT_SURE_GOAL.title },
];
