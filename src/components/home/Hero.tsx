import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeroProductVisual } from "@/components/home/HeroProductVisual";
import { HERO_HEADLINE_DEFAULT } from "@/lib/data/heroVariants";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-cream-50">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 15% 0%, rgba(242,184,75,0.10), transparent), radial-gradient(50% 50% at 90% 100%, rgba(47,215,196,0.10), transparent)",
        }}
        aria-hidden="true"
      />

      {/*
        Mobile order (per brand spec): eyebrow, headline, subhead, hero
        product, primary CTA, secondary CTA, trust indicators. Desktop:
        two-column layout with the product on the right. Rather than
        reordering one shared image with CSS (which fights a natural
        mobile reading order against a two-column desktop grid), the
        product visual renders twice — once inline for mobile, once in the
        desktop column — each hidden at the other breakpoint. It's a cheap
        inline illustration today; if this becomes a real photo, keep it
        as a single `next/image` and let the browser cache dedupe the two
        instances rather than reintroducing fragile grid-row spanning.
      */}
      <Container className="relative grid grid-cols-1 items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <Eyebrow>Power for Island Life</Eyebrow>

          <h1 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            {HERO_HEADLINE_DEFAULT.headline}
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-50/75">
            Reliable portable power for homes, businesses, and everyday life in
            The Bahamas — without the noise, fuel, or fumes of a traditional
            generator.
          </p>

          <div className="mt-8 lg:hidden">
            <HeroProductVisual />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={PRIMARY_CTA.href} variant="primary" size="lg">
              Shop Power Stations
            </Button>
            <Button href={SECONDARY_CTA.href} variant="secondary" size="lg" className="text-cream-50">
              Find Your Power
            </Button>
          </div>

          <p className="mt-6 text-sm font-medium tracking-wide text-cream-50/50">
            Quiet <span className="mx-2 text-cream-50/25">•</span> Portable{" "}
            <span className="mx-2 text-cream-50/25">•</span> Rechargeable
          </p>
        </div>

        <div className="hidden lg:block">
          <HeroProductVisual />
        </div>
      </Container>
    </section>
  );
}
