import Link from "next/link";
import { processSteps } from "@/content/process";
import { Section } from "@/components/ui/Section";
import { Stepper } from "@/components/ui/Stepper";
import { ArrowIcon } from "@/components/ui/Button";

export function ProcessSteps() {
  return (
    <Section
      id="how-we-work"
      eyebrow="How it works"
      title={<>Four steps. The last one <em>never</em> ends.</>}
      intro={<p>Most of the value is in the fourth step.</p>}
    >
      <Stepper steps={processSteps.map((s) => ({ number: s.number, title: s.title, timeline: s.timeline, content: <p>{s.summary}</p> }))} />
      <Link href="/approach" className="mt-8 inline-flex items-center gap-2 font-medium text-primary hover:underline">
        The full process, step by step <ArrowIcon />
      </Link>
    </Section>
  );
}
