import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "ISLAND SOL privacy policy.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-6 rounded-2xl border border-dashed border-mist-300 bg-cream-100 p-6 text-sm text-slate-600">
        This page is a placeholder. A real privacy policy — covering what
        data is collected via forms and WhatsApp, and how it&rsquo;s used —
        should be drafted and reviewed before launch, then published here.
      </p>
    </Container>
  );
}
