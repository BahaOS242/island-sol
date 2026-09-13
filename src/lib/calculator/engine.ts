import { getApplianceDefinition } from "@/lib/data/appliances";
import type { ApplianceSelection, CalculatorResult } from "@/lib/types/calculator";
import type { ProductTierId } from "@/lib/types/product";

/**
 * Recommendation thresholds. These map an estimated load to one of the
 * three product tiers. They are deliberately conservative and independent
 * of any specific product's real capacity (which isn't finalized yet) —
 * once real product specs exist, this can be swapped for a lookup against
 * actual product `continuousOutputW` / `capacityWh` values.
 */
const TIER_THRESHOLDS: { tierId: ProductTierId; maxRunningWattage: number; maxDailyWh: number }[] = [
  { tierId: "portable", maxRunningWattage: 300, maxDailyWh: 600 },
  { tierId: "home_essentials", maxRunningWattage: 1200, maxDailyWh: 3500 },
  { tierId: "pro_backup", maxRunningWattage: Infinity, maxDailyWh: Infinity },
];

/** Rounds up to a recognizable output "class" for display purposes only. */
const OUTPUT_CLASSES = [300, 600, 1000, 1800, 3000, 5000];

function roundUpToOutputClass(watts: number): number {
  return OUTPUT_CLASSES.find((c) => c >= watts) ?? OUTPUT_CLASSES[OUTPUT_CLASSES.length - 1];
}

export function calculatePowerNeeds(selections: ApplianceSelection[]): CalculatorResult {
  let totalRunningWattage = 0;
  let totalSurgeContribution = 0;
  let estimatedDailyWh = 0;
  let largestRunning = 0;
  let largestSurgeDelta = 0;

  for (const selection of selections) {
    const def = getApplianceDefinition(selection.applianceId);
    if (!def || selection.quantity <= 0) continue;

    const runningEach = selection.customWattage ?? def.typicalRunningWattage;
    const surgeEach = selection.customWattage
      ? selection.customWattage
      : def.typicalSurgeWattage;

    const runningTotal = runningEach * selection.quantity;
    totalRunningWattage += runningTotal;
    estimatedDailyWh += runningEach * selection.quantity * def.typicalDutyCycleHoursPerDay;

    const surgeDelta = Math.max(0, surgeEach - runningEach);
    if (surgeDelta > largestSurgeDelta) largestSurgeDelta = surgeDelta;
    if (runningTotal > largestRunning) largestRunning = runningTotal;
  }

  // Worst-case simultaneous surge: total running load plus the single
  // largest appliance's extra surge draw (surges rarely stack across
  // multiple appliances at once).
  totalSurgeContribution = totalRunningWattage + largestSurgeDelta;

  const tier =
    TIER_THRESHOLDS.find(
      (t) => totalRunningWattage <= t.maxRunningWattage && estimatedDailyWh <= t.maxDailyWh
    ) ?? TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];

  return {
    totalRunningWattage: Math.round(totalRunningWattage),
    totalSurgeWattage: Math.round(totalSurgeContribution),
    estimatedDailyWh: Math.round(estimatedDailyWh),
    recommendedTierId: tier.tierId,
    recommendedOutputClassW: roundUpToOutputClass(totalSurgeContribution),
  };
}
