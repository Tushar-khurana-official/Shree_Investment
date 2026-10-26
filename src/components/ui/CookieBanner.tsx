"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, OPEN_SETTINGS_EVENT, readConsent, writeConsent, type Consent } from "@/lib/consent";
import { Button } from "./Button";

/**
 * Cookie banner. "Decline non-essential" and "Accept all" are deliberately identical in size and style.
 * Only essential storage (this choice, theme preference) is used until the visitor accepts.
 *
 * The banner is server-rendered so it paints with the page instead of popping in after hydration.
 * Visitors who already chose get `consent-set` on <html> from the inline head script, which hides it with CSS.
 */
export function CookieBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (readConsent() !== null) setDismissed(true);
    const open = () => {
      document.documentElement.classList.remove("consent-set");
      setDismissed(false);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  if (dismissed) return null;

  const choose = (c: Consent) => {
    writeConsent(c);
    setDismissed(true);
  };

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="cookie-banner fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-card border border-border bg-surface p-5 shadow-2xl md:inset-x-6 md:bottom-6 md:p-6"
    >
      <h2 className="font-sans text-base font-semibold">Cookies on this site</h2>
      <p className="mt-2 text-sm text-muted">
        We use essential storage to remember choices like this one. With your permission, we would also use analytics
        cookies to understand which pages are useful. Nothing is used for advertising.{" "}
        <Link href="/legal/privacy-policy#cookies" className="text-primary underline">
          Read the privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Button variant="secondary" className="w-full" onClick={() => choose("declined")}>
          Decline non-essential
        </Button>
        <Button variant="secondary" className="w-full" onClick={() => choose("accepted")}>
          Accept all
        </Button>
      </div>
    </div>
  );
}

export function useConsent(): Consent | null {
  const [consent, setConsent] = useState<Consent | null>(null);
  useEffect(() => {
    setConsent(readConsent());
    const onChange = (e: Event) => setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);
  return consent;
}
