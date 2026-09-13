import { queryCollection } from "@/lib/wix/client";

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  group: string;
  sortOrder: number;
}

interface RawNavigationItem {
  label?: string;
  url?: string;
  group?: string;
  active?: boolean;
  sortOrder?: number;
}

const FALLBACK_NAV: NavigationItem[] = [
  { id: "products", label: "Products", url: "/products", group: "main", sortOrder: 1 },
  { id: "solutions", label: "Solutions", url: "/solutions", group: "main", sortOrder: 2 },
  { id: "how-it-works", label: "How It Works", url: "/how-it-works", group: "main", sortOrder: 3 },
  { id: "trade-in", label: "Trade-In", url: "/trade-in", group: "main", sortOrder: 4 },
  { id: "support", label: "Support", url: "/support", group: "main", sortOrder: 5 },
];

export async function getNavigationItems(): Promise<NavigationItem[]> {
  const items = await queryCollection<RawNavigationItem>("navigation-items");
  if (items.length === 0) return FALLBACK_NAV;

  return items
    .filter((item) => item.data.active ?? true)
    .map((item) => ({
      id: item.id,
      label: item.data.label ?? "",
      url: item.data.url ?? "/",
      group: item.data.group ?? "main",
      sortOrder: item.data.sortOrder ?? 0,
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder);
}
