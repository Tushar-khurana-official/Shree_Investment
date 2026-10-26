/**
 * Calculator → contact form handoff.
 * The result summary travels in sessionStorage (same tab, cleared when it closes), never in the URL.
 * The URL only carries non-personal context such as ?from=calculator&calc=sip.
 */
const KEY = "mfd-handoff";

export type Handoff = { calculator: string; summary: string; at: number };

export function saveHandoff(calculator: string, summary: string) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({ calculator, summary, at: Date.now() } satisfies Handoff));
  } catch {
    /* storage unavailable: the visitor can still describe their question in the form */
  }
}

/** Reads the handoff if it is under an hour old. */
export function readHandoff(): Handoff | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const h = JSON.parse(raw) as Handoff;
    if (Date.now() - h.at > 60 * 60 * 1000) return null;
    return typeof h.summary === "string" ? h : null;
  } catch {
    return null;
  }
}

export function clearHandoff() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {}
}
