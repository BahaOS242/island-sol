/** Power calculator / recommendation-engine data models. */

export type ApplianceCategory =
  | "refrigerator"
  | "tv"
  | "wifi_router"
  | "lights"
  | "fans"
  | "laptop"
  | "phone"
  | "gaming_console"
  | "cpap"
  | "microwave"
  | "ac_unit"
  | "other";

/**
 * Typical wattage reference values, sourced from the CMS `appliances`
 * collection (src/lib/data/appliances.ts) — used ONLY to produce a rough
 * estimate. These are not ISLAND SOL product specifications or
 * guarantees. Always shown to the customer alongside a disclaimer — see
 * PowerCalculator's disclaimer copy.
 */
export interface ApplianceDefinition {
  id: ApplianceCategory;
  label: string;
  icon: string;
  typicalRunningWattage: number;
  typicalSurgeWattage: number;
  /** Rough average hours/day this appliance tends to actually run, for Wh estimates. */
  typicalDutyCycleHoursPerDay: number;
}

export interface ApplianceSelection {
  applianceId: ApplianceCategory;
  quantity: number;
  /** Optional override if the customer knows the device's actual wattage. */
  customWattage?: number;
}

export interface CalculatorResult {
  totalRunningWattage: number;
  totalSurgeWattage: number;
  estimatedDailyWh: number;
  recommendedTier: "low" | "medium" | "high";
  recommendedOutputClassW: number;
}
