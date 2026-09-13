import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { GeneratorComparison } from "@/components/home/GeneratorComparison";
import { getSolutions } from "@/lib/data/solutions";
import { solutionCta } from "@/lib/solutionCta";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Backup Power Solutions — Home & Business",
  description:
    "Portable power, home essentials backup, and pro backup systems for homes and businesses in The Bahamas — matched to how much you actually need to run.",
  path: "/solutions",
});

export default async function SolutionsPage() {
  const solutions = await getSolutions();

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Solutions"
          title="BACKUP POWER, SIZED TO YOUR LIFE."
          subtitle="Every home and business has a different amount to keep running. These are the ways ISLAND SOL scales to meet that."
        />

        <div className="mt-14 divide-y divide-mist-300 border-t border-mist-300">
          {solutions.map((solution, i) => {
            const cta = solutionCta(solution);
            return (
              <div key={solution.id} className="grid grid-cols-1 items-center gap-8 py-14 lg:grid-cols-2">
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <p className="font-mono text-sm text-turquoise-700">0{i + 1}</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                    {solution.solutionName}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">{solution.description}</p>
                  <Button href={cta.href} variant="primary" className="mt-7">
                    {cta.label}
                  </Button>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Built for</p>
                  <p className="mt-3 text-lg leading-relaxed text-slate-700">
                    {solution.commonAppliances.join(" · ")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>

      <div className="mt-20">
        <GeneratorComparison />
      </div>
    </div>
  );
}
