import { queryCollection } from "@/lib/wix/client";
import { HERO_HEADLINE_DEFAULT } from "@/lib/data/heroVariants";

export interface HeroConfig {
  eyebrow: string;
  headline: string;
  subheadline: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  heroImage: string | null;
  mobileHeroImage: string | null;
  trustText: string;
  sortOrder: number;
}

interface RawHeroConfig {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  heroImage?: string;
  mobileHeroImage?: string;
  trustText?: string;
  active?: boolean;
  sortOrder?: number;
}

const FALLBACK_HERO: HeroConfig = {
  eyebrow: "Power for Island Life",
  headline: HERO_HEADLINE_DEFAULT.headline,
  subheadline:
    "Reliable portable power for homes, businesses, and everyday life in The Bahamas — without the noise, fuel, or fumes of a traditional generator.",
  primaryCtaLabel: "Shop Power Stations",
  primaryCtaLink: "/products",
  secondaryCtaLabel: "Find Your Power",
  secondaryCtaLink: "/power-calculator",
  heroImage: null,
  mobileHeroImage: null,
  trustText: "Quiet • Portable • Rechargeable",
  sortOrder: 0,
};

/**
 * Returns the active hero configuration with the lowest sortOrder. Falls
 * back to a hardcoded default if the CMS is unreachable or has no active
 * hero configured, so the homepage never renders with a missing headline.
 */
export async function getHeroConfig(): Promise<HeroConfig> {
  const items = await queryCollection<RawHeroConfig>("hero-config");
  const active = items
    .filter((item) => item.data.active ?? true)
    .sort((a, b) => (a.data.sortOrder ?? 0) - (b.data.sortOrder ?? 0));

  const chosen = active[0];
  if (!chosen || !chosen.data.headline) return FALLBACK_HERO;

  return {
    eyebrow: chosen.data.eyebrow ?? FALLBACK_HERO.eyebrow,
    headline: chosen.data.headline,
    subheadline: chosen.data.subheadline ?? FALLBACK_HERO.subheadline,
    primaryCtaLabel: chosen.data.primaryCtaLabel ?? FALLBACK_HERO.primaryCtaLabel,
    primaryCtaLink: chosen.data.primaryCtaLink ?? FALLBACK_HERO.primaryCtaLink,
    secondaryCtaLabel: chosen.data.secondaryCtaLabel ?? FALLBACK_HERO.secondaryCtaLabel,
    secondaryCtaLink: chosen.data.secondaryCtaLink ?? FALLBACK_HERO.secondaryCtaLink,
    heroImage: chosen.data.heroImage ?? null,
    mobileHeroImage: chosen.data.mobileHeroImage ?? null,
    trustText: chosen.data.trustText ?? FALLBACK_HERO.trustText,
    sortOrder: chosen.data.sortOrder ?? 0,
  };
}
