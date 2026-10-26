import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";
import type { Lead } from "./schema";

export type StoredLead = Lead & { id: string; receivedAt: string };

/**
 * Stores a submission as one JSON line. Placeholder storage: replace with your CRM or database
 * (keep the same function signature). The file must live on a persistent, private disk that is not web-served.
 */
export async function storeLead(lead: Lead): Promise<StoredLead> {
  const record: StoredLead = {
    ...lead,
    id: `LD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
  };
  // The honeypot value is never persisted.
  const { website: _honeypot, ...persisted } = record;
  void _honeypot;
  const file = process.env.LEADS_STORE_PATH || ".data/leads.jsonl";
  const fullPath = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  await mkdir(path.dirname(fullPath), { recursive: true });
  await appendFile(fullPath, JSON.stringify(persisted) + "\n", { encoding: "utf8", mode: 0o600 });
  return record;
}
