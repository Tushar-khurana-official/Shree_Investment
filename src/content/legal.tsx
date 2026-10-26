import type { ReactNode } from "react";
import Link from "next/link";
import { formattedAddress, site } from "@config";

export type LegalDoc = { slug: string; title: string; description: string; body: () => ReactNode };

export function GrievanceRedressal() {
  const g = site.grievance;
  return (
    <section aria-labelledby="grievance">
      <h2 id="grievance">Grievance redressal</h2>
      <p>If you have a complaint about our services, please contact our grievance officer first:</p>
      <ul>
        <li>Name: {g.officerName}</li>
        <li>Email: <a href={`mailto:${g.email}`}>{g.email}</a></li>
        <li>Phone: {g.phone}</li>
        <li>Address: {formattedAddress()}</li>
      </ul>
      <p>We will acknowledge your complaint promptly and aim to resolve it within {g.responseDays} working days.</p>
      <p>If you are not satisfied with our response, you may escalate:</p>
      <ol>
        <li>To the fund house (AMC) concerned, through its investor service centre or website.</li>
        <li>To AMFI, the Association of Mutual Funds in India: <a href={site.links.amfi}>{site.links.amfi}</a>.</li>
        <li>To SEBI through the SCORES portal: <a href={site.links.sebiScores}>{site.links.sebiScores}</a>.</li>
        <li>After that, through online dispute resolution on SMART ODR: <a href={site.links.smartOdr}>{site.links.smartOdr}</a>.</li>
      </ol>
    </section>
  );
}

