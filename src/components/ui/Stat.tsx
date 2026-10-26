import { CountUp } from "./CountUp";

export function Stat({
  value,
  prefix,
  suffix,
  decimals,
  label,
  text,
  footnote,
}: {
  value?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  /** Static text instead of a number (e.g. an ARN). */
  text?: string;
  footnote?: string;
}) {
  return (
    <div className="flex flex-col border-l border-border pl-5">
      <dt className="eyebrow order-2 mt-2 block">
        {label}
        {footnote && <span aria-hidden="true">{footnote}</span>}
      </dt>
      <dd className="order-1 font-display text-3xl tabular md:text-4xl">
        {text ?? <CountUp value={value ?? 0} prefix={prefix} suffix={suffix} decimals={decimals} />}
      </dd>
    </div>
  );
}
