import { queryCollection } from "@/lib/wix/client";

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
}

interface RawTrustItem {
  title?: string;
  description?: string;
  icon?: string;
  sortOrder?: number;
  active?: boolean;
}

export async function getTrustItems(): Promise<TrustItem[]> {
  const items = await queryCollection<RawTrustItem>("trust-items");
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
