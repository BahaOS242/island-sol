import type { Metadata } from "next";
import type { Product } from "@/lib/types/product";
import type { SiteSettings } from "@/lib/data/siteSettings";

/**
 * TODO(business): set the real production domain once deployed, and set
 * NEXT_PUBLIC_SITE_URL in the environment to match.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.islandsol.com";

/**
 * Used only for the `openGraph.siteName` on static pages that can't
 * await CMS data (they export a plain `metadata` object, not
 * `generateMetadata`). The root layout and any page using
 * `generateMetadata` should prefer the real value from Site Settings.
 */
const SITE_NAME_FALLBACK = "ISLAND SOL";

export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME_FALLBACK,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.businessName,
    url: SITE_URL,
    description: settings.defaultSeoDescription,
    ...(settings.phone ? { telephone: settings.phone } : {}),
    ...(settings.email ? { email: settings.email } : {}),
    areaServed: {
      "@type": "Country",
      name: "The Bahamas",
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seoDescription || product.shortDescription,
    sku: product.productId,
    ...(product.heroImage ? { image: [product.heroImage] } : {}),
    ...(product.price
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: product.price.currency,
            price: product.price.amount,
            availability:
              product.stockStatus === "in_stock"
                ? "https://schema.org/InStock"
                : product.stockStatus === "out_of_stock"
                  ? "https://schema.org/OutOfStock"
                  : "https://schema.org/PreOrder",
          },
        }
      : {}),
  };
}
