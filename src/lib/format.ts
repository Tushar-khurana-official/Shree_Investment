/**
 * Indian number formatting.
 *   formatINR(250000)        -> "₹2,50,000"
 *   formatINRCompact(25000000) -> "₹2.50 Cr"
 *   formatINRCompact(6000000)  -> "₹60.0 L"
 */

const CRORE = 1_00_00_000;
const LAKH = 1_00_000;

const grouping = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Groups digits the Indian way: 2,50,000 and 1,23,45,678. */
export function formatIndianNumber(value: number): string {
  if (!Number.isFinite(value)) return "–";
  return grouping.format(Math.round(value));
}

export function formatINR(value: number): string {
  if (!Number.isFinite(value)) return "–";
  const sign = value < 0 ? "-" : "";
  return `${sign}₹${formatIndianNumber(Math.abs(value))}`;
}

/** Crores with 2 decimals, lakhs with 1 decimal, smaller amounts in full. */
export function formatINRCompact(value: number): string {
  if (!Number.isFinite(value)) return "–";
  const sign = value < 0 ? "-" : "";
  const abs = Math.abs(value);
  if (abs >= CRORE) return `${sign}₹${(abs / CRORE).toFixed(2)} Cr`;
  if (abs >= LAKH) return `${sign}₹${(abs / LAKH).toFixed(1)} L`;
  return `${sign}₹${formatIndianNumber(abs)}`;
}

/** Short axis label: ₹2.5 Cr, ₹60 L, ₹25K. */
export function formatAxisINR(value: number): string {
  const abs = Math.abs(value);
  const trim = (n: number) => (Number.isInteger(n) ? n.toString() : n.toFixed(1).replace(/\.0$/, ""));
  if (abs >= CRORE) return `₹${trim(abs / CRORE)} Cr`;
  if (abs >= LAKH) return `₹${trim(abs / LAKH)} L`;
  if (abs >= 1000) return `₹${trim(abs / 1000)}K`;
  return `₹${Math.round(abs)}`;
}

/** Spoken form for screen readers: "2.50 crore rupees". */
export function spokenINR(value: number): string {
  const abs = Math.abs(value);
  if (abs >= CRORE) return `${(abs / CRORE).toFixed(2)} crore rupees`;
  if (abs >= LAKH) return `${(abs / LAKH).toFixed(1)} lakh rupees`;
  return `${formatIndianNumber(abs)} rupees`;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const y = years === 1 ? "1 year" : `${years} years`;
  const m = months === 1 ? "1 month" : `${months} months`;
  if (years === 0) return m;
  if (months === 0) return y;
  return `${y} ${m}`;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + (iso.length === 10 ? "T00:00:00" : ""));
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Parses user input like "2,50,000" or "₹ 2.5" to a number; returns NaN if invalid. */
export function parseAmount(input: string): number {
  const cleaned = input.replace(/[₹,\s]/g, "").replace(/^rs\.?/i, "");
  if (cleaned === "") return NaN;
  return Number(cleaned);
}
