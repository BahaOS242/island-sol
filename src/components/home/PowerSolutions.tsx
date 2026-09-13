import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getSolutions } from "@/lib/data/solutions";
import { solutionCta } from "@/lib/solutionCta";

/**
 * An editorial numbered list, not three identical bordered cards — each
 * row is full-width with a large index numeral, asymmetric internal
 * columns, and a thin rule separator. See brand guidelines against
 * repeating the same card three times.
 */
export async function PowerSolutions() {
  const solutions = await getSolutions();
  if (solutions.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Power Solutions"
          title="POWER FOR YOUR NEEDS"
          subtitle="From keeping your essentials running to backing up your home or business, find the system that fits the job."
        />

        <div className="mt-14 border-t border-mist-300">
          {solutions.map((solution, i) => {
            const cta = solutionCta(solution);
            return (
              <div
                key={solution.id}
                className="grid grid-cols-1 gap-6 border-b border-mist-300 py-10 sm:grid-cols-[auto_1fr] sm:gap-10 lg:grid-cols-[auto_1fr_1fr_auto] lg:items-center"
              >
                <span className="font-mono text-sm text-slate-400">0{i + 1}</span>

                <div className="lg:max-w-sm">
                  <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {solution.solutionName}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{solution.description}</p>
                </div>

                <p className="text-sm leading-relaxed text-slate-500 lg:text-right">
                  {solution.commonAppliances.join(" · ")}
                </p>

                <Button href={cta.href} variant="secondary" className="text-ink self-start lg:justify-self-end">
                  {cta.label}
                </Button>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
