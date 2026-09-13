import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TradeInForm } from "@/components/forms/TradeInForm";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { buildMetadata } from "@/lib/seo";

const STEPS = [
  { title: "Tell us about your unit", description: "Submit the form with your current ISLAND SOL system and its condition." },
  { title: "Get evaluated", description: "We assess your unit's condition and estimate its trade-in value." },
  { title: "Upgrade", description: "Apply that value toward a larger system and pay the difference." },
];

export const metadata = buildMetadata({
  title: "Trade-In & Upgrade",
  description: "Trade in your current ISLAND SOL power station toward a larger system.",
  path: "/trade-in",
});

export default async function TradeInPage() {
  const settings = await getSiteSettings();
  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Upgrade Path"
          title="UPGRADE YOUR POWER."
          subtitle="Already own an ISLAND SOL power station and need more capacity? Trade it in toward a larger system."
        />

        <div className="mt-14 grid grid-cols-1 gap-8 border-t border-mist-300 pt-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step, i) => (
            <div key={step.title} className="sm:border-l sm:border-mist-300 sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
              <span className="font-mono text-sm text-gold-600">0{i + 1}</span>
              <h3 className="mt-2 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t-2 border-navy-950 bg-white p-8 sm:p-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Start a Trade-In</h2>
          <div className="mt-6">
            <TradeInForm whatsappNumber={settings.whatsapp} />
          </div>
        </div>
      </Container>
    </div>
  );
}
