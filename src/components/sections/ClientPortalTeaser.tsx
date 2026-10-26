import { ButtonLink } from "@/components/ui/Button";

export function ClientPortalTeaser() {
  return (
    <section aria-labelledby="portal-heading" className="container-content py-6">
      <div className="flex flex-col items-start justify-between gap-6 rounded-card border border-border bg-surface-2 p-8 md:flex-row md:items-center md:p-10">
        <div>
          <p className="eyebrow">Existing clients</p>
          <h2 id="portal-heading" className="mt-2 text-2xl md:text-3xl">
            Your whole portfolio, in your pocket.
          </h2>
          <p className="mt-2 max-w-xl text-muted">Statements, SIP mandates and transactions in one secure app, held in your own name.</p>
        </div>
        <ButtonLink href="/clients" variant="primary">
          For existing clients
        </ButtonLink>
      </div>
    </section>
  );
}
