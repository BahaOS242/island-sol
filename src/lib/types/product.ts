/**
 * Product data model — mirrors the `products` Wix Data collection exactly
 * (see src/lib/data/products.ts for the fetch/mapping layer).
 *
 * Internal fields such as supplier, supplier cost, landed cost, and
 * margin live in the separate, admin-only `product-internal` collection
 * and are never modeled here — this type is what the client is allowed
 * to see.
 */

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder" | "unknown";

export type ChargingMethod = "wall_outlet" | "solar_panel" | "car_charger" | "generator";

export interface Money {
  amount: number;
  currency: "USD" | "BSD";
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  sortOrder: number;
  active: boolean;
}

export interface Product {
  productId: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  heroImage: string | null;
  gallery: string[];
  /** Null = price not yet configured. UI must fall back to "Request pricing". */
  price: Money | null;
  compareAtPrice: Money | null;
  stockStatus: StockStatus;
  featured: boolean;
  categoryId: string | null;
  /** Null = spec not yet available. Never invent a number here. */
  capacityWh: number | null;
  continuousOutputW: number | null;
  surgeOutputW: number | null;
  chargingMethods: ChargingMethod[];
  weightLbs: number | null;
  dimensions: string | null;
  warranty: string | null;
  includedItems: string[];
  idealFor: string[];
  features: string[];
  useCaseIds: string[];
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  canonicalSlug: string | null;
  active: boolean;
  /** True while this record is placeholder catalog data, not a real SKU. */
  isPlaceholder: boolean;
}

export interface Solution {
  id: string;
  solutionName: string;
  slug: string;
  headline: string;
  description: string;
  image: string | null;
  icon: string | null;
  recommendedProductIds: string[];
  idealCustomer: string;
  commonAppliances: string[];
  featured: boolean;
  sortOrder: number;
  seoTitle: string | null;
  seoDescription: string | null;
  active: boolean;
}
