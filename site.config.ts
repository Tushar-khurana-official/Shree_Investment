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
    name: "Shree Investments",
    shortName: "Shree Investments", // short name used in the logo and compact spaces
    tagline: "Smart investments. Strong growth. Secure future.", // from the visiting card
    /** Closing line used on the motto band, from the visiting card. */
    motto: "One vision, infinite growth",
    description:
      "Shree Investments helps families in Jodhpur invest in the stock market, mutual funds and real estate, with honest guidance and a plan they can follow.",
    /** City shown in copy. */
    city: "Jodhpur",
    foundedYear: 2010, // TODO: year the practice started
    logo: "/images/logo-emblem.webp", // emblem from the visiting card (TODO: replace with the original artwork for sharper rendering)
    favicon: "/favicon.png", // browser-tab icon, cut from the emblem
  },

  // ---------------------------------------------------------------------------
  // Founder / principal distributor
  // ---------------------------------------------------------------------------
  founder: {
    name: "Manish Purohit",
    /**
     * TODO (compliance): the visiting card says "Investment Advisor". In India that title is reserved for
     * SEBI-registered Investment Advisers (RIA). Use it only with a SEBI RIA registration; otherwise use a
     * title that matches the registrations held, e.g. "Mutual Fund Distributor".
     */
    title: "Founder, Shree Investments",
    photo: "/images/founder-placeholder.svg", // TODO: square photo, at least 800x800
    photoAlt: "Portrait of the founder (placeholder image)", // TODO
    yearsExperience: 15, // TODO: verify
    qualifications: [
      { short: "NISM Series V-A", full: "NISM Series V-A: Mutual Fund Distributors Certification" }, // TODO: confirm
      { short: "NISM Series VIII", full: "NISM Series VIII: Equity Derivatives Certification" }, // TODO: confirm, or remove
    ] satisfies readonly Qualification[],
    degree: { short: "[Degree]", full: "[Degree], [University]" }, // TODO
    /** Placeholder bio. Each string is a paragraph. */
    bio: [
      "TODO (placeholder bio): Manish Purohit started Shree Investments in Jodhpur in [year] to give local families one trusted person for the stock market, mutual funds and real estate, instead of three different salespeople.",
      "The approach is simple: understand the goal first, explain the risk honestly, and choose investments that the family can stay with through good years and bad ones.",
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
    insurance: null as { label: string; number: string; validTill: string; insurer: string } | null,
    /** Stock market services are offered as an Authorised Person (AP) of a SEBI-registered stock broker. */
    stockBroking: {
      broker: "[SEBI-registered stock broker name]", // TODO
      brokerSebiReg: "[INZ000000000]", // TODO: the broker's SEBI registration number
      apCode: "[Authorised Person registration no. (NSE / BSE)]", // TODO
    },
    /** Real estate advisory requires agent registration with RERA Rajasthan. */
    rera: {
      number: "[RERA Rajasthan agent registration no.]", // TODO
    },
    /** Transaction platform used for orders, e.g. BSE StAR MF, NSE NMF II, MFU or an AMC-agnostic platform. */
    transactionPlatform: "[Registered transaction platform, e.g. BSE StAR MF / NSE NMF II / MF Utility]", // TODO
  },

  // ---------------------------------------------------------------------------
  // Contact
  // ---------------------------------------------------------------------------
  contact: {
    phone: "+91 98299 47444",
    phoneHref: "+919829947444",
    /** Second number from the visiting card. */
    phoneAlt: "+91 93146 47444",
    phoneAltHref: "+919314647444",
    whatsapp: "919829947444", // TODO: confirm this number is on WhatsApp
    whatsappMessage: "Hello Shree Investments, I would like to talk about my investments.",
    email: "Manish.p2001us@gmail.com", // TODO: consider a domain email (e.g. manish@shreeinvestments.in) for trust
    address: {
      line1: "13 Mahaveerpuram City",
      line2: "Near Chopasni School, Chopasni",
      city: "Jodhpur",
      state: "Rajasthan",
      pincode: "", // TODO: add the PIN code
    },
    hours: [
      { days: "Monday to Friday", time: "10:00 am to 6:30 pm" }, // TODO
      { days: "Saturday", time: "10:00 am to 1:30 pm" }, // TODO
      { days: "Sunday and public holidays", time: "Closed" },
    ],
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=13+Mahaveerpuram+City+Chopasni+Jodhpur", // TODO: replace with the office's Google Maps share link
  },

  // ---------------------------------------------------------------------------
  // Grievance redressal (shown in the footer and legal pages)
  // ---------------------------------------------------------------------------
  grievance: {
    officerName: "Manish Purohit", // TODO: confirm
    email: "Manish.p2001us@gmail.com", // TODO: confirm
    phone: "+91 98299 47444", // TODO: confirm
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
  // Motion
  // ---------------------------------------------------------------------------
  motion: {
    /**
     * Animated page background (drifting glows and the constellation canvas). Set to false to turn it off
     * site-wide: the glows stay still and no canvas is drawn. Visitors with "reduce motion" switched on
     * always get a still background, whatever this says.
     */
    animatedBackground: true,
  },

  // ---------------------------------------------------------------------------
  // Launch switches
  // ---------------------------------------------------------------------------
  launch: {
    /** Shows a thin "preview: placeholder content" ribbon on every page. Set to false at launch. */
    showPlaceholderRibbon: false,
    /** Allow search engines to index the site. Keep false until all TODOs are cleared. */
    allowIndexing: false, // TODO: true at launch
  },
} as const;

export type SiteConfig = typeof site;

/** Fully formatted single-line office address. */
export function formattedAddress(): string {
  const a = site.contact.address;
  return `${a.line1}, ${a.line2}, ${a.city}, ${a.state}${a.pincode ? ` ${a.pincode}` : ""}`;
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

/**
 * True when a config value is still a placeholder: empty, bracketed ("[City]"), containing TODO,
 * or an all-zero registration number ("ARN-000000", "E000000").
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value || !value.trim()) return true;
  const v = value.trim();
  return /^\[.*\]$/.test(v) || /TODO/i.test(v) || /^(ARN-)?E?0+$/i.test(v);
}

/** " (ARN-123456)" when the ARN is set, otherwise "", for use inside sentences. */
export function arnInParens(): string {
  return isPlaceholder(site.registration.arn) ? "" : ` (${site.registration.arn})`;
}

/**
 * Whether unfinished placeholders are shown as visible TODO markers.
 * On in development; off in production builds, where unset values are hidden instead.
 * NEXT_PUBLIC_SHOW_PLACEHOLDERS=true forces markers on (used by the end-to-end tests).
 */
export const showTodos =
  process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS === "true";

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com").replace(/\/$/, "");
}
