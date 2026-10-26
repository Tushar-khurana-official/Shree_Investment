/** Calculator metadata used by navigation, the Tools hub, sitemap and per-page SEO. */
export type CalculatorMeta = {
  slug: "sip" | "lumpsum" | "goal" | "retirement" | "education" | "crorepati" | "swp";
  name: string;
  navLabel: string;
  title: string;
  description: string;
  question: string;
};

export const calculators: CalculatorMeta[] = [
  {
    slug: "sip",
    name: "SIP calculator",
    navLabel: "SIP calculator",
    title: "SIP calculator: what a monthly SIP could grow to",
    description:
      "Estimate the future value of a monthly SIP (systematic investment plan) in rupees, and see the year illustrative returns overtake the amount you invested.",
    question: "What could a monthly SIP grow to?",
  },
  {
    slug: "lumpsum",
    name: "Lumpsum calculator",
    navLabel: "Lumpsum calculator",
    title: "Lumpsum calculator: growth of a one-time investment",
    description: "See how a one-time mutual fund investment could compound over time at an assumed annual return.",
    question: "What could a one-time investment grow to?",
  },
  {
    slug: "goal",
    name: "Goal planner",
    navLabel: "Goal planner (any goal)",
    title: "Goal planner: the monthly SIP for any target",
    description: "Work backwards from a rupee target and a date to the monthly SIP that could get you there.",
    question: "How much a month for a target amount?",
  },
  {
    slug: "retirement",
    name: "Retirement calculator",
    navLabel: "Retirement calculator",
    title: "Retirement calculator: corpus and monthly SIP needed",
    description:
      "Inflate today's expenses to your retirement year, size the corpus to last through retirement, and find the monthly SIP to build it.",
    question: "How big a corpus to retire, and what SIP builds it?",
  },
  {
    slug: "education",
    name: "Child education calculator",
    navLabel: "Child education calculator",
    title: "Child education calculator: the fee in the year they enrol",
    description: "Project today's course fee to the enrolment year with education inflation, and the monthly SIP to fund it.",
    question: "What will the course cost, and how do we fund it?",
  },
  {
    slug: "crorepati",
    name: "Crorepati calculator",
    navLabel: "Build the first crore",
    title: "Crorepati calculator: when could you reach ₹1 crore?",
    description: "Combine current savings and a monthly SIP to estimate the year a target such as ₹1 crore could be reached.",
    question: "When could I reach my first crore?",
  },
  {
    slug: "swp",
    name: "SWP calculator",
    navLabel: "SWP (withdrawal) calculator",
    title: "SWP calculator: how long a corpus lasts",
    description:
      "Estimate how long a corpus lasts with a fixed monthly withdrawal (systematic withdrawal plan) at an assumed return.",
    question: "How long will my corpus last?",
  },
];

export function getCalculator(slug: string) {
  return calculators.find((c) => c.slug === slug);
}
