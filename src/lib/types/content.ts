/** Content data models for CMS-driven sections (use cases, testimonials, FAQ). */

export interface UseCase {
  id: string;
  title: string;
  description: string;
  image: string | null;
}

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorLocation: string | null;
  rating: number | null;
  productSlug: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "general" | "product" | "calculator" | "trade_in" | "support";
}

export interface ComparisonRow {
  label: string;
  generator: string;
  powerStation: string;
}
