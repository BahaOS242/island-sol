import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { ComparisonTable } from "@/components/product/ComparisonTable";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Portable Power Stations — The Bahamas",
  description:
    "Browse ISLAND SOL's lineup of portable power stations and backup energy systems, from everyday portable power to pro-grade home and business backup.",
  path: "/products",
});

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const [allProducts, categories] = await Promise.all([getProducts(), getCategories()]);
  const activeCategory = category && categories.some((c) => c.id === category) ? category : null;
  const products = activeCategory ? allProducts.filter((p) => p.categoryId === activeCategory) : allProducts;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Shop"
          title="POWER STATIONS FOR EVERY NEED"
          subtitle="Portable power stations and backup energy systems for homes and businesses across The Bahamas."
        />

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-b border-mist-300">
          <Link
            href="/products"
            className={`border-b-2 pb-3 text-sm font-semibold uppercase tracking-[0.1em] ${
              !activeCategory ? "border-navy-950 text-navy-950" : "border-transparent text-slate-500"
            }`}
          >
            All
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/products?category=${c.id}`}
              className={`border-b-2 pb-3 text-sm font-semibold uppercase tracking-[0.1em] ${
                activeCategory === c.id ? "border-navy-950 text-navy-950" : "border-transparent text-slate-500"
              }`}
            >
              {c.name}
            </Link>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

        {!activeCategory && allProducts.length > 0 ? (
          <div className="mt-20">
            <SectionHeading title="COMPARE SYSTEMS" className="mb-8" />
            <ComparisonTable products={allProducts} />
          </div>
        ) : null}
      </Container>
    </div>
  );
}
