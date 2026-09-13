import type { ProductTier } from "@/lib/types/product";

/**
 * The three power solution tiers. Copy here comes directly from the
 * ISLAND SOL brand brief — not fabricated. Wattage/capacity claims are
 * deliberately absent; those live on individual Product records once real
 * catalog data exists.
 */
export const PRODUCT_TIERS: ProductTier[] = [
  {
    tierId: "portable",
    name: "Portable Power",
    eyebrow: "Tier 1",
    description:
      "Compact, grab-and-go power for the devices you rely on every day.",
    poweredExamples: ["Phones", "Laptops", "Wi-Fi", "Lights", "Small electronics", "Outdoor use"],
    ctaLabel: "SHOP PORTABLE",
    ctaHref: "/products?tier=portable",
  },
  {
    tierId: "home_essentials",
    name: "Home Essentials",
    eyebrow: "Tier 2",
    description:
      "Enough capacity to keep the essentials of a home running through an outage.",
    poweredExamples: ["Refrigerators", "Wi-Fi", "Lights", "Fans", "Electronics", "Essential appliances"],
    ctaLabel: "EXPLORE HOME BACKUP",
    ctaHref: "/products?tier=home_essentials",
  },
  {
    tierId: "pro_backup",
    name: "Pro Backup",
    eyebrow: "Tier 3",
    description:
      "Higher-capacity systems built for longer outages, larger appliances, and business continuity.",
    poweredExamples: ["Larger appliances", "Longer outages", "Businesses", "Higher power requirements"],
    ctaLabel: "REQUEST A QUOTE",
    ctaHref: "/support?type=quote_request",
  },
];

export function getTierById(tierId: string) {
  return PRODUCT_TIERS.find((t) => t.tierId === tierId);
}
