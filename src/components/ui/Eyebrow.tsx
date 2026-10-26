import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Small, letter-spaced uppercase section label, optionally numbered: "01 — WHAT WE DO". */
export function Eyebrow({ number, children, className }: { number?: string; children: ReactNode; className?: string }) {
  return (
    <p className={cn("eyebrow flex items-center gap-3", className)}>
      {number && (
        <>
          <span className="tabular text-primary">{number}</span>
          <span aria-hidden="true" className="h-px w-8 bg-border" />
        </>
      )}
      <span>{children}</span>
    </p>
  );
}
