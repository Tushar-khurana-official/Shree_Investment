"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { site } from "@config";
import { goalOptions } from "@/content/goals";
import { AMOUNT_BANDS, LEAD_SOURCES, validateLead, type FieldErrors } from "@/lib/leads/schema";
import { clearHandoff, readHandoff } from "@/lib/handoff";
import { calculators } from "@/content/calculators";
import { Button } from "@/components/ui/Button";
import { Checkbox, Field, Input, Select, Textarea, describedBy } from "@/components/ui/Input";
import { useToast } from "@/components/ui/Toast";

type FormState = {
  fullName: string;
  mobile: string;
  email: string;
  goal: string;
  amountBand: string;
  city: string;
  message: string;
  consent: boolean;
  website: string;
};

const empty: FormState = { fullName: "", mobile: "", email: "", goal: "", amountBand: "", city: "", message: "", consent: false, website: "" };

const FIELD_ORDER: (keyof FormState)[] = ["fullName", "mobile", "email", "goal", "amountBand", "city", "message", "consent"];

/**
 * Lead form. Accepts only non-personal context from the URL (read once on mount):
 *   ?goal=<goal id>  ?ref=referral  ?source=<source>  ?from=calculator&calc=<slug>
 * A calculator result summary is read from sessionStorage, never from the URL.
 */
export function ContactForm() {
  const router = useRouter();
  const toast = useToast();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [context, setContext] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // URL context is read after mount (not via useSearchParams) so the form itself is server-rendered.
  const [referral, setReferral] = useState(false);
  const [source, setSource] = useState<(typeof LEAD_SOURCES)[number]>("contact");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referral = params.get("ref") === "referral";
    const rawSource = params.get("from") === "calculator" ? "calculator" : params.get("source");
    setReferral(referral);
    setSource((LEAD_SOURCES as readonly string[]).includes(rawSource ?? "") ? (rawSource as (typeof LEAD_SOURCES)[number]) : referral ? "referral" : "contact");
    const goal = params.get("goal");
    const validGoal = goalOptions.some((g) => g.value === goal) ? goal! : "";
    let message = "";
    if (params.get("from") === "calculator") {
      const handoff = readHandoff();
      const calcName = calculators.find((c) => c.slug === params.get("calc"))?.name;
      if (handoff) {
        message = `From the ${calcName ?? "calculator"}: ${handoff.summary}\n\n`;
        setContext("We have added your calculator result to the message below. Edit or remove it as you like.");
      }
    }
    if (referral) {
      setContext("You are introducing someone. Please enter their details only if they have agreed to be contacted, or your own if you would like us to call you first.");
    }
    setForm((f) => ({ ...f, goal: validGoal || f.goal, message: message || f.message }));
  }, []);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof FieldErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = FIELD_ORDER.find((k) => errs[k as keyof FieldErrors]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...form, referral, source };
    const local = validateLead(payload);
    if (!local.ok) {
      setErrors(local.errors);
      focusFirstError(local.errors);
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        clearHandoff();
        router.push("/contact/thank-you");
        return;
      }
      if (res.status === 422 && data.errors) {
        setErrors(data.errors);
        focusFirstError(data.errors);
      } else {
        toast(data.error ?? "Something went wrong. Please call or WhatsApp us instead.", "error");
      }
    } catch {
      toast("We could not reach the server. Please check your connection, or call us.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-labelledby="form-heading" className="space-y-6">
      <h2 id="form-heading" className="text-2xl md:text-3xl">
        {referral ? "Introduce someone" : "Request a call back"}
      </h2>
      {context && <p className="rounded-card-sm border border-border bg-surface-2 p-4 text-sm">{context}</p>}
      {errorCount > 0 && (
        <p role="alert" className="rounded-card-sm border border-danger bg-danger/5 p-4 text-sm text-danger">
          Please fix {errorCount === 1 ? "1 field" : `${errorCount} fields`} below.
        </p>
      )}
      <p className="text-sm text-muted">
        Fields marked <span aria-hidden="true" className="text-danger">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid gap-5 md:grid-cols-2">
        <Field id="fullName" label="Full name" required error={errors.fullName}>
          <Input id="fullName" name="fullName" autoComplete="name" value={form.fullName} onChange={(e) => set("fullName", e.target.value)} invalid={!!errors.fullName} aria-describedby={describedBy("fullName", null, errors.fullName)} required />
        </Field>
        <Field id="mobile" label="Mobile number" required error={errors.mobile} hint="10-digit Indian mobile number">
          <Input id="mobile" name="mobile" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="98765 43210" value={form.mobile} onChange={(e) => set("mobile", e.target.value)} invalid={!!errors.mobile} aria-describedby={describedBy("mobile", true, errors.mobile)} required />
        </Field>
        <Field id="email" label="Email" required error={errors.email}>
          <Input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} invalid={!!errors.email} aria-describedby={describedBy("email", null, errors.email)} required />
        </Field>
        <Field id="city" label="City" required error={errors.city}>
          <Input id="city" name="city" autoComplete="address-level2" value={form.city} onChange={(e) => set("city", e.target.value)} invalid={!!errors.city} aria-describedby={describedBy("city", null, errors.city)} required />
        </Field>
        <Field id="goal" label="Investment goal" required error={errors.goal}>
          <Select id="goal" name="goal" options={goalOptions} placeholder="Choose a goal" value={form.goal} onChange={(e) => set("goal", e.target.value)} invalid={!!errors.goal} aria-describedby={describedBy("goal", null, errors.goal)} required />
        </Field>
        <Field id="amountBand" label="Monthly investable amount" required error={errors.amountBand}>
          <Select id="amountBand" name="amountBand" options={AMOUNT_BANDS} placeholder="Choose a range" value={form.amountBand} onChange={(e) => set("amountBand", e.target.value)} invalid={!!errors.amountBand} aria-describedby={describedBy("amountBand", null, errors.amountBand)} required />
        </Field>
      </div>

      <Field id="message" label="Anything we should know" error={errors.message} hint="Existing investments, a deadline, a worry. Please do not include account numbers or PAN.">
        <Textarea id="message" name="message" rows={5} value={form.message} onChange={(e) => set("message", e.target.value)} invalid={!!errors.message} aria-describedby={describedBy("message", true, errors.message)} maxLength={2000} />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <Checkbox
        id="consent"
        name="consent"
        checked={form.consent}
        onChange={(e) => set("consent", e.target.checked)}
        error={errors.consent}
        label={`I agree to be contacted by ${site.firm.name} about my enquiry. My details will not be sold or shared with any third party.`}
      />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="accent" size="lg" disabled={submitting} aria-disabled={submitting}>
          {submitting ? "Sending…" : "Request a call back"}
        </Button>
        <p className="text-sm text-muted">No newsletter, no drip campaign. One call, and we both decide whether there is a fit.</p>
      </div>
    </form>
  );
}
