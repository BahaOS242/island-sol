/**
 * Product data model.
 *
 * Mirrors the shape this data will take once it lives in a real Wix
 * CMS/Stores collection (see PHASE 4 in the implementation report).
 * `landedCost` and `supplier` intentionally do NOT exist on this client-side
 * type — that data must never reach the browser and stays server-side only
 * once a real backend is connected.
 */

export type StockStatus = "in_stock" | "low_stock" | "out_of_stock" | "preorder" | "unknown";

export type ChargingMethod = "wall_outlet" | "solar_panel" | "car_charger" | "generator";

export type ProductTierId = "portable" | "home_essentials" | "pro_backup";

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Money {
  amount: number;
  currency: "USD" | "BSD";
}

export interface Product {
  productId: string;
  slug: string;
  name: string;
  tierId: ProductTierId;
  shortDescription: string;
  longDescription: string;
  /** Null = price not yet configured. UI must fall back to "Request pricing". */
  price: Money | null;
  compareAtPrice: Money | null;
  stockStatus: StockStatus;
  image: string | null;
  gallery: string[];
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
  active: boolean;
  featured: boolean;
  sortOrder: number;
  /** True while this record is scaffold/placeholder data, not real catalog data. */
  isPlaceholder: boolean;
}

export interface ProductTier {
  tierId: ProductTierId;
  name: string;
  eyebrow: string;
  description: string;
  poweredExamples: string[];
  ctaLabel: string;
  ctaHref: string;
}
