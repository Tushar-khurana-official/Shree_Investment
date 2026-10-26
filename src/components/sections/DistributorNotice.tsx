import Link from "next/link";
import { site } from "@config";

/** "Distributor, not adviser" statement. Required on the home and approach pages. */
export function DistributorNotice({ compact }: { compact?: boolean }) {
  return (
    <aside aria-label="Distributor, not adviser" className="rounded-card border border-border bg-surface p-6 md:p-8">
      <p className="eyebrow">Distributor, not adviser</p>
      <p className={compact ? "mt-3 text-muted" : "mt-3 text-lg"}>
        {site.firm.name} is an AMFI-registered mutual fund distributor ({site.registration.arn}), not a SEBI-registered investment
        adviser. We are paid trail commission by the fund house on the regular plans we distribute, disclosed to you before you invest.
        You pay us no direct fee for distribution. We never promise returns.
      </p>
      <Link href="/legal/commission-disclosure" className="mt-4 inline-block text-sm font-medium text-primary underline">
        Read our commission disclosure
      </Link>
    </aside>
  );
}
