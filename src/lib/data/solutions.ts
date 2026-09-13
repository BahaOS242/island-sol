import { queryCollection } from "@/lib/wix/client";
import type { Solution } from "@/lib/types/product";

interface RawSolution {
  solutionName?: string;
  slug?: string;
  headline?: string;
  description?: string;
  image?: string;
  icon?: string;
  recommendedProductIds?: string[];
  idealCustomer?: string;
  commonAppliances?: string[];
  featured?: boolean;
  sortOrder?: number;
  seoTitle?: string;
  seoDescription?: string;
  active?: boolean;
}

function mapSolution(id: string, data: RawSolution): Solution {
  return {
    id,
    solutionName: data.solutionName ?? "Untitled Solution",
    slug: data.slug ?? id,
    headline: data.headline ?? "",
    description: data.description ?? "",
    image: data.image ?? null,
    icon: data.icon ?? null,
    recommendedProductIds: data.recommendedProductIds ?? [],
    idealCustomer: data.idealCustomer ?? "",
    commonAppliances: data.commonAppliances ?? [],
    featured: data.featured ?? false,
    sortOrder: data.sortOrder ?? 0,
    seoTitle: data.seoTitle ?? null,
    seoDescription: data.seoDescription ?? null,
    active: data.active ?? true,
  };
}

export async function getSolutions(): Promise<Solution[]> {
  const items = await queryCollection<RawSolution>("solutions");
  return items
    .map((item) => mapSolution(item.id, item.data))
    .filter((s) => s.active)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export async function getSolutionBySlug(slug: string): Promise<Solution | undefined> {
  const solutions = await getSolutions();
  return solutions.find((s) => s.slug === slug);
}
