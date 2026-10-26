import type { Metadata } from "next";
import { site } from "@config";
import { buildMetadata } from "@/lib/seo";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { ServicesOverview } from "@/components/sections/ServicesOverview";
import { SipPreview } from "@/components/sections/SipPreview";
import { GoalCards } from "@/components/sections/GoalCards";
import { ProtectCallout } from "@/components/sections/ProtectCallout";
import { KycSection } from "@/components/sections/KycSection";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WhyUs } from "@/components/sections/WhyUs";
import { FundHouses } from "@/components/sections/FundHouses";
import { ClientPortalTeaser } from "@/components/sections/ClientPortalTeaser";
import { ReferralCta } from "@/components/sections/ReferralCta";
import { CtaBand } from "@/components/sections/CtaBand";
import { DistributorNotice } from "@/components/sections/DistributorNotice";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  ...buildMetadata({
    title: `${site.firm.name}: ${site.firm.tagline}`,
    description: site.firm.description,
    path: "/",
  }),
  title: { absolute: `${site.firm.name}: ${site.firm.tagline}` },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <ServicesOverview />
      <Section
        id="sip-preview"
        eyebrow="Try the numbers"
        title={<>What a monthly SIP <em className="italic text-primary">could</em> become.</>}
        intro="Move the slider. The numbers are an illustration at an assumed return, not a forecast."
      >
        <SipPreview />
      </Section>
      <GoalCards />
      <ProtectCallout />
      <KycSection />
      <ProcessSteps />
      <WhyUs />
      <FundHouses />
      <section aria-label="Our registration" className="container-content pb-16">
        <DistributorNotice />
      </section>
      <ClientPortalTeaser />
      <ReferralCta />
      <CtaBand />
    </>
  );
}
