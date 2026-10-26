import Link from "next/link";
import { services, INSURANCE_STATEMENT } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { ArrowIcon } from "@/components/ui/Button";
import { FadeUp } from "@/components/ui/FadeUp";

export function ServicesOverview() {
  return (
    <Section id="services" eyebrow="What we do" title={<>Three things, done <em className="italic text-primary">properly</em>.</>} intro="We distribute mutual funds, insurance and fixed-income products, and look after them for as long as you hold them.">
      <ol className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <li key={s.id}>
            <FadeUp delay={i * 100} className="h-full">
              <article className="flex h-full flex-col rounded-card border border-border bg-surface p-7">
                <span className="font-display text-4xl text-primary tabular" aria-hidden="true">
                  {s.number}
                </span>
                <h3 className="mt-6 text-2xl">{s.title}</h3>
                <p className="mt-3 flex-1 text-muted">{s.short}</p>
                {s.id === "insurance" && (
                  <p className="mt-4 border-l-2 border-primary pl-3 text-sm font-medium">{INSURANCE_STATEMENT}</p>
                )}
                <Link href={`/services#${s.id}`} className="mt-6 inline-flex items-center gap-2 font-medium text-primary hover:underline">
                  More on {s.title.toLowerCase()} <ArrowIcon />
                </Link>
              </article>
            </FadeUp>
          </li>
        ))}
      </ol>
    </Section>
  );
}
