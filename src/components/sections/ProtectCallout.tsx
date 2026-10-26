import Link from "next/link";
import { isPlaceholder, site } from "@config";
import { INSURANCE_STATEMENT } from "@/content/services";

export function ProtectCallout() {
  return (
    <section aria-labelledby="protect-heading" className="container-content py-6">
      <div className="grid gap-6 rounded-card bg-primary p-8 text-on-primary grid-cols-1 md:grid-cols-12 md:p-12">
        <div className="md:col-span-5">
          <p className="eyebrow !text-on-primary/80">Protect the plan</p>
          <h2 id="protect-heading" className="mt-3 text-3xl md:text-4xl">
            Cover first. <em className="italic">Then</em> invest.
          </h2>
        </div>
        <div className="space-y-4 text-on-primary/90 md:col-span-7">
          <p>
            A plan that a hospital bill or an untimely death can undo is not a plan. Term life cover and a health floater, sized to
            your liabilities, come before the first SIP.
          </p>
          <p className="font-medium text-on-primary">{INSURANCE_STATEMENT}</p>
          <p className="text-sm">
            Insurance is distributed under a separate IRDAI registration
            {site.registration.insurance && !isPlaceholder(site.registration.insurance.number) ? ` (${site.registration.insurance.number})` : ""}, not under our AMFI registration.{" "}
            <Link href="/services#insurance" className="underline">
              How we handle insurance
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
