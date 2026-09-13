import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppLink } from "@/components/whatsapp/WhatsAppLink";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { getFaqItems } from "@/lib/data/faq";
import { getSiteSettings } from "@/lib/data/siteSettings";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Support & Quotes",
  description: "Get a quote or ask ISLAND SOL a question about portable power and backup energy systems.",
  path: "/support",
});

export default async function SupportPage() {
  const [allFaqs, settings] = await Promise.all([getFaqItems(), getSiteSettings()]);
  const supportFaqs = allFaqs.filter((f) => f.category === "support" || f.category === "general");

  return (
    <div className="py-16 sm:py-20">
      <Container className="max-w-4xl">
        <SectionHeading
          eyebrow="Support"
          title="TALK TO ISLAND SOL."
          subtitle="The fastest way to reach us is WhatsApp. For a detailed quote, use the form below."
        />

        <div className="mt-8">
          <WhatsAppLink message={settings.supportMessage} number={settings.whatsapp} variant="primary" size="lg">
            Chat on WhatsApp
          </WhatsAppLink>
        </div>

        <div className="mt-14 rounded-3xl border border-mist-200 bg-white p-8 sm:p-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Request a Quote</h2>
          <div className="mt-6">
            <QuoteForm whatsappNumber={settings.whatsapp} />
          </div>
        </div>

        {supportFaqs.length > 0 ? (
          <div className="mt-16">
            <h2 className="text-xl font-bold tracking-tight text-ink">Common Questions</h2>
            <div className="mt-6 divide-y divide-mist-200 rounded-2xl border border-mist-200 bg-white">
              {supportFaqs.map((f) => (
                <details key={f.id} className="p-5">
                  <summary className="cursor-pointer text-sm font-semibold text-ink">{f.question}</summary>
                  <p className="mt-2 text-sm text-slate-600">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
}
