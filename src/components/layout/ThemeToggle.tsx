"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";
const KEY = "mfd-theme";

/**
 * Inline script run before paint: applies the theme (no flash), and marks a stored cookie choice
 * so the server-rendered cookie banner is hidden before it is ever painted.
 */
export const themeScript = `(function(){try{var d=document.documentElement;d.classList.add('js');var c=localStorage.getItem('mfd-cookie-consent');if(c==='accepted'||c==='declined')d.classList.add('consent-set');var t=localStorage.getItem('${KEY}')||'system';var m=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t==='system'&&m))d.classList.add('dark');}catch(e){}})();`;

function apply(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    let stored: Theme = "system";
    try {
      stored = (localStorage.getItem(KEY) as Theme) || "system";
    } catch {}
    setTheme(stored);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      let current: Theme = "system";
      try {
        current = (localStorage.getItem(KEY) as Theme) || "system";
      } catch {}
      if (current === "system") apply("system");
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const next: Record<Theme, Theme> = { system: "light", light: "dark", dark: "system" };
  const labels: Record<Theme, string> = { system: "System theme", light: "Light theme", dark: "Dark theme" };

  return (
    <button
      type="button"
      onClick={() => {
        const t = next[theme];
        setTheme(t);
        try {
          localStorage.setItem(KEY, t);
        } catch {}
        apply(t);
      }}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted hover:bg-surface-2 hover:text-fg"
      aria-label={`${labels[theme]}. Switch to ${labels[next[theme]].toLowerCase()}`}
      title={labels[theme]}
    >
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        {theme === "dark" ? (
          <path d="M16 12.5A6.5 6.5 0 0 1 7.5 4a6.5 6.5 0 1 0 8.5 8.5Z" strokeLinejoin="round" />
        ) : theme === "light" ? (
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.4 1.4M14.6 14.6 16 16M4 16l1.4-1.4M14.6 5.4 16 4" strokeLinecap="round" />
          </>
        ) : (
          <>
            <rect x="2.5" y="3.5" width="15" height="10" rx="1.5" />
            <path d="M7 17h6M10 13.5V17" strokeLinecap="round" />
          </>
        )}
      </svg>
    </button>
  );
}
