import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GENERATOR_COMPARISON } from "@/lib/data/comparison";

export function GeneratorComparison() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="A Different Kind of Backup"
          title="A DIFFERENT KIND OF BACKUP POWER."
          subtitle="How rechargeable power stations compare to a traditional fuel generator, category by category."
        />

        <div className="mt-10 overflow-x-auto">
          <div className="min-w-[560px] rounded-3xl border border-mist-200">
            <div className="grid grid-cols-3 border-b border-mist-200 bg-cream-100 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <div className="p-4"> </div>
              <div className="p-4">Fuel Generator</div>
              <div className="p-4 text-navy-900">Power Station</div>
            </div>
            {GENERATOR_COMPARISON.map((row, i) => (
              <div
                key={row.label}
                className={`grid grid-cols-3 text-sm ${i % 2 === 0 ? "bg-white" : "bg-cream-50"}`}
              >
                <div className="p-4 font-semibold text-ink">{row.label}</div>
                <div className="p-4 text-slate-600">{row.generator}</div>
                <div className="p-4 text-slate-800">{row.powerStation}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
