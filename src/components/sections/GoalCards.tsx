import Link from "next/link";
import { goalsByHorizon } from "@/content/goals";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { ArrowIcon } from "@/components/ui/Button";

export function GoalCards() {
  const sorted = goalsByHorizon();
  return (
    <Section
      id="goals"
      eyebrow="Goals we plan for"
      title={<>Start with the goal, <em>not</em> the product.</>}
      intro="Each goal gets its own date, amount and mix of investments. The closer the date, the less risk the money should carry."
    >
      <p className="mb-6 flex items-center gap-2 text-sm text-muted">
        <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 3v10M4 13l-2-2M4 13l2-2M9 4h5M9 8h4M9 12h2" strokeLinecap="round" />
        </svg>
        Sorted by how long you have
      </p>
      <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((g, i) => (
          <li
            key={g.id}
            className="group flex flex-col rounded-card border border-border bg-surface p-7 transition-[transform,border-color,box-shadow] duration-[250ms] ease-out hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-24px_color-mix(in_srgb,var(--primary)_45%,transparent)] focus-within:-translate-y-1 focus-within:border-primary"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow tabular" aria-hidden="true">
                Goal {String(i + 1).padStart(2, "0")}
              </span>
              <Badge
                tone={g.years === null ? "warning" : "primary"}
                className="translate-x-2 transition-transform duration-[250ms] ease-out group-hover:translate-x-0 group-focus-within:translate-x-0"
              >
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <circle cx="8" cy="8" r="6" />
                  <path d="M8 5v3l2 1.5" strokeLinecap="round" />
                </svg>
                {g.horizonLabel}
              </Badge>
            </div>
            <h3 className="mt-5 text-2xl">{g.title}</h3>
            <p className="mt-3 flex-1 text-muted">{g.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2" aria-label="Typical building blocks">
              {g.tags.map((t) => (
                <li key={t}>
                  <Badge tone="outline">{t}</Badge>
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?goal=${g.id}&source=goal`}
              className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline"
              aria-label={`Plan for this: ${g.title}`}
            >
              Plan for this <ArrowIcon />
            </Link>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm text-muted">
        The building blocks shown are typical categories, not recommendations. What fits depends on your situation.
      </p>
    </Section>
  );
}
