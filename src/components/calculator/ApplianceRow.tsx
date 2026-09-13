"use client";

import type { ApplianceDefinition } from "@/lib/types/calculator";

export function ApplianceRow({
  appliance,
  quantity,
  onChange,
}: {
  appliance: ApplianceDefinition;
  quantity: number;
  onChange: (next: number) => void;
}) {
  const active = quantity > 0;

  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 transition-colors ${
        active ? "border-gold-500/60 bg-gold-500/5" : "border-mist-200 bg-white"
      }`}
    >
      <span className="text-sm font-medium text-ink">{appliance.label}</span>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${appliance.label} quantity`}
          onClick={() => onChange(Math.max(0, quantity - 1))}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-mist-300 text-lg font-semibold text-ink active:bg-mist-200"
        >
          &minus;
        </button>
        <span className="w-5 text-center text-sm font-semibold tabular-nums text-ink">{quantity}</span>
        <button
          type="button"
          aria-label={`Increase ${appliance.label} quantity`}
          onClick={() => onChange(quantity + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-950 text-lg font-semibold text-cream-50 active:bg-navy-800"
        >
          +
        </button>
      </div>
    </div>
  );
}
