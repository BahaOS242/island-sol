import { queryCollection } from "@/lib/wix/client";
import type { ApplianceCategory, ApplianceDefinition } from "@/lib/types/calculator";

interface RawAppliance {
  applianceName?: string;
  category?: string;
  icon?: string;
  estimatedRunningWatts?: number;
  estimatedStartupWatts?: number;
  typicalHours?: number;
  active?: boolean;
}

/**
 * Fallback reference table used only if the CMS is unreachable or the
 * `appliances` collection is empty, so the calculator never breaks. The
 * CMS is the source of truth in normal operation — a business owner can
 * add, remove, or re-tune these assumptions without a code change.
 */
const FALLBACK_APPLIANCES: ApplianceDefinition[] = [
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

export async function getApplianceDefinitions(): Promise<ApplianceDefinition[]> {
  const items = await queryCollection<RawAppliance>("appliances");
  const active = items.filter((item) => item.data.active ?? true);
  if (active.length === 0) return FALLBACK_APPLIANCES;

  return active.map((item) => ({
    id: (item.data.category as ApplianceCategory) ?? "other",
    label: item.data.applianceName ?? "Other",
    icon: item.data.icon ?? "plug",
    typicalRunningWattage: item.data.estimatedRunningWatts ?? 100,
    typicalSurgeWattage: item.data.estimatedStartupWatts ?? 150,
    typicalDutyCycleHoursPerDay: item.data.typicalHours ?? 4,
  }));
}

export function findApplianceDefinition(
  definitions: ApplianceDefinition[],
  id: string
): ApplianceDefinition | undefined {
  return definitions.find((a) => a.id === id);
}
