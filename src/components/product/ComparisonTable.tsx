import { formatMoney } from "@/lib/format";
import type { Product } from "@/lib/types/product";

const ROWS: { label: string; render: (p: Product) => string }[] = [
  { label: "Capacity", render: (p) => (p.capacityWh ? `${p.capacityWh} Wh` : "Coming soon") },
  { label: "Continuous Output", render: (p) => (p.continuousOutputW ? `${p.continuousOutputW} W` : "Coming soon") },
  { label: "Best For", render: (p) => p.idealFor.slice(0, 2).join(", ") },
  { label: "Weight", render: (p) => (p.weightLbs ? `${p.weightLbs} lbs` : "Coming soon") },
  { label: "Price", render: (p) => formatMoney(p.price) },
];

/**
 * All values are read from CMS/product data — nothing here is hardcoded
 * per-tier, so this table stays accurate as real specs are added.
 */
export function ComparisonTable({ products }: { products: Product[] }) {
  return (
    <div className="overflow-x-auto border-t-2 border-navy-950">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            <th className="border-b border-mist-300 p-4"> </th>
            {products.map((p) => (
              <th key={p.productId} className="border-b border-mist-300 p-4 text-navy-900">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label}>
              <td className="border-b border-mist-200 p-4 font-semibold text-ink">{row.label}</td>
              {products.map((p) => (
                <td key={p.productId} className="border-b border-mist-200 p-4 font-mono text-slate-700">
                  {row.render(p)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
