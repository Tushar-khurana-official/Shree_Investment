import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "neutral" | "primary" | "warning" | "danger" | "outline";

const tones: Record<Tone, string> = {
  neutral: "bg-surface-2 text-fg",
  primary: "bg-primary-soft text-primary",
  warning: "bg-accent/10 text-fg border border-accent/40",
  danger: "bg-risk/10 text-risk",
  outline: "border border-border text-muted",
};

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium leading-tight",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Visible marker for unverified placeholder content. */
export function PlaceholderBadge({ children = "Placeholder" }: { children?: ReactNode }) {
  return (
    <Badge tone="warning" className="uppercase tracking-wider">
      <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="currentColor">
        <path d="M8 1.5 15 14H1L8 1.5Zm-.75 4.5v4h1.5V6h-1.5Zm0 5v1.5h1.5V11h-1.5Z" />
      </svg>
      {children}
    </Badge>
  );
}
