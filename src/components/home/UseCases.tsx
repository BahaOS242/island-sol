import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getUseCases } from "@/lib/data/useCases";

export async function UseCases() {
  const useCases = await getUseCases();
  if (useCases.length === 0) return null;

  return (
    <section className="bg-navy-950 py-20 text-cream-50 sm:py-28">
      <Container>
        <SectionHeading title="KEEP LIFE MOVING." />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.map((useCase) => (
            <div
              key={useCase.id}
              className="rounded-3xl border border-cream-50/10 bg-navy-900/60 p-6"
            >
              <h3 className="text-lg font-bold tracking-tight">{useCase.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream-50/60">{useCase.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
