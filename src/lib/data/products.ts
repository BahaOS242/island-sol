import { queryCollection } from "@/lib/wix/client";
import type { ChargingMethod, Product } from "@/lib/types/product";

/**
 * Raw shape of an item in the `products` Wix Data collection. Field keys
 * match the CMS exactly (see the Content Manager in the Wix dashboard).
 */
interface RawProduct {
  productName?: string;
  slug?: string;
  shortDescription?: string;
  fullDescription?: string;
  heroImage?: string;
  productImages?: { items?: { url?: string }[] };
  price?: number;
  compareAtPrice?: number;
  currency?: "USD" | "BSD";
  availability?: string;
  featured?: boolean;
  categoryId?: string;
  capacityWh?: number;
  continuousOutputW?: number;
  surgeOutputW?: number;
  chargingMethods?: string[];
  weight?: number;
  dimensions?: string;
  warranty?: string;
  includedItems?: string[];
  idealFor?: string[];
  features?: string[];
  useCaseIds?: string[];
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
  canonicalSlug?: string;
  active?: boolean;
  isPlaceholder?: boolean;
}

function mapProduct(id: string, data: RawProduct): Product {
  return {
    productId: id,
    slug: data.slug ?? id,
    name: data.productName ?? "Untitled Product",
    shortDescription: data.shortDescription ?? "",
    longDescription: data.fullDescription ?? "",
    heroImage: data.heroImage ?? null,
    gallery: (data.productImages?.items ?? []).map((i) => i.url).filter((u): u is string => Boolean(u)),
    price: typeof data.price === "number" ? { amount: data.price, currency: data.currency ?? "USD" } : null,
    compareAtPrice:
      typeof data.compareAtPrice === "number" ? { amount: data.compareAtPrice, currency: data.currency ?? "USD" } : null,
    stockStatus: (data.availability as Product["stockStatus"]) ?? "unknown",
    featured: data.featured ?? false,
    categoryId: data.categoryId ?? null,
    capacityWh: data.capacityWh ?? null,
    continuousOutputW: data.continuousOutputW ?? null,
    surgeOutputW: data.surgeOutputW ?? null,
    chargingMethods: (data.chargingMethods ?? []) as ChargingMethod[],
    weightLbs: data.weight ?? null,
    dimensions: data.dimensions ?? null,
    warranty: data.warranty ?? null,
    includedItems: data.includedItems ?? [],
    idealFor: data.idealFor ?? [],
    features: data.features ?? [],
    useCaseIds: data.useCaseIds ?? [],
    sortOrder: data.sortOrder ?? 0,
    seoTitle: data.seoTitle ?? null,
    seoDescription: data.seoDescription ?? null,
    canonicalSlug: data.canonicalSlug ?? null,
    active: data.active ?? true,
    isPlaceholder: data.isPlaceholder ?? false,
  };
}

export async function getProducts(): Promise<Product[]> {
  const items = await queryCollection<RawProduct>("products");
  return items
    .map((item) => mapProduct(item.id, item.data))
    .filter((p) => p.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.categoryId === categoryId);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
