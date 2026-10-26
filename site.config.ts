/**
 * site.config.ts — the ONE file to edit to make this site serve a different distributor.
 *
 * Every value marked `TODO` is placeholder data. Replace and verify each one before launch.
 * Run `npm run placeholders` to list every remaining TODO in the project.
 *
 * Rules:
 *  - Registration details (ARN, EUIN, dates) must match the AMFI ARN card exactly.
 *  - Stats must be verifiable from your own records. Leave `stats.verified` false until they are;
 *    while false, the site labels the figures as placeholders.
 *  - Only list fund houses you are actually empanelled with.
 */

export type Qualification = {
  /** Short label shown in the trust bar, e.g. "NISM Series V-A". */
  short: string;
  /** Full name shown on the About page. */
  full: string;
};

export type FundHouse = {
  name: string;
  /** Optional path under /public to a logo you have permission to use. Without one, a text wordmark is shown. */
  logo?: string;
};

export type Stat = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  /** Decimal places shown during and after the count-up. */
  decimals?: number;
};

export const site = {
  // ---------------------------------------------------------------------------
  // Firm
  // ---------------------------------------------------------------------------
  firm: {
    name: "Meridian Family Wealth", // TODO: legal / trading name of the firm
    shortName: "Meridian", // TODO: short name used in the logo and compact spaces
    tagline: "Unhurried financial planning for Indian families", // TODO
    description:
      "An AMFI-registered mutual fund distributor helping families plan for retirement, education and the big purchases in between, with a written plan and reviews that change something.", // TODO
    /** City shown in copy, e.g. "Pune". */
    city: "[City]", // TODO
    foundedYear: 2010, // TODO
    logo: "/images/logo.svg", // TODO: replace with the firm's logo (SVG preferred)
  },

  // ---------------------------------------------------------------------------
  // Founder / principal distributor
  // ---------------------------------------------------------------------------
  founder: {
    name: "[Founder Name]", // TODO
    title: "Founder & Principal Distributor", // TODO
    photo: "/images/founder-placeholder.svg", // TODO: square photo, at least 800x800
    photoAlt: "Portrait of the founder (placeholder image)", // TODO
    yearsExperience: 15, // TODO: verify
    qualifications: [
      { short: "NISM Series V-A", full: "NISM Series V-A: Mutual Fund Distributors Certification" },
      { short: "CFP", full: "CERTIFIED FINANCIAL PLANNER (FPSB India)" }, // TODO: remove if not held
      { short: "IRDAI licensed", full: "IRDAI-licensed insurance agent / point of sale person" }, // TODO: remove if not held
    ] satisfies readonly Qualification[],
    degree: { short: "MBA (Finance)", full: "MBA in Finance, [University]" }, // TODO
    /** Placeholder bio. Each string is a paragraph. */
    bio: [
      "TODO (placeholder bio): [Founder Name] started the practice in [year] after [number] years in [previous career], with a simple idea: most families do not need more products, they need a plan they understand and someone who will still answer the phone in ten years.",
      "The approach is deliberately unhurried. The first conversation is about income, obligations and worries, not schemes. Plans are written down, reviewed on a fixed calendar and changed only when there is a reason.",
    ],
    /** Placeholder quote. Shown with a visible "placeholder" label until replaced and `quoteVerified` is set to true. */
    quote: "The best plan is the one you can actually keep.", // TODO: confirm wording with the founder
    quoteVerified: false, // TODO: set to true once the founder has approved the quote
  },

  // ---------------------------------------------------------------------------
  // Registration (must match the AMFI ARN card)
  // ---------------------------------------------------------------------------
  registration: {
    arn: "ARN-000000", // TODO
    euin: "E000000", // TODO
    amfiRegistrationDate: "[DD Mon YYYY]", // TODO
    validTill: "[DD Mon YYYY]", // TODO
    /** Insurance is distributed under a separate registration. Set to null if you do not distribute insurance. */
    insurance: {
      label: "IRDAI registration", // TODO
      number: "[IRDAI licence / registration no.]", // TODO
      validTill: "[DD Mon YYYY]", // TODO
      insurer: "[Insurer or corporate agent / broker name]", // TODO
    } as { label: string; number: string; validTill: string; insurer: string } | null,
    /** Transaction platform used for orders, e.g. BSE StAR MF, NSE NMF II, MFU or an AMC-agnostic platform. */
    transactionPlatform: "[Registered transaction platform, e.g. BSE StAR MF / NSE NMF II / MF Utility]", // TODO
  },

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------
  contact: {
    phone: "+91 90000 00000", // TODO: display format
    phoneHref: "+919000000000", // TODO: E.164 format for tel: links
    whatsapp: "919000000000", // TODO: country code + number, digits only (used for wa.me links)
    whatsappMessage: "Hello, I would like to talk about my investments.",
    email: "hello@example.com", // TODO
    address: {
      line1: "[Office no., Building]", // TODO
      line2: "[Street, Area]", // TODO
      city: "[City]", // TODO
      state: "[State]", // TODO
      pincode: "[000000]", // TODO
    },
    hours: [
      { days: "Monday to Friday", time: "10:00 am to 6:30 pm" }, // TODO
      { days: "Saturday", time: "10:00 am to 1:30 pm" }, // TODO
      { days: "Sunday and public holidays", time: "Closed" },
    ],
    mapsUrl: "https://maps.google.com/?q=TODO", // TODO: Google Maps share link for the office
  },

  // ---------------------------------------------------------------------------
  // Grievance redressal (shown in the footer and legal pages)
  // ---------------------------------------------------------------------------
  grievance: {
    officerName: "[Grievance Officer Name]", // TODO
    email: "grievance@example.com", // TODO
    phone: "+91 90000 00000", // TODO
    responseDays: 7, // TODO: confirm the turnaround you commit to
  },

  // ---------------------------------------------------------------------------
  // External links
  // ---------------------------------------------------------------------------
  links: {
    clientLogin: "https://clients.example.com", // TODO: client portal URL
    androidApp: "https://play.google.com/store/apps/details?id=TODO", // TODO
    iosApp: "https://apps.apple.com/in/app/TODO", // TODO
    kycCheck: "https://www.cvlkra.com/", // TODO: confirm the current CVL KRA KYC status inquiry URL
    kycStart: "https://example.com/start-kyc", // TODO: your platform's eKYC onboarding link
    amfi: "https://www.amfiindia.com/",
    amfiDistributorSearch: "https://www.amfiindia.com/locate-distributor",
    sebiScores: "https://scores.sebi.gov.in/",
    smartOdr: "https://smartodr.in/",
  },

  social: [
    { name: "LinkedIn", url: "https://www.linkedin.com/company/TODO" }, // TODO
    { name: "YouTube", url: "https://www.youtube.com/@TODO" }, // TODO
    { name: "Instagram", url: "https://www.instagram.com/TODO" }, // TODO
  ],

  // ---------------------------------------------------------------------------
  // Empanelled fund houses (AMCs). Each must appear once. TODO: replace with your actual empanelments.
  // Do not use AMC logos without permission; text wordmarks are shown when `logo` is omitted.
  // ---------------------------------------------------------------------------
  fundHouses: [
    { name: "Aditya Birla Sun Life Mutual Fund" },
    { name: "Axis Mutual Fund" },
    { name: "DSP Mutual Fund" },
    { name: "HDFC Mutual Fund" },
    { name: "ICICI Prudential Mutual Fund" },
    { name: "Kotak Mahindra Mutual Fund" },
    { name: "Mirae Asset Mutual Fund" },
    { name: "Nippon India Mutual Fund" },
    { name: "Parag Parikh Mutual Fund" },
    { name: "SBI Mutual Fund" },
    { name: "Tata Mutual Fund" },
    { name: "UTI Mutual Fund" },
  ] satisfies readonly FundHouse[],

  // ---------------------------------------------------------------------------
  // Stats (home page). TODO: all placeholders. Must be verified before launch.
  // ---------------------------------------------------------------------------
  stats: {
    verified: false, // TODO: set to true only once every figure below is verified from records
    items: [
      { label: "Years of experience", value: 15, suffix: "+" }, // TODO
      { label: "Families served", value: 500, suffix: "+" }, // TODO
      { label: "Assets guided", value: 120, prefix: "₹", suffix: " Cr+" }, // TODO
    ] satisfies readonly Stat[],
  },

  // ---------------------------------------------------------------------------
  // Launch switches
  // ---------------------------------------------------------------------------
  launch: {
    /** Shows a thin "preview: placeholder content" ribbon on every page. Set to false at launch. */
    showPlaceholderRibbon: true, // TODO: false at launch
    /** Allow search engines to index the site. Keep false until all TODOs are cleared. */
    allowIndexing: false, // TODO: true at launch
  },
} as const;

export type SiteConfig = typeof site;

/** Fully formatted single-line office address. */
export function formattedAddress(): string {
  const a = site.contact.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state} ${a.pincode}`;
}

/** Fund houses with duplicate names removed (case-insensitive), preserving order. */
export function uniqueFundHouses(): readonly FundHouse[] {
  const seen = new Set<string>();
  return site.fundHouses.filter((f) => {
    const key = f.name.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function whatsappHref(message: string = site.contact.whatsappMessage): string {
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, "");
}
