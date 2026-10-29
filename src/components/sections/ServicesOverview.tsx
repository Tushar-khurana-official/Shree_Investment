import Link from "next/link";
import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function ServicesOverview() {
  return (
    <Section
      id="services"
      eyebrow="Our services"
      title={<>Three ways to grow, <em>one trusted</em> partner.</>}
      intro="Shares, mutual funds and property: guidance on all three from one person who knows your whole picture."
    >
      <ol className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {services.map((s) => (
          <li key={s.id}>
            <article className="group flex h-full flex-col rounded-card border border-border bg-surface p-7 transition-[transform,border-color] duration-[250ms] hover:-translate-y-1 hover:border-gold">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-gold text-gold">
                  <Icon name={s.icon} className="h-8 w-8" />
                </span>
                <span className="font-ornament text-3xl text-gold tabular" aria-hidden="true">
                  {s.number}
                </span>
              </div>
              <h3 className="mt-6 text-xl uppercase tracking-wide">{s.title}</h3>
              <p className="mt-3 text-sm text-fg">
                <span className="sr-only">Includes: </span>
                {s.highlights.map((h, i) => (
                  <span key={h}>
                    {i > 0 && " "}
                    {i > 0 && (
                      <span aria-hidden="true" className="px-1.5 text-gold">
                        |
                      </span>
                    )}
                    {" "}
                    <span className="whitespace-nowrap">{h}</span>
                  </span>
                ))}
              </p>
              <p className="mt-4 flex-1 text-muted">{s.short}</p>
              <Link href={`/services#${s.id}`} className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                Explore {s.title.toLowerCase().replace(" investments", "")} <ArrowIcon />
              </Link>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  );
}
