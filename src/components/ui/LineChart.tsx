"use client";

import { useEffect, useRef, useState } from "react";
import { formatAxisINR } from "@/lib/format";

export type ChartSeries = {
  key: string;
  label: string;
  /** CSS colour, usually a token such as var(--primary). */
  color: string;
  /** Dashed stroke so series are distinguishable without colour. */
  dashed?: boolean;
  area?: boolean;
};

export type ChartMarker = { x: number; label: string };

/**
 * Lines redraw smoothly when inputs change: the path is also set as the CSS `d` property, which browsers that
 * support it (Chromium) transition over 400ms. Other browsers simply update. Reduced motion disables transitions.
 */
const morph = (d: string) => ({ d: `path("${d}")`, transition: "d 400ms cubic-bezier(0.2, 0.7, 0.2, 1)" }) as React.CSSProperties;

const PAD = { top: 16, right: 16, bottom: 32, left: 64 };

function niceMax(v: number) {
  if (v <= 0) return 1;
  const exp = Math.pow(10, Math.floor(Math.log10(v)));
  const f = v / exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10;
  return nice * exp;
}

/** Lightweight SVG line/area chart. Purely visual; the wrapper supplies text and table alternatives. */
export function LineChart({
  data,
  xKey,
  series,
  marker,
  xLabel = (x: number) => `Yr ${x}`,
}: {
  data: Record<string, number>[];
  xKey: string;
  series: ChartSeries[];
  marker?: ChartMarker | null;
  xLabel?: (x: number) => string;
}) {
  // Draw at the container's real width so labels stay at their intended pixel size.
  const box = useRef<HTMLDivElement>(null);
  const [W, setW] = useState(640);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setW(Math.max(280, Math.round(entry.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const H = W < 500 ? 220 : 300;
  if (data.length < 2) return null;
  const xs = data.map((d) => d[xKey]);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMax = niceMax(Math.max(...data.flatMap((d) => series.map((s) => d[s.key] ?? 0))));
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const sx = (x: number) => PAD.left + ((x - xMin) / (xMax - xMin || 1)) * innerW;
  const sy = (y: number) => PAD.top + innerH - (y / yMax) * innerH;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * yMax);
  const xStep = Math.max(1, Math.ceil((xMax - xMin) / (W < 500 ? 4 : 6)));
  const xTicks: number[] = [];
  for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);
  if (xTicks[xTicks.length - 1] !== xMax) xTicks.push(xMax);

  const path = (key: string) => data.map((d, i) => `${i === 0 ? "M" : "L"}${sx(d[xKey]).toFixed(1)},${sy(d[key] ?? 0).toFixed(1)}`).join(" ");

  return (
    <div ref={box}>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="presentation" focusable="false">
        <defs>
          {series
            .filter((s) => s.area)
            .map((s) => (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.22" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0.02" />
              </linearGradient>
            ))}
        </defs>
        {yTicks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={sy(t)} y2={sy(t)} stroke="var(--border)" strokeWidth="1" />
            <text x={PAD.left - 10} y={sy(t)} textAnchor="end" dominantBaseline="middle" fontSize="11" fill="var(--text-muted)" className="tabular">
              {formatAxisINR(t)}
            </text>
          </g>
        ))}
        {xTicks.map((x) => (
          <text key={x} x={sx(x)} y={H - 10} textAnchor="middle" fontSize="11" fill="var(--text-muted)" className="tabular">
            {xLabel(x)}
          </text>
        ))}
        {series.map((s) =>
          s.area ? (
            <path
              key={`${s.key}-area`}
              d={`${path(s.key)} L${sx(xMax)},${sy(0)} L${sx(xMin)},${sy(0)} Z`}
              fill={`url(#grad-${s.key})`}
              style={morph(`${path(s.key)} L${sx(xMax)},${sy(0)} L${sx(xMin)},${sy(0)} Z`)}
            />
          ) : null,
        )}
        {series.map((s) => (
          <path
            key={s.key}
            d={path(s.key)}
            style={morph(path(s.key))}
            fill="none"
            stroke={s.color}
            strokeWidth={s.dashed ? 2 : 2.5}
            strokeDasharray={s.dashed ? "6 5" : undefined}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {marker && marker.x >= xMin && marker.x <= xMax && (
          <g>
            <line x1={sx(marker.x)} x2={sx(marker.x)} y1={PAD.top} y2={PAD.top + innerH} stroke="var(--text)" strokeOpacity="0.5" strokeDasharray="2 3" />
            <circle cx={sx(marker.x)} cy={sy(data.find((d) => d[xKey] === marker.x)?.[series[0].key] ?? 0)} r="5" fill="var(--surface)" stroke="var(--text)" strokeWidth="2" />
            {W >= 500 && <text
              x={sx(marker.x) + (sx(marker.x) > W * 0.7 ? -8 : 8)}
              y={PAD.top + 12}
              textAnchor={sx(marker.x) > W * 0.7 ? "end" : "start"}
              fontSize="11"
              fontWeight="600"
              fill="var(--text)"
            >
              ◆ {marker.label}
            </text>}
          </g>
        )}
      </svg>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        {series.map((s) => (
          <li key={s.key} className="flex items-center gap-2">
            <svg aria-hidden="true" width="28" height="10" viewBox="0 0 28 10">
              <line x1="0" x2="28" y1="5" y2="5" stroke={s.color} strokeWidth="2.5" strokeDasharray={s.dashed ? "6 4" : undefined} />
            </svg>
            <span>
              {s.label}
              {s.dashed ? " (dashed line)" : " (solid line)"}
            </span>
          </li>
        ))}
        {marker && (
          <li className="flex items-center gap-2">
            <span aria-hidden="true">◆</span>
            <span>{marker.label}</span>
          </li>
        )}
      </ul>
    </div>
  );
}
