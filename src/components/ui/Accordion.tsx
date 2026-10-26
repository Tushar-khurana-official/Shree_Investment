"use client";

import { useId, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { id?: string; title: ReactNode; content: ReactNode };

export function Accordion({ items, className, defaultOpen }: { items: AccordionItem[]; className?: string; defaultOpen?: number }) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(defaultOpen ?? null);
  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={i} id={item.id}>
            <h3 className="font-sans text-base font-medium">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left text-lg hover:text-primary"
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn("text-2xl leading-none text-primary transition-transform duration-300", isOpen && "rotate-45")}
                >
                  +
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} hidden={!isOpen} className="pb-6 text-muted">
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
