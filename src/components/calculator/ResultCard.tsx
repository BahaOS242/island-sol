import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { severityToOrdinal } from "@/lib/calculator/engine";
import { solutionCta } from "@/lib/solutionCta";
import type { CalculatorResult } from "@/lib/types/calculator";
import type { Solution } from "@/lib/types/product";

export function ResultCard({ result, solutions }: { result: CalculatorResult; solutions: Solution[] }) {
  const ordinal = severityToOrdinal(result.recommendedTier);
  const sorted = [...solutions].sort((a, b) => a.sortOrder - b.sortOrder);
  const matched = sorted[Math.min(ordinal, sorted.length) - 1] ?? sorted[sorted.length - 1];
  const cta = matched ? solutionCta(matched) : { label: "Talk to ISLAND SOL", href: "/support" };

  return (
    <div className="border-t-2 border-gold-500 bg-navy-950 p-6 text-cream-50 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-500">
        Your Recommended System
      </p>
      <h3 className="mt-2 text-2xl font-bold tracking-tight">{matched?.solutionName ?? "Custom System"}</h3>

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div>
          <dt className="text-xs uppercase tracking-wide text-cream-50/50">Estimated Load</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{result.totalRunningWattage} W</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-cream-50/50">Recommended Output</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{result.recommendedOutputClassW}W class</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-wide text-cream-50/50">Est. Daily Energy</dt>
          <dd className="mt-1 text-lg font-semibold tabular-nums">{result.estimatedDailyWh} Wh</dd>
        </div>
      </dl>

      <p className="mt-6 text-xs leading-relaxed text-cream-50/50">
        These figures are estimates based on typical appliance wattage, not a
        guarantee. Actual runtime depends on your specific devices, their
        real power draw, and operating conditions. Talk to us for a precise,
        product-matched recommendation.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button href={cta.href} variant="primary" size="lg">
          Get My Recommendation
        </Button>
        <WhatsAppLink
          message={`Hi ISLAND SOL, the power calculator recommended a ${matched?.solutionName ?? "system"} for my needs (~${result.totalRunningWattage}W). Can you help me find the right product?`}
          variant="secondary"
          className="text-cream-50"
        >
          Talk to ISLAND SOL
        </WhatsAppLink>
      </div>
    </div>
  );
}
