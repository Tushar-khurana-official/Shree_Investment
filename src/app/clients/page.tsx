import type { Metadata } from "next";
import { site } from "@config";
import { buildMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Existing clients: sign in to your portfolio",
  description: "Sign in to the client portal or app for statements, SIP mandates and transactions. Units are held in your own name.",
  path: "/clients",
});

const features = [
  {
    title: "Secure sign-in",
    body: "Sign in with your registered email or mobile and a one-time password. Sessions time out, and nobody at our office can see your password.",
  },
  {
    title: "SIP mandates",
    body: "See every active SIP, its date and amount, and the bank mandate behind it. Ask us to pause, step up or stop a SIP from the same place.",
  },
  {
    title: "Statements on demand",
    body: "Download a consolidated account statement, capital-gains statements for your tax return and transaction history whenever you need them.",
  },
];

function AppIllustration() {
  return (
    <figure className="mx-auto w-full max-w-xs">
      <div aria-hidden="true" className="rounded-[2.5rem] border-[10px] border-fg/85 bg-surface p-5 shadow-2xl">
        <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-border" />
        <p className="eyebrow">Portfolio value</p>
        <p className="mt-1 font-display text-3xl tracking-widest">₹ ••••••</p>
        <div className="mt-5 h-24 rounded-card-sm bg-[linear-gradient(to_top,color-mix(in_srgb,var(--primary)_18%,transparent),transparent)]">
          <svg viewBox="0 0 200 80" className="h-full w-full" preserveAspectRatio="none">
            <path d="M0 70 40 60 80 62 120 40 160 34 200 12" fill="none" stroke="var(--primary)" strokeWidth="3" />
          </svg>
        </div>
        <ul className="mt-5 space-y-3">
          {["SIP · 5th of every month", "SIP · 12th of every month", "Statement · on request"].map((r) => (
            <li key={r} className="flex items-center justify-between rounded-card-sm border border-border px-3 py-2.5 text-xs">
              <span>{r}</span>
              <span className="tracking-widest text-muted">₹ ••••</span>
            </li>
          ))}
        </ul>
      </div>
      <figcaption className="mt-4 text-center text-sm text-muted">Illustration of the app, not a client account.</figcaption>
    </figure>
  );
}

export default function ClientsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Existing clients"
        title={<>Your whole portfolio, in your <em className="italic text-primary">pocket</em>.</>}
        intro="Every client gets access to a secure portal and app, run on a registered platform, with all their holdings in one place."
        crumbs={[{ name: "Existing clients", path: "/clients" }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href={site.links.clientLogin} external variant="primary" size="lg">Sign in from a browser</ButtonLink>
          <ButtonLink href={site.links.iosApp} external variant="secondary" size="lg">Download on the App Store</ButtonLink>
          <ButtonLink href={site.links.androidApp} external variant="secondary" size="lg">Get it on Google Play</ButtonLink>
        </div>
      </PageHeader>
      <div className="container-content grid gap-12 border-t border-border py-16 grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <ol className="space-y-px overflow-hidden rounded-card border border-border bg-border">
            {features.map((f, i) => (
              <li key={f.title} className="bg-surface p-7">
                <span className="text-sm text-primary tabular" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-2 text-2xl">{f.title}</h2>
                <p className="mt-2 text-muted">{f.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 space-y-3 rounded-card-sm border border-border bg-surface-2 p-6">
            <h2 className="font-sans text-base font-semibold">Where your money actually is</h2>
            <p className="text-muted">
              Your units are held in <strong className="text-fg">your own name</strong>, in folios with each fund house. Investments are placed through{" "}
              {site.registration.transactionPlatform}, a registered transaction platform, and money moves directly between your bank account and the
              fund house. It never passes through us.
            </p>
            <p className="text-sm text-muted">Trouble signing in? Call {site.contact.phone} or write to {site.contact.email}. We will never ask for your password or OTP.</p>
          </div>
        </div>
        <div className="lg:col-span-5">
          <AppIllustration />
        </div>
      </div>
    </>
  );
}
