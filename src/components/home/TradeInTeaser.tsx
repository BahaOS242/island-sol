import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function TradeInTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-8 rounded-3xl bg-navy-950 p-10 text-cream-50 sm:p-14 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-400">
              Upgrade Path
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              UPGRADE YOUR POWER.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-cream-50/70">
              Already own an ISLAND SOL power station and need more capacity?
              Trade it in toward a larger system — we&rsquo;ll evaluate your
              unit and apply its value toward an upgrade.
            </p>
          </div>
          <Button href="/trade-in" variant="primary" size="lg" className="justify-self-start lg:justify-self-auto">
            Start a Trade-In
          </Button>
        </div>
      </Container>
    </section>
  );
}
