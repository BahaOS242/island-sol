import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getSolutions } from "@/lib/data/solutions";
import { solutionCta } from "@/lib/solutionCta";

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

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map((solution, i) => {
            const cta = solutionCta(solution);
            return (
              <div
                key={solution.id}
                className="flex flex-col rounded-3xl border border-mist-200 bg-white p-8 shadow-[0_1px_2px_rgba(10,13,18,0.04)]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-600">
                  Tier {i + 1}
                </p>
                <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">{solution.solutionName}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{solution.description}</p>

                <ul className="mt-6 space-y-2">
                  {solution.commonAppliances.map((example) => (
                    <li key={example} className="flex items-center gap-2 text-sm text-slate-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                      {example}
                    </li>
                  ))}
                </ul>

                <Button href={cta.href} variant="secondary" className="mt-8 text-ink self-start">
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
