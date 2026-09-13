import type { ApplianceDefinition } from "@/lib/types/calculator";

/**
 * Typical wattage reference table used by the power calculator to produce
 * a rough estimate. These are generic, widely-published average figures
 * for the appliance category — not ISLAND SOL product specifications and
 * not a guarantee of any individual device's actual draw. The calculator
 * UI always surfaces a disclaimer alongside any result derived from this
 * table (see PowerCalculator's disclaimer copy).
 */
export const APPLIANCE_DEFINITIONS: ApplianceDefinition[] = [
  { id: "refrigerator", label: "Refrigerator", icon: "fridge", typicalRunningWattage: 150, typicalSurgeWattage: 400, typicalDutyCycleHoursPerDay: 8 },
  { id: "tv", label: "TV", icon: "tv", typicalRunningWattage: 100, typicalSurgeWattage: 120, typicalDutyCycleHoursPerDay: 4 },
  { id: "wifi_router", label: "Wi-Fi Router", icon: "wifi", typicalRunningWattage: 10, typicalSurgeWattage: 15, typicalDutyCycleHoursPerDay: 24 },
  { id: "lights", label: "Lights", icon: "lightbulb", typicalRunningWattage: 10, typicalSurgeWattage: 10, typicalDutyCycleHoursPerDay: 6 },
  { id: "fans", label: "Fan", icon: "fan", typicalRunningWattage: 55, typicalSurgeWattage: 100, typicalDutyCycleHoursPerDay: 8 },
  { id: "laptop", label: "Laptop", icon: "laptop", typicalRunningWattage: 65, typicalSurgeWattage: 90, typicalDutyCycleHoursPerDay: 6 },
  { id: "phone", label: "Phone", icon: "phone", typicalRunningWattage: 10, typicalSurgeWattage: 15, typicalDutyCycleHoursPerDay: 2 },
  { id: "gaming_console", label: "Gaming Console", icon: "gamepad", typicalRunningWattage: 150, typicalSurgeWattage: 200, typicalDutyCycleHoursPerDay: 3 },
  { id: "cpap", label: "CPAP", icon: "cpap", typicalRunningWattage: 40, typicalSurgeWattage: 60, typicalDutyCycleHoursPerDay: 8 },
  { id: "microwave", label: "Microwave", icon: "microwave", typicalRunningWattage: 1000, typicalSurgeWattage: 1200, typicalDutyCycleHoursPerDay: 0.25 },
  { id: "ac_unit", label: "AC Unit", icon: "ac", typicalRunningWattage: 1200, typicalSurgeWattage: 2200, typicalDutyCycleHoursPerDay: 6 },
  { id: "other", label: "Other", icon: "plug", typicalRunningWattage: 100, typicalSurgeWattage: 150, typicalDutyCycleHoursPerDay: 4 },
];

export function getApplianceDefinition(id: string) {
  return APPLIANCE_DEFINITIONS.find((a) => a.id === id);
}
