import { NextResponse } from "next/server";
import { isHoneypotTripped, validateLead } from "@/lib/leads/schema";
import { storeLead } from "@/lib/leads/store";
import { notifyNewLead } from "@/lib/leads/notify";
import { clientIp, createRateLimiter } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = createRateLimiter({
  max: Number(process.env.LEADS_RATE_LIMIT_MAX || 5),
  windowMs: Number(process.env.LEADS_RATE_LIMIT_WINDOW_SECONDS || 600) * 1000,
});

const MAX_BODY_BYTES = 10_000;

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ ok: false, error: "Unsupported content type." }, { status: 415 });
  }

  const rate = limiter.check(clientIp(request.headers));
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again in a few minutes, or call us directly." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Bots that fill the hidden field get an ordinary success response, and nothing is stored or sent.
  if (isHoneypotTripped(body)) {
    return NextResponse.json({ ok: true, reference: "RECEIVED" }, { status: 200 });
  }

  const result = validateLead(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 422 });
  }

  let stored;
  try {
    stored = await storeLead(result.lead);
  } catch (err) {
    console.error("[leads] storage failed", err);
    return NextResponse.json(
      { ok: false, error: "We could not save your request. Please call or WhatsApp us instead." },
      { status: 500 },
    );
  }

  try {
    await notifyNewLead(stored);
  } catch (err) {
    // The lead is stored; a failed notification should not fail the visitor's submission.
    console.error("[leads] notification failed", err);
  }

  return NextResponse.json({ ok: true, reference: stored.id }, { status: 201 });
}

export function GET() {
  return NextResponse.json({ ok: false, error: "Method not allowed." }, { status: 405, headers: { Allow: "POST" } });
}
