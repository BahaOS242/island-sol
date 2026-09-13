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
    <div className="overflow-x-auto rounded-3xl border border-mist-200">
      <table className="w-full min-w-[600px] border-collapse text-sm">
        <thead>
          <tr className="bg-cream-100 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="p-4"> </th>
            {products.map((p) => (
              <th key={p.productId} className="p-4 text-navy-900">
                {p.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-cream-50"}>
              <td className="p-4 font-semibold text-ink">{row.label}</td>
              {products.map((p) => (
                <td key={p.productId} className="p-4 text-slate-700">
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
