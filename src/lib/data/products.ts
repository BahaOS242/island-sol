import type { Product } from "@/lib/types/product";

/**
 * PLACEHOLDER CATALOG DATA.
 *
 * These three records exist so the product architecture (listing pages,
 * detail pages, comparison table, calculator recommendations) has
 * something real to render end-to-end. Every field that would require
 * inventing a fact — price, capacity, output, warranty, weight — is left
 * `null` on purpose and the UI renders an honest "coming soon" / "request
 * pricing" state for it instead of a fabricated number.
 *
 * Replace this file with a real data source (Wix Stores / CMS) once the
 * headless backend is connected. The `getProducts()` / `getProductBySlug()`
 * functions below are the seam to swap: keep their signatures, change the
 * implementation to call the Wix SDK instead of reading this array.
 */
const PRODUCTS: Product[] = [
  {
    productId: "placeholder-portable-1",
    slug: "portable-power-station",
    name: "ISLAND SOL Portable",
    tierId: "portable",
    shortDescription:
      "Grab-and-go power for phones, laptops, Wi-Fi, and lights.",
    longDescription:
      "A compact power station built for everyday carry — keep essentials charged at home, on the road, or through a short outage. Full specifications will be published here once the catalog is finalized.",
    price: null,
    compareAtPrice: null,
    stockStatus: "unknown",
    image: null,
    gallery: [],
    capacityWh: null,
    continuousOutputW: null,
    surgeOutputW: null,
    chargingMethods: ["wall_outlet", "solar_panel", "car_charger"],
    weightLbs: null,
    dimensions: null,
    warranty: null,
    includedItems: [],
    idealFor: ["Phones", "Laptops", "Wi-Fi", "Lights", "Small electronics", "Outdoor use"],
    features: ["Quiet operation", "No fuel required", "Portable design"],
    useCaseIds: ["wifi", "night-lights"],
    active: true,
    featured: true,
    sortOrder: 1,
    isPlaceholder: true,
  },
  {
    productId: "placeholder-home-1",
    slug: "home-essentials-system",
    name: "ISLAND SOL Home",
    tierId: "home_essentials",
    shortDescription:
      "Backup capacity for a refrigerator, Wi-Fi, lights, and fans during an outage.",
    longDescription:
      "Sized for the essentials of a household — built to help a home keep running when the grid doesn't. Full specifications will be published here once the catalog is finalized.",
    price: null,
    compareAtPrice: null,
    stockStatus: "unknown",
    image: null,
    gallery: [],
    capacityWh: null,
    continuousOutputW: null,
    surgeOutputW: null,
    chargingMethods: ["wall_outlet", "solar_panel"],
    weightLbs: null,
    dimensions: null,
    warranty: null,
    includedItems: [],
    idealFor: ["Refrigerators", "Wi-Fi", "Lights", "Fans", "Electronics", "Essential appliances"],
    features: ["Quiet operation", "No fuel required", "Low maintenance"],
    useCaseIds: ["fridge", "wifi", "business"],
    active: true,
    featured: true,
    sortOrder: 2,
    isPlaceholder: true,
  },
  {
    productId: "placeholder-pro-1",
    slug: "pro-backup-system",
    name: "ISLAND SOL Pro",
    tierId: "pro_backup",
    shortDescription:
      "Higher-capacity backup for larger appliances, longer outages, and businesses.",
    longDescription:
      "Built for homes and businesses that need to ride out longer outages or run larger loads. Full specifications and pricing are configured per system — request a quote for a tailored recommendation.",
    price: null,
    compareAtPrice: null,
    stockStatus: "unknown",
    image: null,
    gallery: [],
    capacityWh: null,
    continuousOutputW: null,
    surgeOutputW: null,
    chargingMethods: ["wall_outlet", "solar_panel", "generator"],
    weightLbs: null,
    dimensions: null,
    warranty: null,
    includedItems: [],
    idealFor: ["Larger appliances", "Longer outages", "Businesses", "Higher power requirements"],
    features: ["Scalable capacity", "Business continuity", "Local support"],
    useCaseIds: ["business", "fridge"],
    active: true,
    featured: true,
    sortOrder: 3,
    isPlaceholder: true,
  },
];

export async function getProducts(): Promise<Product[]> {
  return PRODUCTS.filter((p) => p.active).sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.featured);
}

export async function getProductsByTier(tierId: string): Promise<Product[]> {
  const products = await getProducts();
  return products.filter((p) => p.tierId === tierId);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.slug === slug);
}