const r = site.registration;

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: `How ${site.firm.name} collects, uses and protects your personal data.`,
    body: () => (
      <>
        <h2>What we collect</h2>
        <p>When you submit the contact form, we collect your name, mobile number, email, city, goal, monthly investable amount band and any message you write. We do not ask for PAN, bank or account details through this website.</p>
        <h2>Why we use it</h2>
        <p>Only to respond to your enquiry and, if you become a client, to provide our services. We do not sell or share your details with any third party for marketing.</p>
        <h2>Service providers</h2>
        <p>We use providers for website hosting and email delivery [TODO: name providers]. They process data only on our instructions.</p>
        <h2 id="cookies">Cookies and similar storage</h2>
        <p>Essential storage remembers your cookie choice and theme preference. Analytics cookies are used only if you click &quot;Accept all&quot;, and you can change your choice at any time from &quot;Cookie settings&quot; in the footer. A calculator result you choose to send to the contact form is held only in your browser tab until you submit or close it.</p>
        <h2>Retention</h2>
        <p>Enquiries that do not lead to an engagement are deleted after [TODO: period]. Client records are kept for the periods required by law and regulation.</p>
        <h2>Your rights</h2>
        <p>You may ask to see, correct or delete your personal data, or withdraw consent, by writing to {site.contact.email}. Your rights under the Digital Personal Data Protection Act, 2023 and its rules apply. [TODO: name a contact for data protection requests.]</p>
      </>
    ),
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    description: "The terms that apply to using this website.",
    body: () => (
      <>
        <h2>About this website</h2>
        <p>This website is operated by {site.firm.name}, an AMFI-registered mutual fund distributor ({r.arn}). It provides general information and tools. It does not offer investment advice and does not execute transactions.</p>
        <h2>No advice, no offer</h2>
        <p>Nothing on this website is an offer or solicitation to buy or sell any security, or a recommendation of any scheme. Calculator results are illustrations based on assumed returns that you choose; they are not projections or promises.</p>
        <h2>Accuracy</h2>
        <p>We take care to keep information accurate, but it may be incomplete or out of date. Scheme information should be confirmed from the scheme information document, statement of additional information and key information memorandum.</p>
        <h2>Third-party links</h2>
        <p>Links to other websites, such as KRA, AMFI, SEBI and fund houses, are provided for convenience. We are not responsible for their content.</p>
        <h2>Governing law</h2>
        <p>These terms are governed by the laws of India, and the courts at [TODO: city] have jurisdiction.</p>
      </>
    ),
  },
  {
    slug: "disclaimer",
    title: "Disclaimer",
    description: "Risk disclaimers that apply to all content on this website.",
    body: () => (
      <>
        <p><strong>Mutual fund investments are subject to market risks, read all scheme related documents carefully.</strong></p>
        <p>Past performance is not indicative of future returns. The value of investments and any income from them can go down as well as up, and you may get back less than you invested.</p>
        <p>{site.firm.name} is a mutual fund distributor registered with AMFI ({r.arn}, EUIN {r.euin}). We are not a SEBI-registered investment adviser, and our services are incidental to distribution.</p>
        <p>Calculators on this website are for illustration only. Returns are assumed, not guaranteed. Results do not account for taxes, exit loads, expense ratio changes or the timing of real market returns.</p>
        <p>Articles, news summaries and research data are general information, not recommendations. Fund research data may be delayed, sample or incomplete; verify with the fund house before acting.</p>
        <p>Insurance is distributed under a separate IRDAI registration. Insurance is not an investment, and insurance products are not mutual funds.</p>
      </>
    ),
  },
  {
    slug: "commission-disclosure",
    title: "Commission Disclosure",
    description: "How we are paid as a mutual fund distributor.",
    body: () => (
      <>
        <p>{site.firm.name} is an AMFI-registered mutual fund distributor ({r.arn}). We are paid commission by asset management companies (fund houses) on investments made through us in the <strong>regular plans</strong> of their schemes.</p>
        <h2>How it works</h2>
        <ul>
          <li><strong>Trail commission</strong> is paid by the AMC as an annual percentage of the value of your investment, for as long as you stay invested. It is part of the scheme&apos;s total expense ratio, which is already reflected in the NAV.</li>
          <li>As required by SEBI, we receive <strong>no upfront commission</strong>; commission is paid on a trail basis only.</li>
          <li>You pay <strong>no separate fee</strong> to us for distribution.</li>
          <li>Direct plans of the same schemes carry a lower expense ratio because they exclude distributor commission. You may invest in direct plans without us.</li>
        </ul>
        <h2>Indicative trail commission ranges</h2>
        <p>[TODO: replace with your actual current rates from each AMC, and update when they change.]</p>
        <table>
          <thead><tr><th scope="col">Category</th><th scope="col">Indicative annual trail</th></tr></thead>
          <tbody>
            <tr><td>Equity and equity-oriented hybrid</td><td>[TODO]% to [TODO]%</td></tr>
            <tr><td>Index funds and ETFs (FoF)</td><td>[TODO]% to [TODO]%</td></tr>
            <tr><td>Debt</td><td>[TODO]% to [TODO]%</td></tr>
            <tr><td>Liquid and overnight</td><td>[TODO]% to [TODO]%</td></tr>
          </tbody>
        </table>
        <p>The exact commission on each scheme we recommend is disclosed to you before you invest, and is shown in your consolidated account statement.</p>
        <h2>Other income</h2>
        <p>We may receive commission from insurers on insurance policies under our separate IRDAI registration, and from issuers on fixed deposits and bonds. These are disclosed before you buy. [TODO: confirm.]</p>
        <p>See also: <Link href="/approach#distributor">how we work and how we are paid</Link>.</p>
      </>
    ),
  },
  {
    slug: "disclosures",
    title: "Disclosures",
    description: "Registration details and regulatory disclosures.",
    body: () => (
      <>
        <h2>Registration</h2>
        <ul>
          <li>Name: {site.firm.name}</li>
          <li>AMFI Registration Number (ARN): {r.arn}</li>
          <li>EUIN: {r.euin}</li>
          <li>Date of registration: {r.amfiRegistrationDate}</li>
          <li>Valid till: {r.validTill}</li>
          {r.insurance && <li>{r.insurance.label}: {r.insurance.number}, valid till {r.insurance.validTill} ({r.insurance.insurer})</li>}
          <li>Office: {formattedAddress()}</li>
        </ul>
        <h2>Nature of services</h2>
        <p>We act as a distributor of mutual fund schemes and abide by the AMFI Code of Conduct for intermediaries. We are not a SEBI-registered investment adviser. Any guidance we give is incidental to distribution.</p>
        <h2>Conflicts of interest</h2>
        <p>Because commission rates differ between schemes and AMCs, a conflict of interest can arise. We manage it by disclosing commission before you invest, and by recording the reason each scheme is recommended in your written plan.</p>
        <h2>Transactions</h2>
        <p>Transactions are placed through {r.transactionPlatform}. Payments are made directly from your bank account to the fund house. We do not accept cash or payments into our own accounts for investments.</p>
      </>
    ),
  },
];
