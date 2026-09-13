import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GeneratorComparison } from "@/components/home/GeneratorComparison";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "How It Works",
  description:
    "How ISLAND SOL helps you find, buy, and set up the right portable power or backup energy system for your home or business.",
  path: "/how-it-works",
});

const EFFORT_POINTS = [
  "No gasoline to store or haul",
  "No oil changes",
  "No exhaust",
  "Quiet operation",
  "Simple setup",
];

export default function HowItWorksPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="How It Works"
          title="FROM QUESTION TO POWERED UP."
          subtitle="No electronics catalog, no guesswork — tell us what you need to keep running and we'll help you find the right system."
        />
      </Container>

      <div className="mt-6">
        <HowItWorks />
      </div>

      <Container className="mt-16">
        <div className="border-l-2 border-gold-500 bg-cream-100 p-8 sm:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Less to deal with than a generator.</h2>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {EFFORT_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                {point}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">Depending on the specific model.</p>
        </div>
      </Container>

      <div className="mt-16">
        <GeneratorComparison />
      </div>

      <Container className="mt-4 flex justify-center pb-4">
        <Button href="/power-calculator" variant="primary" size="lg">
          Find Your Power
        </Button>
      </Container>
    </div>
  );
}
