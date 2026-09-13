import { Container } from "@/components/ui/Container";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "ISLAND SOL terms of service.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <Container className="max-w-2xl py-16 sm:py-20">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Terms of Service</h1>
      <p className="mt-6 rounded-2xl border border-dashed border-mist-300 bg-cream-100 p-6 text-sm text-slate-600">
        This page is a placeholder. Real terms of service — covering sales,
        returns, warranty, and liability — should be drafted and reviewed
        before launch, then published here.
      </p>
    </Container>
  );
}
