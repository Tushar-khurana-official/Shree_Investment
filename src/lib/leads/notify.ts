import { site } from "@config";
import { amountBandLabel, goalLabel } from "./schema";
import type { StoredLead } from "./store";

/**
 * Sends the new-enquiry notification. Provider is chosen with LEADS_NOTIFY_PROVIDER:
 *   console (default) logs a redacted summary. Development only.
 *   webhook           POSTs JSON to LEADS_WEBHOOK_URL (Zapier, Make, Slack, CRM).
 *   resend            sends an email through the Resend HTTP API (RESEND_API_KEY, LEADS_NOTIFY_FROM).
 * TODO: choose and configure a provider before launch.
 */
export function leadEmail(lead: StoredLead) {
  const lines = [
    `New enquiry ${lead.id} received ${lead.receivedAt}`,
    "",
    `Name: ${lead.fullName}`,
    `Mobile: ${lead.mobile}`,
    `Email: ${lead.email}`,
    `City: ${lead.city}`,
    `Goal: ${goalLabel(lead.goal)}`,
    `Monthly investable amount: ${amountBandLabel(lead.amountBand)}`,
    `Referral: ${lead.referral ? "Yes" : "No"}`,
    `Source: ${lead.source}`,
    `Consent to contact: ${lead.consent ? "Given" : "Not given"}`,
    "",
    "Message:",
    lead.message || "(none)",
  ];
  return {
    subject: `New enquiry: ${goalLabel(lead.goal)} (${lead.city})`,
    text: lines.join("\n"),
  };
}

export async function notifyNewLead(lead: StoredLead): Promise<void> {
  const provider = process.env.LEADS_NOTIFY_PROVIDER || "console";
  const to = process.env.LEADS_NOTIFY_TO || site.contact.email;
  const { subject, text } = leadEmail(lead);

  if (provider === "webhook") {
    const url = process.env.LEADS_WEBHOOK_URL;
    if (!url) throw new Error("LEADS_WEBHOOK_URL is not set");
    const res = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ to, subject, text, lead }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return;
  }

  if (provider === "resend") {
    const key = process.env.RESEND_API_KEY;
    const from = process.env.LEADS_NOTIFY_FROM;
    if (!key || !from) throw new Error("RESEND_API_KEY and LEADS_NOTIFY_FROM must be set");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text, reply_to: lead.email }),
    });
    if (!res.ok) throw new Error(`Email API responded ${res.status}`);
    return;
  }

  // console: never log full personal data.
  console.info(`[leads] ${lead.id} → ${to}: ${subject} (mobile ••••${lead.mobile.slice(-4)})`);
}
