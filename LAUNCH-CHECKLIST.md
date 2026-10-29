# Launch checklist

Nothing on this list is optional. Each item is placeholder data, an unverified figure, or text that needs professional
review. Run `npm run placeholders` for a line-by-line list of what remains.

## 0. Before anything else: titles and registrations (Shree Investments)

- [ ] **"Investment Advisor" on the visiting card.** In India this title is reserved for SEBI-registered Investment Advisers (RIA). Unless Manish Purohit holds an RIA registration, do not use it on the website, card or WhatsApp profile. The site uses "Founder, Shree Investments" until this is confirmed.
- [ ] **Mutual funds:** AMFI ARN and EUIN (`registration.arn`, `registration.euin`, dates).
- [ ] **Stock market:** name of the SEBI-registered stock broker, its SEBI registration number, and the Authorised Person code (`registration.stockBroking`). Confirm the current F&O risk-disclosure wording with the broker.
- [ ] **Real estate:** RERA Rajasthan agent registration number (`registration.rera`).
- [ ] Office PIN code, a Google Maps share link, and whether +91 98299 47444 is the WhatsApp number.
- [ ] Logo: the emblem was cut from the visiting card image. Replace `public/images/logo-emblem.webp` with the original artwork for a sharper result.

## 1. Registration and identity (`site.config.ts`)

- [ ] `firm.name`, `shortName`, `tagline`, `description`, `city`, `foundedYear`
- [ ] `firm.logo`: replace `public/images/logo.svg` (the header also has an inline wordmark in `src/components/layout/Logo.tsx`)
- [ ] `registration.arn`, `euin`, `amfiRegistrationDate`, `validTill`: must match the ARN card exactly
- [ ] `registration.insurance`: IRDAI licence or registration number, validity and insurer or corporate agent; set to `null` if you do not distribute insurance
- [ ] `registration.transactionPlatform`: the platform you actually use (BSE StAR MF, NSE NMF II, MF Utility, or another)
- [ ] Set a calendar reminder to renew the ARN before `validTill`, and update the site the same day

## 2. Founder (`site.config.ts` → `founder`)

- [ ] Name, title, photo (`public/images/founder-placeholder.svg` → a real photo) and alt text
- [ ] Qualifications: remove any not held (CFP and IRDAI are examples); add certificate numbers if you want them shown
- [ ] Degree and university
- [ ] Bio: rewrite both placeholder paragraphs (the About page shows a "Placeholder bio" badge until you remove it in `src/app/about/page.tsx`)
- [ ] Quote: confirm the wording with the founder, then set `quoteVerified: true`
- [ ] `yearsExperience`: verify

## 3. Figures that must be verified

- [ ] `stats.items`: years of experience, families served, assets guided. Verify each from records, then set `stats.verified: true` (this removes the "placeholder" note)
- [ ] Process timelines (45 minutes, 5 working days, 2 working days, every 6 months) in `src/content/process.ts`: confirm you can keep these
- [ ] "Call back within one working day" (contact and thank-you pages) and the grievance response time (`grievance.responseDays`)
- [ ] Fund houses: list only AMCs you are actually empanelled with. Use logos only with permission
- [ ] Trail commission ranges in the Commission Disclosure (`src/content/legal.tsx`)

## 4. Contact and links

- [ ] Phone (display and `tel:` formats), WhatsApp number, email, office address, hours, Google Maps link
- [ ] Grievance officer name, email and phone
- [ ] Client login URL, App Store and Google Play links
- [ ] KYC links: confirm the current CVL KRA status inquiry URL (`links.kycCheck`) and your eKYC onboarding link (`links.kycStart`)
- [ ] Social profile URLs
- [ ] AMFI, SEBI SCORES and SMART ODR links: confirm they are current

## 5. Content needing review

