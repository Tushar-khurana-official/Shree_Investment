/** Line icons drawn in the visiting card's style (gold strokes). */
export type IconName = "chart" | "sprout" | "building" | "shield" | "lock";

export function Icon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={className} {...common}>
      {name === "chart" && (
        <>
          <path d="M5 27h22" />
          <path d="M8 23v-5M13 23v-8M18 23v-6M23 23V11" strokeWidth="3" />
          <path d="m6 15 6-5 5 3 9-8M21 5h5v5" />
        </>
      )}
      {name === "sprout" && (
        <>
          <path d="M4 22h6l5 2h6a2 2 0 0 0 0-4h-5" />
          <path d="M4 20v7h4l6 1 11-5a2 2 0 0 0-2-3.5L17 22" />
          <path d="M18 16v-5M18 11c0-4 3-6 7-6 0 4-3 6-7 6ZM18 12c0-3-2-5-6-5 0 3 2 5 6 5Z" />
        </>
      )}
      {name === "building" && (
        <>
          <path d="M6 28V6h12v22M18 12h8v16M4 28h24" />
          <path d="M10 10h1M13 10h1M10 14h1M13 14h1M10 18h1M13 18h1M21 16h1M21 20h1M10 23h4v5" />
        </>
      )}
      {name === "shield" && (
        <>
          <path d="M16 3 6 7v8c0 6.5 4.3 11 10 14 5.7-3 10-7.5 10-14V7L16 3Z" />
          <path d="m11 16 4 4 7-8" />
        </>
      )}
      {name === "lock" && (
        <>
          <rect x="7" y="14" width="18" height="14" rx="3" />
          <path d="M11 14v-4a5 5 0 0 1 10 0v4M16 20v3" />
        </>
      )}
    </svg>
  );
}
