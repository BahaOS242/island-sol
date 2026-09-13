import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PowerCalculator } from "@/components/calculator/PowerCalculator";
import { getApplianceDefinitions } from "@/lib/data/appliances";
import { getSolutions } from "@/lib/data/solutions";

export async function PowerCalculatorSection() {
  const [appliances, solutions] = await Promise.all([getApplianceDefinitions(), getSolutions()]);

  return (
    <section id="power-calculator" className="bg-cream-100 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Power Calculator"
          title="WHAT DO YOU NEED TO POWER?"
          subtitle="Tell us what you need to keep running and we'll help you find the right system."
        />
        <div className="mt-12">
          <PowerCalculator appliances={appliances} solutions={solutions} />
        </div>
      </Container>
    </section>
  );
}
