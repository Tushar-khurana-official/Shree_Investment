"use client";

import { useEffect, useState, type ComponentType, type ReactNode } from "react";

/**
 * Desktop-only cursor tilt. Motion is loaded on demand, and only on devices with a fine pointer, a wide screen
 * and no reduced-motion preference, so phones never download it.
 */
export function Tilt({ children }: { children: ReactNode }) {
  const [Impl, setImpl] = useState<ComponentType<{ children: ReactNode }> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let cancelled = false;
    const load = () => {
      if (!mq.matches) return setImpl(null);
      import("./TiltMotion").then((mod) => !cancelled && setImpl(() => mod.TiltMotion));
    };
    load();
    mq.addEventListener("change", load);
    return () => {
      cancelled = true;
      mq.removeEventListener("change", load);
    };
  }, []);

  return Impl ? <Impl>{children}</Impl> : <div className="relative">{children}</div>;
}
