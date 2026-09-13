import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PowerCalculator } from "@/components/calculator/PowerCalculator";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Power Calculator — Find Your Power",
  description:
    "Tell us what you need to keep running and get a recommended ISLAND SOL power system, sized to your actual load.",
  path: "/power-calculator",
});

export default function PowerCalculatorPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Power Calculator"
          title="WHAT DO YOU NEED TO POWER?"
          subtitle="Tell us what you need to keep running and we'll help you find the right system."
        />
        <div className="mt-12">
          <PowerCalculator />
        </div>
      </Container>
    </div>
  );
}
