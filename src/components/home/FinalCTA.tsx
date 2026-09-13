import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="bg-navy-950 py-20 text-center text-cream-50 sm:py-28">
      <Container className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          READY FOR YOUR NEXT OUTAGE?
        </h2>
        <p className="mt-4 text-lg text-cream-50/70">
          Find the right power system for your home, business, or everyday needs.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/power-calculator" variant="primary" size="lg">
            Find Your Power
          </Button>
          <Button href="/products" variant="secondary" size="lg" className="text-cream-50">
            Shop Power Stations
          </Button>
        </div>
      </Container>
    </section>
  );
}
