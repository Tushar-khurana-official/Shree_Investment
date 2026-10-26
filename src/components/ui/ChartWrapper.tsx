"use client";

import { useId, useState, type ReactNode } from "react";

export type DataTableColumn = { key: string; label: string; format: (v: number) => string };

/**
 * Accessible chart container: a visible title, a text summary for everyone (and screen readers),
 * the chart itself (hidden from assistive tech), and a toggle that reveals the full data table.
 */
export function ChartWrapper({
  title,
  summary,
  children,
  columns,
  rows,
  rowHeader,
}: {
  title: string;
  summary: ReactNode;
  children: ReactNode;
  columns: DataTableColumn[];
  rows: Record<string, number>[];
  rowHeader: { key: string; label: string; format: (v: number) => string };
}) {
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();
  return (
    <figure className="rounded-card border border-border bg-surface p-4 md:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <figcaption className="text-sm font-medium">{title}</figcaption>
        <button
          type="button"
          onClick={() => setShowTable((s) => !s)}
          aria-expanded={showTable}
          aria-controls={tableId}
          className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted hover:border-primary hover:text-primary"
        >
          {showTable ? "Hide data table" : "Show data table"}
        </button>
      </div>
      <p className="mt-2 text-sm text-muted">{summary}</p>
      <div className="mt-4" aria-hidden="true">
        {children}
      </div>
      <div id={tableId} hidden={!showTable} className="relative mt-4 max-h-80 overflow-auto rounded-card-sm border border-border">
        <table className="w-full text-sm tabular">
          <caption className="sr-only">{title}: data table</caption>
          <thead className="sticky top-0 bg-surface-2">
            <tr>
              <th scope="col" className="px-3 py-2 text-left font-medium">
                {rowHeader.label}
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="px-3 py-2 text-right font-medium">
                  {c.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-t border-border">
                <th scope="row" className="px-3 py-2 text-left font-normal">
                  {rowHeader.format(r[rowHeader.key])}
                </th>
                {columns.map((c) => (
                  <td key={c.key} className="px-3 py-2 text-right">
                    {c.format(r[c.key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}
