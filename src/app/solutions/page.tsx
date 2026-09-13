import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GeneratorComparison } from "@/components/home/GeneratorComparison";
import { PRODUCT_TIERS } from "@/lib/data/tiers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Backup Power Solutions — Home & Business",
  description:
    "Portable power, home essentials backup, and pro backup systems for homes and businesses in The Bahamas — matched to how much you actually need to run.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="BACKUP POWER, SIZED TO YOUR LIFE."
          subtitle="Every home and business has a different amount to keep running. These are the three ways ISLAND SOL scales to meet that."
        />

        <div className="mt-14 space-y-14">
          {PRODUCT_TIERS.map((tier, i) => (
            <div
              key={tier.tierId}
              className="grid grid-cols-1 items-center gap-8 rounded-3xl border border-mist-200 bg-white p-8 sm:p-10 lg:grid-cols-2"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-600">
                  {tier.eyebrow}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {tier.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">{tier.description}</p>
                <Button href={tier.ctaHref} variant="primary" className="mt-6">
                  {tier.ctaLabel}
                </Button>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Built for:</p>
                <ul className="mt-3 grid grid-cols-2 gap-2">
                  {tier.poweredExamples.map((example) => (
                    <li key={example} className="rounded-xl bg-cream-100 px-4 py-3 text-sm text-slate-700">
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className="mt-20">
        <GeneratorComparison />
      </div>
    </div>
  );
}
