import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HeroProductVisual } from "@/components/home/HeroProductVisual";
import { getHeroConfig } from "@/lib/data/hero";

export async function Hero() {
  const hero = await getHeroConfig();

  return (
    <section className="relative overflow-hidden bg-navy-950 text-cream-50">
      {/*
        One restrained motif, not a decorative wash: a thin horizon line
        low in the frame, referencing island light rather than a literal
        beach scene. No blurred glow, no gradient blob.
      */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-[18%] h-px opacity-40"
        style={{ background: "linear-gradient(90deg, transparent, var(--color-gold-500), transparent)" }}
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
      <Container className="relative grid grid-cols-1 items-center gap-16 py-20 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:py-32">
        <div>
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="mt-5 max-w-xl text-[2.75rem] font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {hero.headline}
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-cream-50/70">{hero.subheadline}</p>

          <div className="mt-9 lg:hidden">
            <HeroProductVisual />
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href={hero.primaryCtaLink} variant="primary" size="lg">
              {hero.primaryCtaLabel}
            </Button>
            <Button href={hero.secondaryCtaLink} variant="secondary" size="lg" className="text-cream-50">
              {hero.secondaryCtaLabel}
            </Button>
          </div>

          <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cream-50/40">
            {hero.trustText}
          </p>
        </div>

        <div className="hidden lg:block">
          <HeroProductVisual />
        </div>
      </Container>
    </section>
  );
}
