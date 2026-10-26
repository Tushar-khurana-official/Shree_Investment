"use client";

import { useEffect, useState } from "react";

/** Announces the latest result once the user stops adjusting inputs, instead of on every slider step. */
export function LiveSummary({ text, delayMs = 800 }: { text: string; delayMs?: number }) {
  const [announced, setAnnounced] = useState("");
  useEffect(() => {
    const t = setTimeout(() => setAnnounced(text), delayMs);
    return () => clearTimeout(t);
  }, [text, delayMs]);
  return (
    <p className="sr-only" aria-live="polite">
      {announced}
    </p>
  );
}
