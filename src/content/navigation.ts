import { calculators } from "./calculators";

export type NavLink = { label: string; href: string; description?: string };
export type NavGroup = { label: string; href?: string; children?: NavLink[] };

export const mainNav: NavGroup[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    children: [
      { label: "Stock Market", href: "/services#stock-market", description: "Equity, long-term investing, IPOs, derivatives" },
      { label: "Mutual Funds", href: "/services#mutual-funds", description: "SIP, lump sum, bonds, wealth creation" },
      { label: "Real Estate Advisory", href: "/services#real-estate", description: "Residential, commercial and plots" },
      { label: "How we work", href: "/approach", description: "Our four-step process" },
    ],
  },
  {
    label: "Tools",
    children: [
      ...calculators.map((c) => ({ label: c.navLabel, href: `/calculators/${c.slug}` })),
      { label: "All calculators", href: "/calculators" },
      { label: "MF Research", href: "/mf-research", description: "Search and filter schemes" },
    ],
  },
  {
    label: "Resources",
    children: [
      { label: "Insights / Blog", href: "/insights" },
      { label: "News", href: "/news" },
      { label: "Mutual Funds Explained", href: "/mutual-funds-explained" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/legal/privacy-policy" },
  { label: "Terms of Use", href: "/legal/terms-of-use" },
  { label: "Disclaimer", href: "/legal/disclaimer" },
  { label: "Commission Disclosure", href: "/legal/commission-disclosure" },
  { label: "Disclosures", href: "/legal/disclosures" },
];
