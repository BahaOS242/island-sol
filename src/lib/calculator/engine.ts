import type { ApplianceDefinition, ApplianceSelection, CalculatorResult } from "@/lib/types/calculator";

function findApplianceDefinition(
  definitions: ApplianceDefinition[],
  id: string
): ApplianceDefinition | undefined {
  return definitions.find((a) => a.id === id);
}

/**
 * Recommendation thresholds. These map an estimated load to a rough
 * output "class" and severity tier (portable / home / pro), independent
 * of any specific product's real capacity. The actual CMS category or
 * solution to recommend is resolved by the caller (see
 * severityToCategorySortOrder) by matching this tier's ordinal position
 * against category sortOrder — so it still works if new categories are
 * added, though a category reshuffle changes the mapping.
 */
const TIER_THRESHOLDS: { tier: "low" | "medium" | "high"; maxRunningWattage: number; maxDailyWh: number }[] = [
  { tier: "low", maxRunningWattage: 300, maxDailyWh: 600 },
  { tier: "medium", maxRunningWattage: 1200, maxDailyWh: 3500 },
  { tier: "high", maxRunningWattage: Infinity, maxDailyWh: Infinity },
];

/** Rounds up to a recognizable output "class" for display purposes only. */
const OUTPUT_CLASSES = [300, 600, 1000, 1800, 3000, 5000];

function roundUpToOutputClass(watts: number): number {
  return OUTPUT_CLASSES.find((c) => c >= watts) ?? OUTPUT_CLASSES[OUTPUT_CLASSES.length - 1];
}

export function calculatePowerNeeds(
  selections: ApplianceSelection[],
  definitions: ApplianceDefinition[]
): CalculatorResult {
  let totalRunningWattage = 0;
  let estimatedDailyWh = 0;
  let largestRunning = 0;
  let largestSurgeDelta = 0;

  for (const selection of selections) {
    const def = findApplianceDefinition(definitions, selection.applianceId);
    if (!def || selection.quantity <= 0) continue;

    const runningEach = selection.customWattage ?? def.typicalRunningWattage;
    const surgeEach = selection.customWattage ? selection.customWattage : def.typicalSurgeWattage;

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
  const totalSurgeContribution = totalRunningWattage + largestSurgeDelta;

  const matchedTier =
    TIER_THRESHOLDS.find(
      (t) => totalRunningWattage <= t.maxRunningWattage && estimatedDailyWh <= t.maxDailyWh
    ) ?? TIER_THRESHOLDS[TIER_THRESHOLDS.length - 1];

  return {
    totalRunningWattage: Math.round(totalRunningWattage),
    totalSurgeWattage: Math.round(totalSurgeContribution),
    estimatedDailyWh: Math.round(estimatedDailyWh),
    recommendedTier: matchedTier.tier,
    recommendedOutputClassW: roundUpToOutputClass(totalSurgeContribution),
  };
}

/**
 * Maps an abstract severity tier to a 1-based ordinal position — pair
 * this with CMS categories/solutions sorted by sortOrder to pick which
 * one to recommend (position 1 = low, 2 = medium, 3+ = high).
 */
export function severityToOrdinal(tier: "low" | "medium" | "high"): number {
  return tier === "low" ? 1 : tier === "medium" ? 2 : 3;
}
