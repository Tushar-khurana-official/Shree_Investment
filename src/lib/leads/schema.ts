import { z } from "zod";
import { goalOptions } from "@/content/goals";

export const AMOUNT_BANDS = [
  { value: "under-10k", label: "Under ₹10,000" },
  { value: "10k-25k", label: "₹10,000 to ₹25,000" },
  { value: "25k-50k", label: "₹25,000 to ₹50,000" },
  { value: "50k-1l", label: "₹50,000 to ₹1,00,000" },
  { value: "above-1l", label: "Above ₹1,00,000" },
] as const;

export const AMOUNT_BAND_VALUES = AMOUNT_BANDS.map((b) => b.value) as [string, ...string[]];
export const GOAL_VALUES = goalOptions.map((g) => g.value) as [string, ...string[]];
export const LEAD_SOURCES = ["contact", "calculator", "goal", "referral", "services", "home"] as const;

/**
 * Normalises an Indian mobile number: strips spaces, dashes, a leading +91 / 91 / 0.
 * Returns the 10-digit number, or null if it is not a valid Indian mobile (starts with 6, 7, 8 or 9).
 */
export function normaliseIndianMobile(input: string): string | null {
  let digits = input.replace(/[\s\-().]/g, "");
  if (digits.startsWith("+91")) digits = digits.slice(3);
  else if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  else if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export const leadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(100, "Please keep your name under 100 characters.")
    .regex(/^[\p{L}\p{M} .'-]+$/u, "Please use letters only in your name."),
  mobile: z
    .string()
    .trim()
    .refine((v) => normaliseIndianMobile(v) !== null, "Enter a 10-digit Indian mobile number, for example 98765 43210.")
    .transform((v) => normaliseIndianMobile(v) as string),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200),
  goal: z.enum(GOAL_VALUES, { message: "Please choose a goal, or \"Not sure yet\"." }),
  amountBand: z.enum(AMOUNT_BAND_VALUES, { message: "Please choose a monthly amount." }),
  city: z.string().trim().min(2, "Please enter your city.").max(80),
  message: z.string().trim().max(2000, "Please keep the message under 2,000 characters.").optional().default(""),
  consent: z.literal(true, { message: "Please agree to be contacted so we can respond to your enquiry." }),
  referral: z.boolean().optional().default(false),
  source: z.enum(LEAD_SOURCES).optional().default("contact"),
  /** Honeypot. Must be empty; checked separately so bots get a normal-looking response. */
  website: z.string().optional().default(""),
});

export type LeadInput = z.input<typeof leadSchema>;
export type Lead = z.output<typeof leadSchema>;

export type FieldErrors = Partial<Record<keyof LeadInput, string>>;

export function validateLead(data: unknown): { ok: true; lead: Lead } | { ok: false; errors: FieldErrors } {
  const result = leadSchema.safeParse(data);
  if (result.success) return { ok: true, lead: result.data };
  const errors: FieldErrors = {};
  for (const issue of result.error.issues) {
    const key = issue.path[0] as keyof LeadInput;
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

export function isHoneypotTripped(data: unknown): boolean {
  if (!data || typeof data !== "object") return false;
  const v = (data as Record<string, unknown>).website;
  return typeof v === "string" && v.trim().length > 0;
}

export function amountBandLabel(value: string): string {
  return AMOUNT_BANDS.find((b) => b.value === value)?.label ?? value;
}

export function goalLabel(value: string): string {
  return goalOptions.find((g) => g.value === value)?.label ?? value;
}
