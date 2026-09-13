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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} className="rounded-2xl border border-mist-200 bg-white p-6">
              <span className="text-sm font-bold text-gold-600">0{i + 1}</span>
              <h3 className="mt-2 text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-mist-200 bg-white p-8 sm:p-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Start a Trade-In</h2>
          <div className="mt-6">
            <TradeInForm whatsappNumber={settings.whatsapp} />
          </div>
        </div>
      </Container>
    </div>
  );
}
