import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { getProducts } from "@/lib/data/products";
import { PRODUCT_TIERS, getTierById } from "@/lib/data/tiers";
import { buildMetadata } from "@/lib/seo";
import type { ProductTierId } from "@/lib/types/product";

export const metadata = buildMetadata({
  title: "Portable Power Stations — The Bahamas",
  description:
    "Browse ISLAND SOL's lineup of portable power stations and backup energy systems, from everyday portable power to pro-grade home and business backup.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier } = await searchParams;
  const allProducts = await getProducts();
  const activeTier = tier && getTierById(tier) ? (tier as ProductTierId) : null;
  const products = activeTier ? allProducts.filter((p) => p.tierId === activeTier) : allProducts;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title="POWER STATIONS FOR EVERY NEED"
          subtitle="Portable power stations and backup energy systems for homes and businesses across The Bahamas."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${
              !activeTier ? "border-navy-950 bg-navy-950 text-cream-50" : "border-mist-300 text-ink"
            }`}
          >
            All
          </Link>
          {PRODUCT_TIERS.map((t) => (
            <Link
              key={t.tierId}
              href={`/products?tier=${t.tierId}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold ${
                activeTier === t.tierId ? "border-navy-950 bg-navy-950 text-cream-50" : "border-mist-300 text-ink"
              }`}
            >
              {t.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        {!activeTier && allProducts.length > 0 ? (
          <div className="mt-20">
            <SectionHeading title="COMPARE SYSTEMS" className="mb-8" />
            <ComparisonTable products={allProducts} />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