- [ ] **Legal pages** (`src/content/legal.tsx`): Privacy Policy, Terms of Use, Disclaimer, Commission Disclosure, Disclosures. All are placeholder text **to be reviewed by a qualified professional before launch**. Fill the `[TODO]` items (service providers, retention period, governing-law city, data-protection contact). Then remove the "Placeholder text" banner in `src/app/legal/[slug]/page.tsx`
- [ ] **Tax section** of Mutual Funds Explained (`src/content/explained.ts`): check against the current Finance Act
- [ ] **Category table** typical risk labels: check against current SEBI categorisation
- [ ] **Insights** (`src/content/insights/`): the four sample articles need review, a real author and real dates. Remove the "Sample article" badge in `src/app/insights/[slug]/page.tsx`
- [ ] **News** (`src/content/news.json`): all entries are `[Sample]`. Connect `NEWS_FEED_URL` or replace them, and set `isSample: false`
- [ ] **MF Research** (`src/content/funds.json`): all schemes are fictional sample data. Connect a licensed data source (`RESEARCH_API_URL`), check the data licence permits public display, and set `isSample: false`
- [ ] Hero and other marketing copy: confirm every claim is one you can stand behind
- [ ] Have the whole site reviewed against the AMFI Code of Conduct and SEBI's advertising guidelines for mutual funds

## 6. Compliance requirements (must not be removed or weakened)

These are enforced by tests where possible (`tests/unit/compliance.test.ts` and `tests/e2e/`).

- [ ] "Distributor, not adviser" statement on the home page and the approach page
- [ ] No promise or guarantee of returns. No "guaranteed", "risk-free", "best fund" or "top pick"
- [ ] ARN, EUIN, AMFI registration date and "Valid till" in the footer of every page
- [ ] Mutual fund risk disclaimer and past-performance disclaimer on every page with financial figures (in the footer, and inline on calculators and research)
- [ ] Commission disclosure linked from the footer and the approach page
- [ ] Every calculator labelled "Illustration only. Returns are assumed, not guaranteed."
- [ ] Testimonials and quotes labelled as placeholders until verified. Never publish fabricated testimonials
- [ ] Consent checkbox on every lead form, never pre-ticked
- [ ] Cookie banner offers "Decline non-essential" as prominently as "Accept"
- [ ] No personal data in URL parameters
- [ ] Insurance never presented as an investment

## 7. Technical

- [ ] `NEXT_PUBLIC_SITE_URL` set to the production domain
- [ ] Lead storage: persistent, private `LEADS_STORE_PATH`, or replace `src/lib/leads/store.ts` with your CRM or database
- [ ] Notification provider configured (`LEADS_NOTIFY_PROVIDER` = `resend` or `webhook`) and a test enquiry received
- [ ] Rate limiter backed by a shared store if you run more than one instance or deploy serverless
- [ ] Analytics provider chosen and configured; check it loads only after "Accept all"
- [ ] Add a Content-Security-Policy header for your analytics domain
- [x] `site.launch.showPlaceholderRibbon: false`
- [ ] `site.launch.allowIndexing: true` (turns on indexing in `robots.txt` and page meta)
- [ ] `npm run lint && npm run typecheck && npm test && npm run test:e2e` all pass
- [ ] Lighthouse on the production URL: 90+ for Performance, Accessibility, Best Practices and SEO (mobile and desktop)
- [ ] `npm run placeholders` reports nothing you have not deliberately kept

## Placeholder inventory

| Location | Placeholder |
|---|---|
| `site.config.ts` | Every value marked `TODO`: firm, founder, registration, insurance registration, contacts, grievance officer, links, socials, fund houses, stats, launch switches |
| `public/images/logo.svg`, `src/app/icon.svg`, `src/components/layout/Logo.tsx` | Placeholder logo mark |
| `public/images/founder-placeholder.svg` | Founder photo |
| `public/images/hero-illustration.svg` | Hero illustration (can stay, or replace with a photo) |
| `src/components/sections/Hero.tsx` | Stats footnote shown while `stats.verified` is false |
| `src/components/sections/QuoteBlock.tsx` | Founder quote (placeholder badge until `quoteVerified`) |
| `src/app/about/page.tsx` | "Placeholder bio" badge |
| `src/content/legal.tsx` | All five legal documents; `[TODO]` service providers, retention period, jurisdiction, commission rates, other income |
| `src/app/legal/[slug]/page.tsx` | "To be reviewed by a qualified professional" banner |
| `src/content/explained.ts` | Tax section to verify against the current Finance Act |
| `src/content/insights/*` | Sample articles, author `[Founder Name]`, dates |
| `src/content/news.json` | Five `[Sample]` entries |
| `src/content/funds.json` | 26 fictional "Sample AMC" schemes, `asOf` date |
| `src/content/process.ts` | Timelines to confirm |
| `src/lib/leads/store.ts`, `src/lib/leads/notify.ts` | Placeholder storage (file) and notification (console) |
| `src/components/layout/Analytics.tsx` | Analytics provider |
