import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { ProductImagePlaceholder } from "@/components/product/ProductImagePlaceholder";
import { getProductBySlug, getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { formatMoney } from "@/lib/format";
import { breadcrumbJsonLd, buildMetadata, productJsonLd } from "@/lib/seo";

const CHARGING_LABELS: Record<string, string> = {
  wall_outlet: "Wall outlet",
  solar_panel: "Solar panel",
  car_charger: "Car charger",
  generator: "Generator",
};

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return buildMetadata({
    title: product.seoTitle || product.name,
    description: product.seoDescription || product.shortDescription,
    path: `/products/${product.canonicalSlug || product.slug}`,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [product, categories, settings] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
    getSiteSettings(),
  ]);
  if (!product) notFound();

  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="py-16 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: product.name, path: `/products/${product.slug}` },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)) }}
      />

      <Container>
        {/* Above the fold */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            {product.heroImage ? (
              <Image
                src={product.heroImage}
                alt={product.name}
                width={800}
                height={600}
                className="aspect-[4/3] w-full rounded-3xl object-cover"
                priority
              />
            ) : (
              <ProductImagePlaceholder className="aspect-[4/3] w-full" />
            )}
          </div>

          <div>
            {category ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-turquoise-600">
                {category.name}
              </p>
            ) : null}
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">{product.shortDescription}</p>

            <p className="mt-6 text-2xl font-bold text-ink">{formatMoney(product.price)}</p>
            <p className="mt-1 text-sm text-slate-500">
              {product.stockStatus === "in_stock"
                ? "In stock"
                : product.stockStatus === "out_of_stock"
                  ? "Out of stock"
                  : "Availability confirmed at checkout"}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="primary" size="lg">
                Buy Now
              </Button>
              <WhatsAppLink
                message={`Hi ISLAND SOL, I'm interested in the ${product.name}. Can you tell me more?`}
                number={settings.whatsapp}
                variant="secondary"
                className="text-ink"
              >
                Ask a Question
              </WhatsAppLink>
            </div>
          </div>
        </div>

        {/* What can it power */}
        <section className="mt-20">
          <h2 className="text-2xl font-bold tracking-tight text-ink">What Can It Power?</h2>
          <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {product.idealFor.map((item) => (
              <li key={item} className="rounded-xl border border-mist-200 bg-white px-4 py-3 text-sm text-slate-700">
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Runtime */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">How Long Can It Run?</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Runtime depends on exactly what you&rsquo;re running and how you use it.
            Use the power calculator for an estimate based on your specific
            devices, or talk to us directly for a precise recommendation.
          </p>
          <Button href="/power-calculator" variant="secondary" className="mt-4 text-ink">
            Estimate My Runtime
          </Button>
        </section>

        {/* Key specifications */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Key Specifications</h2>
          <dl className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-mist-200 bg-mist-200 sm:grid-cols-2">
            {[
              ["Capacity", product.capacityWh ? `${product.capacityWh} Wh` : "Coming soon"],
              ["Continuous Output", product.continuousOutputW ? `${product.continuousOutputW} W` : "Coming soon"],
              ["Surge Output", product.surgeOutputW ? `${product.surgeOutputW} W` : "Coming soon"],
              ["Weight", product.weightLbs ? `${product.weightLbs} lbs` : "Coming soon"],
              ["Dimensions", product.dimensions ?? "Coming soon"],
              ["Warranty", product.warranty ?? "Contact us for current warranty details"],
            ].map(([label, value]) => (
              <div key={label} className="bg-white p-5">
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</dt>
                <dd className="mt-1 text-sm font-medium text-ink">{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Charging */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">Charging</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.chargingMethods.map((method) => (
              <span key={method} className="rounded-full bg-navy-950 px-4 py-2 text-sm font-medium text-cream-50">
                {CHARGING_LABELS[method] ?? method}
              </span>
            ))}
          </div>
        </section>

        {/* Included */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-ink">What&rsquo;s Included?</h2>
          {product.includedItems.length > 0 ? (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-slate-700">
              {product.includedItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-500">
              Package contents will be published here once finalized.
            </p>
          )}
        </section>

        <div className="mt-20 rounded-3xl bg-navy-950 p-10 text-center text-cream-50">
          <p className="text-lg font-semibold">Still deciding?</p>
          <p className="mt-2 text-sm text-cream-50/70">
            Talk to ISLAND SOL directly and we&rsquo;ll help you find the right fit.
          </p>
          <WhatsAppLink
            message={`Hi ISLAND SOL, I have a question about the ${product.name}.`}
            number={settings.whatsapp}
            variant="primary"
            className="mt-6"
          >
            Chat on WhatsApp
          </WhatsAppLink>
        </div>
      </Container>
    </div>
  );
}
