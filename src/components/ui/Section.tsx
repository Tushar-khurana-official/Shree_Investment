import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Eyebrow } from "./Eyebrow";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  number?: string;
  title?: ReactNode;
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
  /** Draws the editorial hairline rule above the section. Default true. */
  rule?: boolean;
  tone?: "default" | "surface" | "inverse";
  headingLevel?: "h1" | "h2";
};

export function Section({
  id,
  eyebrow,
  number,
  title,
  intro,
  children,
  className,
  rule = true,
  tone = "default",
  headingLevel = "h2",
}: SectionProps) {
  const H = headingLevel;
  const headingId = id ? `${id}-heading` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        tone === "surface" && "bg-surface",
        tone === "inverse" && "bg-primary text-on-primary",
        className,
      )}
    >
      <div className={cn("container-content py-16 md:py-24", rule && "border-t border-border")}>
        {(eyebrow || title || intro) && (
          <div className="mb-10 grid gap-5 md:mb-14 grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-7">
              {eyebrow && (
                <Eyebrow number={number} className={tone === "inverse" ? "!text-on-primary/80" : undefined}>
                  {eyebrow}
                </Eyebrow>
              )}
              {title && (
                <H id={headingId} className="mt-4 text-3xl md:text-[2.75rem]">
                  {title}
                </H>
              )}
            </div>
            {intro && (
              <div
                className={cn(
                  "text-lg md:col-span-5 md:self-end",
                  tone === "inverse" ? "text-on-primary/90" : "text-muted",
                )}
              >
                {intro}
              </div>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

/** Italic, emerald emphasis used for one word in display headlines. */
export function Em({ children, tone = "primary" }: { children: ReactNode; tone?: "primary" | "accent" }) {
  return <em className={cn("italic", tone === "accent" ? "text-accent" : "text-primary")}>{children}</em>;
}
