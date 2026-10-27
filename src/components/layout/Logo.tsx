import Link from "next/link";
import { site } from "@config";

/** Wordmark logo. TODO: replace with the firm's logo (site.firm.logo) once available. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-2.5 ${className}`} aria-label={`${site.firm.name}, home`}>
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 shrink-0">
        <rect width="32" height="32" rx="9" fill="var(--primary-fill)" />
        <path d="M7 22 13 13l5 6 3-4 4 7" fill="none" stroke="var(--on-primary)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="23" cy="9.5" r="2.2" fill="var(--accent)" />
      </svg>
      <span className="font-display text-xl leading-none tracking-tight">{site.firm.shortName}</span>
    </Link>
  );
}
