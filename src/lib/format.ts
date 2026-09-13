import type { Money } from "@/lib/types/product";

export function formatMoney(money: Money | null): string {
  if (!money) return "Request pricing";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: money.currency }).format(
    money.amount
  );
}
