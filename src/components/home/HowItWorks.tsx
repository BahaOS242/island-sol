import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STEPS = [
  {
    step: "01",
    title: "Tell us what you need to power.",
    description: "Use the power calculator or talk to us directly about your home or business.",
  },
  {
    step: "02",
    title: "Get a recommendation.",
    description: "We match your load to the right ISLAND SOL system — no guesswork.",
  },
  {
    step: "03",
    title: "Power through the outage.",
    description: "Recharge from an outlet or solar panel and keep the essentials running.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-cream-100 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="How It Works" title="FROM QUESTION TO POWERED UP." />

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.step}>
              <span className="text-sm font-bold text-gold-600">{s.step}</span>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
