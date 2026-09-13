import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getUseCases } from "@/lib/data/useCases";

/**
 * One oversized featured statement beside a compact list, not a 2x2 grid
 * of identical bordered cards — intentional asymmetry rather than equal
 * cells (see brand guidelines against repeating card grids).
 */
export async function UseCases() {
  const useCases = await getUseCases();
  if (useCases.length === 0) return null;

  const [featured, ...rest] = useCases;

  return (
    <section className="bg-navy-950 py-20 text-cream-50 sm:py-28">
      <Container>
        <SectionHeading title="KEEP LIFE MOVING." />

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-[7fr_5fr] lg:gap-20">
          {featured ? (
            <div>
              <h3 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                {featured.title}
              </h3>
              <p className="mt-5 max-w-sm text-base leading-relaxed text-cream-50/60">
                {featured.description}
              </p>
            </div>
          ) : null}

          <div className="border-t border-cream-50/10">
            {rest.map((useCase) => (
              <div key={useCase.id} className="border-b border-cream-50/10 py-6">
                <h4 className="text-lg font-bold tracking-tight">{useCase.title}</h4>
                <p className="mt-1.5 text-sm leading-relaxed text-cream-50/55">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
