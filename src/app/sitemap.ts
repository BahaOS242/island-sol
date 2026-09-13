import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/data/products";
import { SITE_URL } from "@/lib/seo";

const STATIC_PATHS = [
  "",
  "/products",
  "/solutions",
  "/how-it-works",
  "/trade-in",
  "/support",
  "/power-calculator",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: new Date(),
  }));

  return [...staticEntries, ...productEntries];
}
