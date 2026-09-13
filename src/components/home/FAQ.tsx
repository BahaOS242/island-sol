import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFaqItems } from "@/lib/data/faq";

export async function FAQ() {
  const items = await getFaqItems();
  if (items.length === 0) return null;

  return (
    <section className="bg-cream-100 py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading title="FREQUENTLY ASKED QUESTIONS" align="center" className="mx-auto" />

        <div className="mt-10 divide-y divide-mist-300 rounded-3xl border border-mist-200 bg-white">
          {items.map((item) => (
            <details key={item.id} className="group p-6 open:bg-cream-50/60">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink">
                {item.question}
                <span className="shrink-0 text-lg text-slate-400 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
