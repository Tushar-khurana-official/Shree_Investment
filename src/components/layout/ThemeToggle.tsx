"use client";

import { useEffect, useState } from "react";
import { THEME_KEY } from "@/lib/boot-script";

type Theme = "light" | "dark";

/** Theme switch. Navy & gold is the default; the light theme is remembered on this device once chosen. */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {}
  };

  const isLight = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isLight}
      aria-label="Light mode"
      title={isLight ? "Switch to the navy theme" : "Switch to the light theme"}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition-colors duration-200 hover:bg-primary-soft"
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
        {isLight ? (
          <path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5Z" strokeLinejoin="round" />
        ) : (
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}
