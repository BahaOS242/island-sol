import { queryCollection } from "@/lib/wix/client";

export interface Promotion {
  id: string;
  promotionName: string;
  headline: string;
  description: string;
  discount: string;
  startDate: string | null;
  endDate: string | null;
  promotionalImage: string | null;
  ctaLabel: string;
  ctaLink: string;
}

interface RawPromotion {
  promotionName?: string;
  headline?: string;
  description?: string;
  discount?: string;
  startDate?: string;
  endDate?: string;
  promotionalImage?: string;
  ctaLabel?: string;
  ctaLink?: string;
  active?: boolean;
}

function isCurrentlyActive(promo: RawPromotion, now: Date): boolean {
  if (promo.active === false) return false;
  if (promo.startDate && new Date(promo.startDate) > now) return false;
  if (promo.endDate && new Date(promo.endDate) < now) return false;
  return true;
}

/**
 * Returns only promotions whose active flag AND date window (startDate /
 * endDate) both currently apply — a promotion can be scheduled in the
 * CMS ahead of time and it activates/deactivates automatically with no
 * code change or redeploy.
 */
export async function getActivePromotions(): Promise<Promotion[]> {
  const items = await queryCollection<RawPromotion>("promotions");
  const now = new Date();

  return items
    .filter((item) => isCurrentlyActive(item.data, now))
    .map((item) => ({
      id: item.id,
      promotionName: item.data.promotionName ?? "",
      headline: item.data.headline ?? "",
      description: item.data.description ?? "",
      discount: item.data.discount ?? "",
      startDate: item.data.startDate ?? null,
      endDate: item.data.endDate ?? null,
      promotionalImage: item.data.promotionalImage ?? null,
      ctaLabel: item.data.ctaLabel || "Learn More",
      ctaLink: item.data.ctaLink || "/products",
    }));
}
