"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { SiteSettings } from "@/lib/data/siteSettings";

const SiteSettingsContext = createContext<SiteSettings | null>(null);

/**
 * Makes CMS-sourced Site Settings (WhatsApp number, business name, etc.)
 * available to Client Components anywhere in the tree without prop
 * drilling. Fetched once, server-side, in the root layout — this
 * provider only carries that already-resolved value across the
 * server/client boundary.
 */
export function SiteSettingsProvider({
  settings,
  children,
}: {
  settings: SiteSettings;
  children: ReactNode;
}) {
  return <SiteSettingsContext.Provider value={settings}>{children}</SiteSettingsContext.Provider>;
}

export function useSiteSettings(): SiteSettings {
  const ctx = useContext(SiteSettingsContext);
  if (!ctx) {
    throw new Error("useSiteSettings must be used within a SiteSettingsProvider");
  }
  return ctx;
}
