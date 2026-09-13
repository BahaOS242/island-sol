import { queryCollection } from "@/lib/wix/client";
import type { Category } from "@/lib/types/product";

interface RawCategory {
  name?: string;
  slug?: string;
  description?: string;
  sortOrder?: number;
  active?: boolean;
}

export async function getCategories(): Promise<Category[]> {
  const items = await queryCollection<RawCategory>("categories");
  return items
    .map((item) => ({
      id: item.id,
      name: item.data.name ?? "Untitled Category",
      slug: item.data.slug ?? item.id,
      description: item.data.description ?? "",
      sortOrder: item.data.sortOrder ?? 0,
      active: item.data.active ?? true,
    }))
    .filter((c) => c.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getCategoryBySlug(slug: string): Promise<Category | undefined> {
  const categories = await getCategories();
  return categories.find((c) => c.slug === slug);
}
