import { queryCollection } from "@/lib/wix/client";
import type { FaqItem } from "@/lib/types/content";

interface RawFaq {
  question?: string;
  answer?: string;
  category?: string;
  sortOrder?: number;
  active?: boolean;
}

export async function getFaqItems(): Promise<FaqItem[]> {
  const items = await queryCollection<RawFaq>("faqs");
  return items
    .filter((item) => item.data.active ?? true)
    .map((item) => ({
      id: item.id,
      question: item.data.question ?? "",
      answer: item.data.answer ?? "",
      category: item.data.category ?? "general",
      sortOrder: item.data.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
