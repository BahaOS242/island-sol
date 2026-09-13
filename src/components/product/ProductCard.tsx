import Link from "next/link";
import Image from "next/image";
import { ProductImagePlaceholder } from "@/components/product/ProductImagePlaceholder";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-mist-200 bg-white transition-shadow hover:shadow-lg"
    >
      {product.image ? (
        <Image
          src={product.image}
          alt={product.name}
          width={640}
          height={480}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <ProductImagePlaceholder className="aspect-[4/3] w-full" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-ink group-hover:text-navy-700">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{product.shortDescription}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-ink">{formatMoney(product.price)}</span>
          <span className="text-xs font-semibold uppercase tracking-wide text-turquoise-600">
            View details &rarr;
          </span>
        </div>
      </div>
    </Link>
  );
}
