import { Hero } from "@/components/home/Hero";
import { TrustStrip } from "@/components/home/TrustStrip";
import { PowerSolutions } from "@/components/home/PowerSolutions";
import { PowerCalculatorSection } from "@/components/home/PowerCalculatorSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { UseCases } from "@/components/home/UseCases";
import { GeneratorComparison } from "@/components/home/GeneratorComparison";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { TradeInTeaser } from "@/components/home/TradeInTeaser";
import { FAQ } from "@/components/home/FAQ";
import { FinalCTA } from "@/components/home/FinalCTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "ISLAND SOL — Portable Power & Backup Energy for The Bahamas",
  description:
    "Portable power stations and backup energy systems for homes and businesses in The Bahamas. Quiet, fuel-free power when the grid goes down.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <PowerSolutions />
      <PowerCalculatorSection />
      <FeaturedProducts />
      <UseCases />
      <GeneratorComparison />
      <HowItWorks />
      <Testimonials />
      <TradeInTeaser />
      <FAQ />
      <FinalCTA />
    </>
  );
}
