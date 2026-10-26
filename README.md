# Mutual Fund Distributor Website

A configurable marketing and client-engagement website for an AMFI-registered mutual fund distributor in India.
One codebase can serve any distributor: firm details, registration, contacts, fund houses and stats live in
[`site.config.ts`](./site.config.ts).

> **This build contains placeholder content.** Every item that needs real data, verified figures or legal review is
> marked `TODO` or shown in `[brackets]`. Run `npm run placeholders` to list them, and work through
> [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md) before going live.

| | |
|---|---|
| Framework | Next.js 15 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS v4, design tokens in `src/styles/tokens.{ts,css}`, light and dark modes |
| Fonts | Fraunces (display) and Inter (body), self-hosted through `next/font` |
| Content | TypeScript and JSON content files, MDX articles |
| Tests | Vitest (formulas, validation, contrast, compliance copy), Playwright + axe-core (end to end and accessibility) |

## Setup

```bash
cd mfd-website
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

Requires Node.js 20.9 or later.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` / `npm run typecheck` | ESLint and TypeScript |
| `npm test` | Unit tests (calculators, validation, contrast, compliance) |
| `npm run test:e2e` | Builds, starts the site and runs Playwright end-to-end and axe accessibility tests on every page, in light and dark mode |
| `npm run placeholders` | Lists every remaining TODO and placeholder |

For `test:e2e`, install the browser once with `npx playwright install chromium` if it is not already available.

## Environment variables

See [`.env.example`](./.env.example) for the full list.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL. Used for canonical links, the sitemap, Open Graph and JSON-LD. |
| `LEADS_STORE_PATH` | JSON Lines file where enquiries are stored (default `.data/leads.jsonl`). Must be on a persistent, private disk. |
| `LEADS_NOTIFY_PROVIDER` | `console` (development), `webhook` or `resend`. |
| `LEADS_NOTIFY_TO` / `LEADS_NOTIFY_FROM` | Notification recipient (defaults to the config email) and sender. |
| `RESEND_API_KEY` | API key when the provider is `resend`. |
| `LEADS_WEBHOOK_URL` | Endpoint when the provider is `webhook` (Zapier, Make, Slack, CRM). |
| `LEADS_RATE_LIMIT_MAX`, `LEADS_RATE_LIMIT_WINDOW_SECONDS` | Lead form rate limit per IP (default 5 per 10 minutes). |
| `NEXT_PUBLIC_ANALYTICS_SRC`, `NEXT_PUBLIC_ANALYTICS_DOMAIN` | Analytics script. Loaded only after the visitor clicks "Accept all". |
| `NEWS_FEED_URL`, `RESEARCH_API_URL` | Optional JSON feeds for News and MF Research. They use the same shape as the local files; the local files are the fallback. |

## How to change content

| What | Where |
|---|---|
| Firm, founder, registration, contacts, links, fund houses, stats, launch switches | `site.config.ts` |
| Colours, radii, typography tokens | `src/styles/tokens.ts` **and** `src/styles/tokens.css`; a unit test checks they match and that every button pair passes WCAG AA |
| Goals (home cards and contact dropdown) | `src/content/goals.ts` |
| Services | `src/content/services.ts` |
| Process steps, "Why us" | `src/content/process.ts` |
| Navigation | `src/content/navigation.ts` |
| Calculators (names, SEO copy, formula notes) | `src/content/calculators.ts`, `src/content/formulas.ts`; formulas in `src/lib/calculators.ts` |
| Mutual Funds Explained, category table, FAQ | `src/content/explained.ts` |
| Insights | Add an `.mdx` file in `src/content/insights/` and register it in `src/content/insights/index.ts` |
| News | `src/content/news.json`, or set `NEWS_FEED_URL` |
| MF Research data | `src/content/funds.json`, or set `RESEARCH_API_URL` |
| Legal pages | `src/content/legal.tsx` |
| Logo, founder photo, hero illustration | `public/images/` (paths are set in `site.config.ts`) |

To use the codebase for a different distributor, edit `site.config.ts`, replace the images, and review the content files above.

## Project structure

```
mfd-website/
├── site.config.ts                 # all firm-specific data (TODO placeholders)
├── LAUNCH-CHECKLIST.md            # compliance checklist and the full placeholder list
├── next.config.ts                 # MDX, security headers
├── mdx-components.tsx
├── playwright.config.ts · vitest.config.ts · eslint.config.mjs
├── public/images/                 # logo, founder placeholder, hero illustration
├── scripts/list-placeholders.mjs
├── src/
│   ├── app/
│   │   ├── layout.tsx             # fonts, theme script, header/footer, cookie banner, Organization JSON-LD
│   │   ├── globals.css            # Tailwind v4 theme mapped to tokens
│   │   ├── page.tsx               # Home
│   │   ├── about/ · services/ · approach/ · clients/
│   │   ├── calculators/page.tsx   # Tools hub
│   │   ├── calculators/[slug]/    # sip · lumpsum · goal · retirement · education · crorepati · swp
│   │   ├── mf-research/ · mutual-funds-explained/ · news/
│   │   ├── insights/ · insights/[slug]/
│   │   ├── contact/ · contact/thank-you/
│   │   ├── legal/[slug]/          # privacy-policy · terms-of-use · disclaimer · commission-disclosure · disclosures
│   │   ├── api/leads/route.ts     # validation, honeypot, rate limit, storage, notification
│   │   ├── sitemap.ts · robots.ts · opengraph-image.tsx · icon.svg · not-found.tsx
│   ├── components/
│   │   ├── ui/                    # Button, Card, Stat, Section, Eyebrow, Accordion, Tabs, Modal, Input, Select,
│   │   │                          # Slider, SegmentedControl, Stepper, Badge, ChartWrapper, LineChart, Toast,
│   │   │                          # CookieBanner, CountUp, FadeUp, PageHeader
│   │   ├── layout/                # Header, MobileNav, Footer, WhatsAppButton, SkipLink, ThemeToggle, Analytics
│   │   ├── sections/              # home and shared page sections
│   │   ├── calculators/           # one component per calculator + shared layout, comparison, CTA
│   │   ├── contact/ · research/ · insights/ · seo/
│   ├── content/                   # copy and data (goals, services, process, explained, legal, news, funds, insights)
│   ├── lib/                       # calculators, format, leads (schema/store/notify), rate-limit, seo, consent, handoff
│   └── styles/                    # tokens.ts, tokens.css
└── tests/
    ├── unit/                      # calculators, format, leads, contrast, compliance
    └── e2e/                       # contact flow, calculator handoff, navigation, cookie banner, axe on every page
```

