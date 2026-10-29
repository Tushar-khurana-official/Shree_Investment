import Image from "next/image";
import Link from "next/link";
import { site } from "@config";

/** Emblem from the visiting card plus the firm name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-gold/60 shadow-[0_0_18px_-6px_var(--gold)]">
        <Image src={site.firm.logo} alt="" fill sizes="44px" className="object-cover" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-bold uppercase tracking-wide text-fg">Shree</span>{" "}
        <span className="font-ornament text-[0.7rem] uppercase tracking-[0.32em] text-gold">Investments</span>
        <span className="sr-only">, home</span>
      </span>
    </Link>
  );
}
