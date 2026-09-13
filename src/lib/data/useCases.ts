import { queryCollection } from "@/lib/wix/client";
import type { UseCase } from "@/lib/types/content";

interface RawUseCase {
  title?: string;
  description?: string;
  image?: string;
  ctaLabel?: string;
  ctaLink?: string;
  sortOrder?: number;
  active?: boolean;
}

export async function getUseCases(): Promise<UseCase[]> {
  const items = await queryCollection<RawUseCase>("use-cases");
  return items
    .filter((item) => item.data.active ?? true)
    .map((item) => ({
      id: item.id,
      title: item.data.title ?? "",
      description: item.data.description ?? "",
      image: item.data.image ?? null,
      sortOrder: item.data.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
