import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * A full-bleed statement, not a floating rounded card dropped into the
 * page — see brand guidelines against "giant rounded rectangles."
 */
export function TradeInTeaser() {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-20 text-cream-50 sm:py-28">
      <svg
        className="pointer-events-none absolute -left-16 -bottom-16 h-64 w-64 opacity-[0.25]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-turquoise-500)" strokeWidth="1" />
      </svg>

      <Container className="relative">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-400">Upgrade Path</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
          UPGRADE YOUR POWER.
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-8 border-t border-cream-50/15 pt-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <p className="max-w-xl text-base leading-relaxed text-cream-50/65">
            Already own an ISLAND SOL power station and need more capacity?
            Trade it in toward a larger system — we&rsquo;ll evaluate your
            unit and apply its value toward an upgrade.
          </p>
          <Button href="/trade-in" variant="primary" size="lg" className="justify-self-start lg:justify-self-end">
            Start a Trade-In
          </Button>
        </div>
      </Container>
    </section>
  );
}
