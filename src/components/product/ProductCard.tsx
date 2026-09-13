import Link from "next/link";
import Image from "next/image";
import { ProductImagePlaceholder } from "@/components/product/ProductImagePlaceholder";
import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types/product";

/**
 * A sharp-edged technical frame, not a soft rounded-3xl shadow card —
 * thin border, no drop shadow, a rule separating image from spec text.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col border border-mist-300 bg-white transition-colors hover:border-navy-950"
    >
      {product.heroImage ? (
        <Image
          src={product.heroImage}
          alt={product.name}
          width={640}
          height={480}
          className="aspect-[4/3] w-full border-b border-mist-300 object-cover"
        />
      ) : (
        <ProductImagePlaceholder className="aspect-[4/3] w-full border-b border-mist-300" />
      )}

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-bold tracking-tight text-ink">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{product.shortDescription}</p>
        <div className="mt-5 flex items-center justify-between border-t border-mist-200 pt-4">
          <span className="font-mono text-sm font-semibold text-ink">{formatMoney(product.price)}</span>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-turquoise-700 group-hover:text-navy-950">
            View Details
          </span>
        </div>
      </div>
    </Link>
  );
}