## How key requirements are met

- **Calculators**: formulas are pure functions in `src/lib/calculators.ts` with unit tests. Every calculator has a slider and a synced numeric input, Indian number formatting (₹2,50,000 · ₹2.50 Cr · ₹60.0 L), a 10% / 12% / 14% comparison, the "Illustration only" note, an accessible chart (text summary plus a data-table toggle, series told apart by dashed and solid lines as well as colour), and a "Book a review" button.
- **Calculator to contact handoff**: the result summary is kept in `sessionStorage` and pre-filled into the message. The URL carries only `?from=calculator&calc=<slug>`. Goal and referral context use `?goal=` and `?ref=referral`, and unknown values are ignored. No personal data is ever put in a URL.
- **Lead form**: Zod schema shared by client and server; Indian mobile normalisation (+91, 0, spaces); five amount bands; consent required and unticked by default; honeypot field (bots get a normal-looking 200 and nothing is stored); per-IP rate limit; JSON Lines storage and a pluggable notification.
- **Rate limiting** is in memory, which suits a single Node.js server. On serverless or multi-instance hosting, back `createRateLimiter` with Redis or Upstash.
- **Storage** writes to a local file. On serverless hosting, swap `storeLead` for a database or CRM call.
- **Cookie consent**: "Decline non-essential" and "Accept all" share identical styles (an end-to-end test checks this). Analytics loads only after acceptance. Visitors can reopen the choice from "Cookie settings" in the footer.
- **Accessibility**: skip link, landmarks, one `h1` per page, disclosure-pattern dropdowns with Esc support, native `<dialog>` for the mobile menu and modal, labelled sliders with `aria-valuetext`, debounced live announcements of results, visible focus rings, and `prefers-reduced-motion` respected by both CSS and JS. Risk levels, gains and chart series always carry text or pattern, never colour alone.
- **Contrast**: white on Vermilion is 3.9:1, which fails AA for button text, so accent buttons use near-black text (5.0:1). White on Emerald is 6.6:1. In dark mode, both primary and accent buttons use dark text. `tests/unit/contrast.test.ts` verifies every pair.
- **SEO**: per-page title, description and canonical; Open Graph and Twitter cards; generated OG image; sitemap; robots; JSON-LD for Organization and FinancialService (site-wide), BreadcrumbList, WebApplication (each calculator), FAQPage (Mutual Funds Explained) and Article (insights). **Indexing is off until `site.launch.allowIndexing` is true.**
- **Compliance guardrails**: `tests/unit/compliance.test.ts` fails the build's test run if banned phrases appear ("best fund", "top pick", "risk-free", "assured returns"), if "guaranteed" is used other than in a negation, if required statements are removed, or if fund houses are duplicated.

## Measured results (pre-launch build)

Lighthouse 12 against `next start` on localhost. The mobile run uses applied (devtools) throttling: slow 4G and a 4x CPU slowdown.

| Page | Mobile perf | Desktop perf | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | 82 to 86 | 100 | 100 | 100 | 100* |
| Calculators, Contact, Approach, Mutual Funds Explained, News, Legal | 91 to 96 | 100 | 100 | 100 | 100* |
| About, Services, Insights, Clients, MF Research | 89 to 94 | 100 | 100 | 100 | 100* |

\* SEO scores 66 to 69 while `site.launch.allowIndexing` is false, because Lighthouse reports the deliberate `noindex`. It scores 100 with indexing on.

CLS is 0 on every page measured. The home page's mobile score is held back by framework hydration on a long page (total blocking time around 450ms at a 4x CPU slowdown). Run Lighthouse again on the production host, with compression and a CDN, before launch.

## Deployment notes

- Any Node.js host works (`npm run build && npm start`). The lead route needs the Node.js runtime and a writable `LEADS_STORE_PATH`, or a replaced storage adapter.
- Security headers are set in `next.config.ts`. Add a Content-Security-Policy once the analytics provider is chosen.
- Keep `.data/` out of web roots and backups that are not access-controlled; it holds personal data.

## Pre-launch compliance checklist

The full checklist, and the list of every placeholder, is in [`LAUNCH-CHECKLIST.md`](./LAUNCH-CHECKLIST.md).
