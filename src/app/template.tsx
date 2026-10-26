"use client";

import { useEffect, type ReactNode } from "react";

// Module-level flag: the first mount is the initial page load, which should not fade (it would delay first paint).
let firstLoad = true;

/** 200ms fade on route changes. No sliding transitions; reduced motion makes it instant (globals.css). */
export default function Template({ children }: { children: ReactNode }) {
  const animate = !firstLoad;
  useEffect(() => {
    firstLoad = false;
  }, []);
  return <div className={animate ? "route-fade" : undefined}>{children}</div>;
}
