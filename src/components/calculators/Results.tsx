import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function ResultGrid({ children }: { children: ReactNode }) {
  return <dl className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2">{children}</dl>;
}

export function ResultItem({
  label,
  value,
  emphasis,
  note,
  className,
}: {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
  note?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col bg-surface p-5", emphasis && "sm:col-span-2", className)}>
      <dt className="eyebrow order-1">{label}</dt>
      <dd className={cn("order-2 mt-2 font-display tabular", emphasis ? "text-4xl text-primary md:text-5xl" : "text-2xl")}>{value}</dd>
      {note && <dd className="order-3 mt-1 text-sm text-muted">{note}</dd>}
    </div>
  );
}
