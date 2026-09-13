"use client";

import { useMemo, useState } from "react";
import { ApplianceRow } from "@/components/calculator/ApplianceRow";
import { ResultCard } from "@/components/calculator/ResultCard";
import { APPLIANCE_DEFINITIONS } from "@/lib/data/appliances";
import { calculatePowerNeeds } from "@/lib/calculator/engine";
import type { ApplianceCategory } from "@/lib/types/calculator";

type Selections = Partial<Record<ApplianceCategory, number>>;

export function PowerCalculator() {
  const [selections, setSelections] = useState<Selections>({});

  const hasSelections = useMemo(
    () => Object.values(selections).some((qty) => (qty ?? 0) > 0),
    [selections]
  );

  const result = useMemo(() => {
    const list = Object.entries(selections)
      .filter(([, qty]) => (qty ?? 0) > 0)
      .map(([applianceId, quantity]) => ({
        applianceId: applianceId as ApplianceCategory,
        quantity: quantity ?? 0,
      }));
    return calculatePowerNeeds(list);
  }, [selections]);

  function updateQuantity(id: ApplianceCategory, next: number) {
    setSelections((prev) => ({ ...prev, [id]: next }));
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-start">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {APPLIANCE_DEFINITIONS.map((appliance) => (
          <ApplianceRow
            key={appliance.id}
            appliance={appliance}
            quantity={selections[appliance.id] ?? 0}
            onChange={(next) => updateQuantity(appliance.id, next)}
          />
        ))}
      </div>

      <div className="lg:sticky lg:top-24">
        {hasSelections ? (
          <ResultCard result={result} />
        ) : (
          <div className="rounded-3xl border border-dashed border-mist-300 p-8 text-center">
            <p className="text-sm text-slate-500">
              Select what you need to power to see your recommended system.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
