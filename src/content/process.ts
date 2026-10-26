export type ProcessStep = {
  number: string;
  title: string;
  timeline: string;
  summary: string;
  detail: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Understand your goals",
    timeline: "45 minutes",
    summary: "A conversation about your income, obligations and worries. No product is named in this meeting.",
    detail: [
      "We map your income, EMIs, dependants, existing investments and insurance, and the things that keep you up at night.",
      "We write down each goal with a date and a rough rupee amount, and ask how you behaved the last time markets fell.",
      "No product is named in this meeting. The point is to understand the problem before anyone talks about solutions.",
    ],
  },
  {
    number: "02",
    title: "Build your strategy",
    timeline: "5 working days",
    summary: "A written plan: goals, dates, rupee amounts, the monthly figure, and the specific schemes with the reason for each.",
    detail: [
      "You receive a written plan listing each goal, its date and its rupee amount in future value terms.",
      "It shows the monthly figure needed, the asset allocation for each goal, and the specific schemes with the reason each was chosen.",
      "It also states what we earn on each recommendation, so you can weigh that before you invest.",
    ],
  },
  {
    number: "03",
    title: "Invest and monitor",
    timeline: "2 working days",
    summary: "KYC, folios and mandates set up through a registered platform. SIPs start on the date you pick.",
    detail: [
      "We complete KYC if needed, create folios in your name, and register your bank mandate through the registered transaction platform.",
      "SIPs start on the date you pick, usually a few days after salary credit.",
      "Your units are held in your own name with the fund house. Money moves from your bank account directly to the fund house; it never sits with us.",
    ],
  },
  {
    number: "04",
    title: "Review and refine",
    timeline: "Every 6 months",
    summary: "Reviews that change something: rebalance if allocation drifts past the agreed band, step up SIPs after a raise, leave the rest alone.",
    detail: [
      "We rebalance if your allocation drifts past the band agreed in the plan, not because of a headline.",
      "We step up SIPs after a salary rise and update goals when your life changes.",
      "And we leave the rest alone. Most of the value is in the fourth step.",
    ],
  },
];

export const whyUs = [
  { title: "Personalized guidance", body: "Your plan is built from your cash flows and goals, not from a model portfolio handed to everyone." },
  { title: "Goal-oriented investing", body: "Every rupee is tied to a goal with a date, so each fund has a job and a reason to be there." },
  { title: "Transparent communication", body: "You see what we earn before you invest, and we explain what we recommend in plain language." },
  { title: "Regular portfolio reviews", body: "Reviews on a fixed calendar, with a written note of what changed and why." },
  { title: "Long-term relationship", body: "The person who wrote your plan is the person who answers your call, years later." },
  { title: "Investor education", body: "We explain the why behind each decision, so you can hold your nerve when markets wobble." },
];

export const whyUsDetail = [
  { title: "A plan you can hold us to", body: "Goals, dates, amounts and schemes in writing, so you can check our advice against what actually happens." },
  { title: "You see what we earn", body: "Trail commission on each scheme is disclosed before you invest. There are no hidden fees." },
  { title: "The person who wrote it answers", body: "No call-centre hand-offs. The person who built your plan reviews it and picks up the phone." },
  { title: "Reviews that change something", body: "Rebalancing, SIP step-ups and goal updates when they are needed, and patience when they are not." },
];
