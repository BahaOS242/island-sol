/**
 * Non-CMS constants only: fixed conversion-hierarchy CTAs and a fallback
 * WhatsApp number. Business content (nav labels, business name, the
 * WhatsApp number itself) lives in the CMS — see src/lib/data/siteSettings.ts
 * and src/lib/data/navigation.ts — and should be preferred over these
 * wherever a Server Component can fetch it.
 */

export const DEFAULT_WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "10000000000";

export function buildWhatsAppLink(message: string, number: string = DEFAULT_WHATSAPP_NUMBER): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export const PRIMARY_CTA = { label: "SHOP POWER", href: "/products" } as const;
export const SECONDARY_CTA = { label: "FIND YOUR POWER", href: "/power-calculator" } as const;
export const TERTIARY_CTA = { label: "TALK TO ISLAND SOL", href: "/support" } as const;
