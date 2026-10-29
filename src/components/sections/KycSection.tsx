import { site } from "@config";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export function KycSection() {
  return (
    <Section
      id="kyc"
      eyebrow="New to investing? Start here"
      title={<>One KYC, <em>every</em> fund house.</>}
      intro="KYC (Know Your Customer) is a one-time identity check required before your first mutual fund purchase. Once it is registered with a KRA, it is valid across all fund houses."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-7">
          <h3 className="text-xl">Already done KYC somewhere?</h3>
          <p className="mt-2 text-muted">
            Check your status with your PAN on the CVL KRA website. &quot;KYC Validated&quot; or &quot;KYC Registered&quot; means you
            are ready to invest.
          </p>
          <ButtonLink href={site.links.kycCheck} external variant="secondary" className="mt-6">
            Check your KYC status
          </ButtonLink>
        </div>
        <div className="rounded-card border border-border bg-surface p-7">
          <h3 className="text-xl">Starting fresh?</h3>
          <p className="mt-2 text-muted">
            Complete eKYC online with your PAN, Aadhaar and a selfie, usually in about 15 minutes. We are happy to do it with you on a
            call.
          </p>
          <ButtonLink href={site.links.kycStart} external variant="primary" className="mt-6">
            Complete KYC and start investing
          </ButtonLink>
        </div>
      </div>
    </Section>
  );
}
