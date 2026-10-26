"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@config";
import { mainNav, type NavGroup } from "@/content/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from "./ThemeToggle";

function isActive(pathname: string, href?: string) {
  if (!href) return false;
  const path = href.split("#")[0];
  return path === "/" ? pathname === "/" : pathname.startsWith(path);
}

/** Disclosure-pattern dropdown: a button toggles a list of links. Esc closes and returns focus. */
function Dropdown({ group, pathname }: { group: NavGroup; pathname: string }) {
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLLIElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const id = `nav-${group.label.toLowerCase().replace(/\W+/g, "-")}`;
  const active = group.children?.some((c) => isActive(pathname, c.href));

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapper.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <li
      ref={wrapper}
      className="relative"
      onBlur={(e) => {
        if (!wrapper.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-2 text-[0.95rem] hover:text-primary",
          active && "text-primary",
        )}
      >
        {group.label}
        <svg aria-hidden="true" viewBox="0 0 16 16" className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-1/2 top-full z-50 mt-2 w-72 -translate-x-1/2 rounded-card border border-border bg-surface p-2 shadow-xl"
      >
        <ul>
          {group.children?.map((c) => (
            <li key={c.href}>
              <Link
                href={c.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(pathname, c.href) && !c.href.includes("#") ? "page" : undefined}
                className="block rounded-card-sm px-4 py-2.5 hover:bg-surface-2"
              >
                <span className="block text-sm font-medium">{c.label}</span>
                {c.description && <span className="block text-xs text-muted">{c.description}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-border bg-bg/90 backdrop-blur-md" : "border-transparent bg-bg",
      )}
    >
      <div className="container-content flex h-18 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((g) =>
              g.children ? (
                <Dropdown key={g.label} group={g} pathname={pathname} />
              ) : (
                <li key={g.label}>
                  <Link
                    href={g.href!}
                    aria-current={isActive(pathname, g.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-[0.95rem] hover:text-primary",
                      isActive(pathname, g.href) && "text-primary",
                    )}
                  >
                    {g.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <span className="hidden md:inline-flex">
            <ButtonLink href={site.links.clientLogin} external variant="secondary" size="sm">
              Client Login
            </ButtonLink>
          </span>
          <span className="hidden sm:inline-flex">
            <ButtonLink href="/contact" variant="accent" size="sm">
              Talk to us
            </ButtonLink>
          </span>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
