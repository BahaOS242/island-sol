import { queryCollection } from "@/lib/wix/client";

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
}

interface RawBenefit {
  title?: string;
  description?: string;
  icon?: string;
  sortOrder?: number;
  active?: boolean;
}

/**
 * Not yet rendered by any homepage section — created so the CMS content
 * model matches the full brand spec and is ready for a future "Benefits"
 * section without a schema change.
 */
export async function getBenefits(): Promise<Benefit[]> {
  const items = await queryCollection<RawBenefit>("benefits");
  return items
    .filter((item) => item.data.active ?? true)
    .map((item) => ({
      id: item.id,
      title: item.data.title ?? "",
      description: item.data.description ?? "",
      icon: item.data.icon ?? "bolt",
      sortOrder: item.data.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
