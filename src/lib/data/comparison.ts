import type { ComparisonRow } from "@/lib/types/content";

/**
 * Qualitative, category-level comparison. Uses "Depending on the model"
 * rather than absolute claims, per brand guidelines — this is about the
 * product category (rechargeable power stations vs. fuel generators),
 * not a specific ISLAND SOL SKU's verified spec sheet.
 */
export const GENERATOR_COMPARISON: ComparisonRow[] = [
  { label: "Fuel", generator: "Requires gasoline or propane", powerStation: "Recharges from an outlet or solar panel" },
  { label: "Noise", generator: "Engine noise during operation", powerStation: "Silent operation, depending on the model" },
  { label: "Exhaust", generator: "Produces exhaust fumes", powerStation: "No exhaust" },
  { label: "Maintenance", generator: "Oil changes, fuel storage, upkeep", powerStation: "Low maintenance, depending on the model" },
  { label: "Portability", generator: "Heavy, often wheeled", powerStation: "Lightweight and portable, depending on the model" },
  { label: "Indoor use", generator: "Not safe indoors", powerStation: "Indoor-suitable, depending on the model" },
];
