import { queryCollection } from "@/lib/wix/client";

export interface SiteSettings {
  businessName: string;
  logo: string | null;
  favicon: string | null;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebookUrl: string | null;
  instagramUrl: string | null;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  defaultOgImage: string | null;
  currency: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  supportMessage: string;
}

interface RawSiteSettings {
  businessName?: string;
  logo?: string;
  favicon?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  defaultSeoTitle?: string;
  defaultSeoDescription?: string;
  defaultOgImage?: string;
  currency?: string;
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  supportMessage?: string;
}

const FALLBACK_SETTINGS: SiteSettings = {
  businessName: "ISLAND SOL",
  logo: null,
  favicon: null,
  phone: "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "10000000000",
  email: "",
  address: "",
  facebookUrl: null,
  instagramUrl: null,
  defaultSeoTitle: "ISLAND SOL — Portable Power & Backup Energy for The Bahamas",
  defaultSeoDescription:
    "Portable power stations and backup energy systems for homes and businesses in The Bahamas.",
  defaultOgImage: null,
  currency: "USD",
  primaryCtaLabel: "Shop Power",
  primaryCtaLink: "/products",
  supportMessage: "Hi ISLAND SOL, I have a question.",
};

/**
 * Site Settings is a single-item collection — this always resolves the
 * first item, falling back to hardcoded defaults if the CMS is
 * unreachable or the item hasn't been created yet, so the site never
 * renders with a missing business name or WhatsApp number.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  const items = await queryCollection<RawSiteSettings>("site-settings");
  const data = items[0]?.data;
  if (!data) return FALLBACK_SETTINGS;

  return {
    businessName: data.businessName || FALLBACK_SETTINGS.businessName,
    logo: data.logo ?? null,
    favicon: data.favicon ?? null,
    phone: data.phone ?? "",
    whatsapp: data.whatsapp || FALLBACK_SETTINGS.whatsapp,
    email: data.email ?? "",
    address: data.address ?? "",
    facebookUrl: data.facebookUrl ?? null,
    instagramUrl: data.instagramUrl ?? null,
    defaultSeoTitle: data.defaultSeoTitle || FALLBACK_SETTINGS.defaultSeoTitle,
    defaultSeoDescription: data.defaultSeoDescription || FALLBACK_SETTINGS.defaultSeoDescription,
    defaultOgImage: data.defaultOgImage ?? null,
    currency: data.currency || FALLBACK_SETTINGS.currency,
    primaryCtaLabel: data.primaryCtaLabel || FALLBACK_SETTINGS.primaryCtaLabel,
    primaryCtaLink: data.primaryCtaLink || FALLBACK_SETTINGS.primaryCtaLink,
    supportMessage: data.supportMessage || FALLBACK_SETTINGS.supportMessage,
  };
}
