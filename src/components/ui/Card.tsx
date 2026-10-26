import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  as: Tag = "div",
  ...rest
}: { as?: "div" | "article" | "li" | "section"; children: ReactNode } & HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cn("rounded-card border border-border bg-surface p-6 md:p-8", className)} {...rest}>
      {children}
    </Tag>
  );
}
