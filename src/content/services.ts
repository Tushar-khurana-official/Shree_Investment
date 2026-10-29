export type ServiceArea = {
  id: "stock-market" | "mutual-funds" | "real-estate";
  number: string;
  title: string;
  /** Icon shown on the card, drawn in gold as on the visiting card. */
  icon: "chart" | "sprout" | "building";
  short: string;
  /** Sub-services exactly as listed on the visiting card. */
  highlights: string[];
  intro: string;
  items: { title: string; description: string }[];
  /** Risk statement that must sit with this service wherever it is described. */
  riskNote: string;
};

/**
 * SEBI requires stock brokers and their Authorised Persons to show this F&O risk disclosure.
 * TODO (compliance): confirm the current wording with your broker before launch.
 */
export const FNO_RISK_NOTE =
  "9 out of 10 individual traders in the equity futures and options segment incurred net losses (SEBI study). Derivatives can lose more than you put in; trade them only if you understand the risk.";

export const services: ServiceArea[] = [
  {
    id: "stock-market",
    number: "01",
    title: "Stock Market Investments",
    icon: "chart",
    short: "Demat and trading accounts, long-term equity investing, IPO applications and derivatives, with honest guidance on risk.",
    highlights: ["Equity trading", "Long-term investments", "Derivatives", "IPO investments"],
    intro:
      "Buying shares makes you a part-owner of a company. Over long periods, good businesses have rewarded patient investors, but share prices can fall sharply in between. We help you invest through a SEBI-registered stock broker, with a clear view of the risks.",
    items: [
      { title: "Demat and trading account", description: "Account opening with KYC, done with you, so you can hold shares in your own name." },
      { title: "Long-term investments", description: "Building a portfolio of quality companies for goals that are years away, not weeks." },
      { title: "Equity trading", description: "Placing buy and sell orders on NSE and BSE, with clear contract notes and statements." },
      { title: "IPO investments", description: "Help applying for IPOs through UPI or ASBA, and understanding the offer document first." },
      { title: "Derivatives (F&O)", description: "Futures and options for those who understand them, mainly for hedging rather than speculation." },
      { title: "Portfolio reviews", description: "Regular reviews of your holdings, concentration and risk, not just tips." },
    ],
    riskNote:
      "Investments in the securities market are subject to market risks; read all related documents carefully before investing. " +
      FNO_RISK_NOTE,
  },
  {
    id: "mutual-funds",
    number: "02",
    title: "Mutual Funds Investments",
    icon: "sprout",
    short: "SIPs, lump sum investments and bond funds chosen for your goals, with a written plan and regular reviews.",
    highlights: ["SIP", "Lump sum", "Bonds", "Wealth creation solutions"],
    intro:
      "A mutual fund pools money from many investors and invests it in shares, bonds or both, managed by a SEBI-registered fund house. We help you choose, set up and look after the funds in your plan.",
    items: [
      { title: "SIP", description: "Systematic investment plans: a fixed amount every month, set up, stepped up and reviewed with you." },
      { title: "Lump sum", description: "Investing a bonus, inheritance or sale proceeds, in one go or staggered through an STP." },
      { title: "Bonds and debt funds", description: "Fixed-income options for money that needs stability and a known date." },
      { title: "Wealth creation solutions", description: "Goal-based plans for retirement, children's education and the first crore." },
      { title: "Scheme selection", description: "Specific schemes for each goal, with the reason for each and what would make us change it." },
      { title: "Portfolio monitoring", description: "Allocation and scheme changes tracked between reviews, so nothing drifts unnoticed." },
    ],
    riskNote: "Mutual fund investments are subject to market risks, read all scheme related documents carefully.",
  },
  {
    id: "real-estate",
    number: "03",
    title: "Real Estate Advisory",
    icon: "building",
    short: "Residential, commercial and plot investments in and around Jodhpur, with location checks and paperwork guidance.",
    highlights: ["Residential", "Commercial", "Plots", "Property investment guidance"],
    intro:
      "Property can be a sound long-term asset, but it is large, illiquid and paperwork-heavy. We help you compare options, check the basics before you commit, and fit property sensibly into the rest of your wealth.",
    items: [
      { title: "Residential", description: "Flats, villas and independent houses for living in or for rental income." },
      { title: "Commercial", description: "Shops and office space, compared on location, rental yield and resale." },
      { title: "Plots", description: "Land and plots, with checks on title, approvals and the developer's track record." },
      { title: "Property investment guidance", description: "How much property makes sense for you, alongside your equity and mutual fund holdings." },
      { title: "Due diligence", description: "RERA registration, approvals and documents checked before you pay a token amount." },
    ],
    riskNote:
      "Real estate is illiquid and is not regulated by SEBI. Check the RERA registration of every project and get documents verified by a lawyer before paying.",
  },
];

/** The four values from the visiting card. */
export const values = [
  { title: "Trust & Transparency", body: "You see what you invest in, what it costs and what we earn. No hidden charges, no pressure.", icon: "shield" },
  { title: "Expert Guidance", body: "Advice grounded in research and experience across shares, mutual funds and property.", icon: "chart" },
  { title: "Wealth Creation", body: "Disciplined, long-term investing that compounds, rather than chasing quick returns.", icon: "sprout" },
  { title: "Secure Future", body: "Plans built around your family's goals, with risk kept to what you can live with.", icon: "lock" },
] as const;
