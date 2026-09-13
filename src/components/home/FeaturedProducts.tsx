import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { getFeaturedProducts } from "@/lib/data/products";

export async function FeaturedProducts() {
  const products = await getFeaturedProducts();
  if (products.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow="Featured" title="POWER STATIONS" />
          <Button href="/products" variant="ghost" className="text-ink self-start sm:self-auto">
            View all products
          </Button>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
