import type { CalculatorMeta } from "./calculators";

export const formulaNotes: Record<CalculatorMeta["slug"], string[]> = {
  sip: [
    "Future value = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i), where P is the monthly SIP, i is the annual return ÷ 12, and n is the number of months.",
    "This assumes you invest at the start of every month and the return is the same every month. Real returns arrive unevenly.",
    "“Returns overtake invested capital” is the first year in which the estimated growth exceeds the total amount invested.",
  ],
  lumpsum: ["Future value = P × (1 + r)ᵗ, where P is the amount invested, r is the annual return and t is the number of years, compounded once a year."],
  goal: ["Monthly SIP = FV × i ÷ [((1 + i)ⁿ − 1) × (1 + i)], where FV is the target, i is the annual return ÷ 12 and n is the number of months. It is the SIP formula solved for P."],
  retirement: [
    "Monthly expenses at retirement = today's expenses × (1 + inflation)^(years to retirement).",
    "Corpus = present value, at the post-retirement return, of that monthly withdrawal for every month from retirement to the planning age, taken at the start of each month. With the inflation option on, each withdrawal rises with inflation.",
    "Monthly SIP = the goal-planner formula applied to that corpus at the pre-retirement return.",
  ],
  education: [
    "Fee at enrolment = today's fee × (1 + education inflation)^(years until enrolment).",
    "Monthly SIP = the goal-planner formula applied to the future fee at the expected return.",
  ],
  crorepati: [
    "Value after m months = S × (1 + i)^m + P × [((1 + i)^m − 1) ÷ i] × (1 + i), where S is current savings, P the monthly SIP and i the annual return ÷ 12.",
    "The calculator finds the first month in which this reaches the target.",
  ],
  swp: [
    "Each month the balance earns one month of the assumed return (annual ÷ 12), then the withdrawal is taken. The final withdrawal may be partial.",
    "If the monthly return on the corpus is at least the withdrawal, the corpus does not run out at that assumed return.",
  ],
};
