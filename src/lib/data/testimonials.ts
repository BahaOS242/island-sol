import { queryCollection } from "@/lib/wix/client";
import type { Testimonial } from "@/lib/types/content";

interface RawTestimonial {
  customerName?: string;
  testimonial?: string;
  location?: string;
  productSlug?: string;
  rating?: number;
  featured?: boolean;
  active?: boolean;
  sortOrder?: number;
}

/**
 * Reads real testimonials from the CMS. Per brand guidelines, ISLAND SOL
 * never fabricates these — the collection starts empty and the
 * Testimonials section hides itself automatically when this returns [].
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const items = await queryCollection<RawTestimonial>("testimonials");
  return items
    .filter((item) => item.data.active ?? true)
    .map((item) => ({
      id: item.id,
      quote: item.data.testimonial ?? "",
      authorName: item.data.customerName ?? "",
      authorLocation: item.data.location ?? null,
      rating: item.data.rating ?? null,
      productSlug: item.data.productSlug ?? null,
      sortOrder: item.data.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
