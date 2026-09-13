import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/data/testimonials";

/**
 * Renders nothing until real testimonials exist in the CMS — we never
 * fabricate customer quotes to fill this section.
 */
export async function Testimonials() {
  const testimonials = await getTestimonials();
  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow="What Customers Say" title="TRUSTED AROUND THE ISLAND." />
        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <blockquote key={t.id} className="border-l-2 border-gold-500 pl-6">
              <p className="text-base leading-relaxed text-slate-700">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-4 text-sm font-semibold text-ink">
                {t.authorName}
                {t.authorLocation ? <span className="text-slate-500"> — {t.authorLocation}</span> : null}
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
    </section>
  );
}
