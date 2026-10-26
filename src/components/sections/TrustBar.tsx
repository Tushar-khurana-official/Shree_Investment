import { site, isPlaceholder } from "@config";

export function TrustBar() {
  const items = [
    { label: "AMFI Registered", detail: isPlaceholder(site.registration.arn) ? "Mutual fund distributor" : site.registration.arn },
    ...site.founder.qualifications.map((q) => ({ label: q.short, detail: q.short === "NISM Series V-A" ? "Certified" : "Qualified" })),
    { label: site.founder.degree.short, detail: "Degree" },
  ];
  return (
    <section aria-label="Registrations and qualifications" className="border-y border-border bg-surface">
      <ul className="container-content grid grid-cols-2 divide-border py-6 sm:grid-cols-3 lg:flex lg:justify-between lg:divide-x">
        {items.map((i) => (
          <li key={i.label} className="flex items-center gap-3 py-2 lg:px-6 lg:first:pl-0 lg:last:pr-0">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 shrink-0 text-primary" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M10 2 3.5 4.5v5c0 4 2.8 7 6.5 8.5 3.7-1.5 6.5-4.5 6.5-8.5v-5L10 2Z" strokeLinejoin="round" />
              <path d="m7 10 2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              <span className="block text-sm font-semibold">{i.label}</span>
              <span className="block text-xs text-muted">{i.detail}</span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
