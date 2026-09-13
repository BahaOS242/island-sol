/**
 * Hero headline A/B testing architecture. Swap `HERO_HEADLINE_DEFAULT`
 * (or wire this up to a real experimentation/CMS config) to change the
 * live headline without touching the Hero component.
 */
export interface HeroHeadlineVariant {
  id: "A" | "B" | "C" | "D";
  headline: string;
}

export const HERO_HEADLINE_VARIANTS: HeroHeadlineVariant[] = [
  { id: "A", headline: "POWER WHEN THE ISLAND GOES DARK." },
  { id: "B", headline: "ISLAND POWER. WITHOUT THE FUEL." },
  { id: "C", headline: "YOUR POWER. ANYWHERE." },
  { id: "D", headline: "DON'T LET AN OUTAGE STOP YOUR DAY." },
];

export const HERO_HEADLINE_DEFAULT: HeroHeadlineVariant = HERO_HEADLINE_VARIANTS[0];
