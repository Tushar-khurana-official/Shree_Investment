export type ServiceArea = {
  id: "mutual-funds" | "insurance" | "fd-bonds";
  number: string;
  title: string;
  short: string;
  intro: string;
  items: { title: string; description: string }[];
};

export const INSURANCE_STATEMENT = "Insurance is not an investment, and we will not sell it as one.";

export const services: ServiceArea[] = [
  {
    id: "mutual-funds",
    number: "01",
    title: "Mutual Funds",
    short: "From your first SIP to a portfolio you understand: scheme selection with a reason for each fund, and monitoring that goes beyond a yearly statement.",
    intro:
      "A mutual fund pools money from many investors and invests it in shares, bonds or both, managed by a SEBI-registered fund house. We help you choose, set up and look after the funds in your plan.",
    items: [
      { title: "Investor onboarding", description: "KYC, bank mandate and folio creation, done with you, in your own name." },
      { title: "Investor profiling", description: "Your goals, time horizons, cash-flow needs and how you react when markets fall, written down." },
      { title: "Scheme selection", description: "Specific schemes for each goal, with the reason for each and what would make us change it." },
      { title: "SIP services", description: "Setting up, pausing, stepping up and reviewing systematic investment plans." },
      { title: "Lumpsum investments", description: "Deploying a bonus, inheritance or sale proceeds, in one go or staggered through an STP (systematic transfer plan)." },
      { title: "Transaction execution", description: "Purchases, switches and redemptions placed through a registered transaction platform." },
      { title: "Portfolio monitoring", description: "Allocation, overlap and scheme changes tracked between reviews, so nothing drifts unnoticed." },
    ],
  },
  {
    id: "insurance",
    number: "02",
    title: "Insurance",
    short: "Term cover and health insurance sized to what your family would actually need. Insurance is not an investment, and we will not sell it as one.",
    intro:
      "Insurance protects the plan: it replaces income if you die early and pays hospital bills that would otherwise be paid from your investments. It is distributed under a separate IRDAI registration, and it is never presented to you as an investment.",
    items: [
      { title: "Protection planning", description: "How much term cover and health cover you need, worked out from your liabilities and dependants." },
      { title: "Policy servicing", description: "Nominee updates, address changes and policy documents kept in order." },
      { title: "Claims assistance", description: "Help with paperwork and follow-up when you or your family need to claim." },
      { title: "Renewals", description: "Reminders before premiums are due, so cover does not lapse by accident." },
      { title: "Periodic cover reviews", description: "Cover rechecked after a marriage, a child, a home loan or a change of job." },
    ],
  },
  {
    id: "fd-bonds",
    number: "03",
    title: "Fixed Deposits & Bonds",
    short: "Fixed-income options compared on rate, safety, liquidity and tax, for money that needs a known value on a known date.",
    intro:
      "Corporate fixed deposits and bonds pay a stated interest rate for a fixed term. They suit money with a near date and a low tolerance for ups and downs, but they carry credit risk, so the issuer matters as much as the rate.",
    items: [
      { title: "Comparing opportunities", description: "Rates, credit ratings, tenure and payout options, side by side." },
      { title: "Selecting against requirements", description: "Matching maturity dates and interest payouts to when you actually need the money." },
      { title: "Completing the transaction", description: "Applications and documentation handled with you." },
      { title: "Managing the fixed-income portfolio", description: "Maturity calendar, renewals and reinvestment decisions tracked for you." },
    ],
  },
];
