import { whyUs } from "@/content/process";
import { Section } from "@/components/ui/Section";
import { QuoteBlock } from "./QuoteBlock";

export function WhyUs() {
  return (
    <Section id="why-us" eyebrow="Why families choose us" title={<>Fewer products. <em>More</em> attention.</>}>
      <ol className="grid gap-px overflow-hidden rounded-card border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((w, i) => (
          <li key={w.title} className="bg-surface p-7">
            <span className="font-display text-2xl text-primary tabular" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 text-xl">{w.title}</h3>
            <p className="mt-2 text-muted">{w.body}</p>
          </li>
        ))}
      </ol>
      <div className="mt-10">
        <QuoteBlock />
      </div>
    </Section>
  );
}
