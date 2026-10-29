import { ButtonLink } from "@/components/ui/Button";

export function ReferralCta() {
  return (
    <section aria-labelledby="referral-heading" className="container-content py-16 md:py-20">
      <div className="grid items-center gap-6 border-t border-border pt-16 grid-cols-1 md:grid-cols-12">
        <h2 id="referral-heading" className="text-3xl md:col-span-7 md:text-4xl">
          Know someone who could use a <em>second opinion</em>?
        </h2>
        <div className="md:col-span-5">
          <p className="text-muted">
            Introduce them and we will offer the same first conversation: free, unhurried, and with no products named. We only call
            them if they ask us to.
          </p>
          <ButtonLink href="/contact?ref=referral&source=referral" variant="secondary" className="mt-5">
            Introduce someone
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
