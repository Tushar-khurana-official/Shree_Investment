export type Consent = "accepted" | "declined";

const KEY = "mfd-cookie-consent";
export const CONSENT_EVENT = "mfd:consent-change";
export const OPEN_SETTINGS_EVENT = "mfd:open-cookie-settings";

export function readConsent(): Consent | null {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

export function writeConsent(value: Consent) {
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* storage unavailable: the choice applies to this page view only */
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: value }));
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT));
}
