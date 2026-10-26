/** Plain-language education. TODO: have the tax section reviewed each Budget; tax rules change. */
export type ExplainedSection = { id: string; title: string; paragraphs: string[] };

export const explainedSections: ExplainedSection[] = [
  {
    id: "what-is-a-mutual-fund",
    title: "What is a mutual fund?",
    paragraphs: [
      "A mutual fund pools money from many investors and invests it in shares, bonds or other securities, according to a stated objective. A professional fund manager makes the day-to-day decisions.",
      "Each investor owns units. The value of one unit is the NAV (net asset value), published every business day. If the investments rise in value, so does the NAV.",
      "Mutual funds in India are run by AMCs (asset management companies, or fund houses) and regulated by SEBI, the Securities and Exchange Board of India. Your units are held in your own name, and your money goes to the fund house, not to the distributor.",
    ],
  },
  {
    id: "sip-vs-lumpsum",
    title: "SIP or lumpsum?",
    paragraphs: [
      "A SIP (systematic investment plan) invests a fixed amount every month, usually by auto-debit. A lumpsum invests a larger amount at once.",
      "SIPs suit monthly income and build a habit. Because the same amount buys more units when prices are low and fewer when they are high, they also smooth out the price you pay over time, which is called rupee cost averaging.",
      "If you already have a large sum, investing it at once has historically done better more often than not, but it feels worse if markets fall soon after. A middle path is an STP (systematic transfer plan): park the money in a liquid or debt fund and move it into equity in monthly instalments.",
    ],
  },
  {
    id: "asset-allocation",
    title: "Asset allocation",
    paragraphs: [
      "Asset allocation is how your money is split between equity (shares), debt (bonds and deposits), and sometimes gold. It matters more to your results than which individual scheme you pick.",
      "The split should follow the goal's date. Money needed in ten or more years can carry more equity; money needed in under three years should carry little or none.",
      "Over time, market moves change your split. Rebalancing means moving it back to the agreed mix, typically when it drifts past a band agreed in advance, rather than in reaction to news.",
    ],
  },
  {
    id: "risk-and-return",
    title: "Risk and return",
    paragraphs: [
      "Higher expected return comes with larger and more frequent falls along the way. Equity funds can fall 30% or more in a bad year; liquid funds rarely move much at all.",
      "Every scheme carries a riskometer, a SEBI-mandated label with six levels from Low to Very High. It describes the scheme's portfolio, not whether it suits you.",
      "The useful question is not \"How much can I earn?\" but \"How much of a fall can this money live through before I need it?\"",
    ],
  },
  {
    id: "direct-vs-regular",
    title: "Direct and regular plans",
    paragraphs: [
      "Every scheme has two plans with the same portfolio. A direct plan is bought straight from the fund house. A regular plan is bought through a distributor like us.",
      "Regular plans have a higher expense ratio, because they include the trail commission the fund house pays the distributor. Over long periods, that difference compounds.",
      "Investing through a distributor makes sense if the planning, paperwork, behaviour coaching and reviews are worth that difference to you. If you would rather do it yourself, direct plans are a good option, and we will tell you so.",
    ],
  },
  {
    id: "exit-loads",
    title: "Exit loads",
    paragraphs: [
      "An exit load is a charge for redeeming units before a set period, for example 1% if you redeem within a year. It discourages short-term trading in funds meant for longer horizons.",
      "Exit loads differ by scheme and are listed in the scheme documents and the factsheet. ELSS funds have no exit load but carry a three-year lock-in instead.",
    ],
  },
  {
    id: "taxation",
    title: "Taxation basics",
    paragraphs: [
      "Gains are taxed when you redeem (sell) units, not while you hold them. The rate depends on the type of fund and how long you held the units.",
      "For equity-oriented funds, gains on units held for more than 12 months are long-term capital gains, and gains held for 12 months or less are short-term, each taxed at its own rate, with an annual exemption on long-term gains.",
      "For most debt funds bought on or after 1 April 2023, gains are added to your income and taxed at your slab rate, whatever the holding period. Every SIP instalment is a separate purchase with its own holding period.",
      "Tax rules change with Finance Acts. Check the current rates with a tax professional before acting. TODO: verify this section against the current Finance Act before launch.",
    ],
  },
  {
    id: "kyc",
    title: "KYC",
    paragraphs: [
      "KYC (Know Your Customer) is a one-time identity and address verification required before your first mutual fund investment. You need your PAN, an address proof such as Aadhaar, and a photograph or selfie.",
      "Once registered with a KRA (KYC registration agency), your KYC works across all fund houses. You can check your status on a KRA website with your PAN.",
    ],
  },
  {
    id: "factsheet",
    title: "How to read a factsheet",
    paragraphs: [
      "Every fund house publishes a monthly factsheet for each scheme. Look first at the objective, the benchmark, and the riskometer, to check the scheme does what you need.",
      "Then the portfolio: top holdings, sector or credit-rating split, and for debt funds the average maturity and modified duration, which show how sensitive the fund is to interest-rate changes.",
      "Then costs and terms: the expense ratio for the plan you hold, and the exit load. Returns come last, compared with the benchmark over the same periods, and always with the reminder that past performance is not indicative of future returns.",
    ],
  },
];

export const categoryTable: { category: string; invests: string; typicalRisk: string; horizon: string }[] = [
  { category: "Liquid / Overnight", invests: "Very short-term money-market instruments", typicalRisk: "Low to Low to Moderate", horizon: "Days to a few months" },
  { category: "Short Duration debt", invests: "Bonds maturing in roughly 1 to 3 years", typicalRisk: "Low to Moderate to Moderate", horizon: "1 to 3 years" },
  { category: "Corporate Bond / Gilt", invests: "High-rated corporate bonds / government securities", typicalRisk: "Moderate", horizon: "3 years and more" },
  { category: "Arbitrage", invests: "Price gaps between cash and futures markets", typicalRisk: "Low", horizon: "3 months to 1 year" },
  { category: "Balanced Advantage", invests: "Equity and debt mix that shifts with valuations", typicalRisk: "Moderately High to Very High", horizon: "3 to 5 years" },
  { category: "Aggressive Hybrid", invests: "65% to 80% equity, the rest debt", typicalRisk: "Very High", horizon: "5 years and more" },
  { category: "Large Cap / Index", invests: "India's 100 largest companies, or an index", typicalRisk: "Very High", horizon: "5 to 7 years and more" },
  { category: "Flexi Cap / ELSS", invests: "Companies of any size; ELSS has a 3-year lock-in", typicalRisk: "Very High", horizon: "7 years and more" },
  { category: "Mid Cap / Small Cap", invests: "Medium-sized and smaller companies", typicalRisk: "Very High", horizon: "7 to 10 years and more" },
];

export const explainedFaq = [
  { q: "Is my money safe with a mutual fund distributor?", a: "Your money goes directly from your bank account to the fund house, and units are held in your own name. A distributor never holds your money." },
  { q: "What is the minimum SIP amount?", a: "Many schemes accept SIPs from ₹500 or ₹1,000 a month. The minimum is stated in each scheme's documents." },
  { q: "Can I stop a SIP?", a: "Yes. SIPs can be paused or stopped at any time. Units already bought stay invested until you redeem them, subject to any exit load or lock-in." },
  { q: "Are mutual fund returns guaranteed?", a: "No. Mutual fund investments are subject to market risks and returns can be negative. Past performance is not indicative of future returns." },
];
