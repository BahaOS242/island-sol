import { Container } from "@/components/ui/Container";
import { getTrustItems } from "@/lib/data/trustItems";

/**
 * A minimal horizontal strip, not an icon-and-card grid — see brand
 * guidelines against generic "four feature cards with line icons."
 */
export async function TrustStrip() {
  const items = await getTrustItems();
  if (items.length === 0) return null;

  return (
    <section className="border-b border-mist-200 bg-cream-50">
      <Container>
        <div className="flex flex-wrap divide-x divide-mist-200 border-t border-mist-200 sm:border-t-0">
          {items.map((item) => (
            <div key={item.id} className="min-w-[45%] flex-1 py-6 pl-0 pr-6 first:pl-0 sm:pl-8 sm:first:pl-0">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">{item.title}</p>
              <p className="mt-1 text-sm text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
