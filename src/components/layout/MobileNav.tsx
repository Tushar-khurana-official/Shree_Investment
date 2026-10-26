"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@config";
import { mainNav } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

/** Mobile drawer: a native modal <dialog> (focus trap, Esc to close) with the same structure as the desktop nav. */
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-2"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 6h14M3 10h14M3 14h14" strokeLinecap="round" />
        </svg>
      </button>
      <dialog
        ref={dialog}
        aria-label="Site menu"
        onClose={() => setOpen(false)}
        className="m-0 ml-auto h-dvh max-h-dvh w-[min(88vw,380px)] max-w-none overflow-y-auto border-l border-border bg-bg p-0 text-fg backdrop:bg-black/50"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <span className="font-display text-lg">{site.firm.shortName}</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-surface-2"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="m4 4 8 8M12 4l-8 8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav aria-label="Mobile" className="px-5 py-4">
          <ul className="divide-y divide-border">
            {mainNav.map((g) => (
              <li key={g.label}>
                {g.children ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={expanded === g.label}
                      aria-controls={`m-${g.label}`}
                      onClick={() => setExpanded(expanded === g.label ? null : g.label)}
                      className="flex w-full items-center justify-between py-4 text-left text-lg"
                    >
                      {g.label}
                      <span aria-hidden="true" className={cn("text-primary transition-transform", expanded === g.label && "rotate-45")}>
                        +
                      </span>
                    </button>
                    <ul id={`m-${g.label}`} hidden={expanded !== g.label} className="pb-3">
                      {g.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} onClick={() => setOpen(false)} className="block py-2 pl-3 text-muted hover:text-primary">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    href={g.href!}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === g.href ? "page" : undefined}
                    className="block py-4 text-lg"
                  >
                    {g.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-6 grid gap-3">
            <ButtonLink href="/contact" variant="accent" onClick={() => setOpen(false)}>
              Talk to us
            </ButtonLink>
            <ButtonLink href={site.links.clientLogin} external variant="secondary">
              Client Login
            </ButtonLink>
          </div>
        </nav>
      </dialog>
    </div>
  );
}
