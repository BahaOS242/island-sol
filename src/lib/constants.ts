export const SITE_NAME = "ISLAND SOL";

export const SITE_DESCRIPTION =
  "Portable power stations and backup energy systems for homes and businesses in The Bahamas.";

/**
 * TODO(business): replace with the real ISLAND SOL WhatsApp Business number
 * (E.164 format, e.g. "12425551234"). This placeholder is intentionally
 * NOT a real number.
 */
export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "10000000000";

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export const NAV_LINKS = [
  { label: "Products", href: "/products" },
  { label: "Solutions", href: "/solutions" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Trade-In", href: "/trade-in" },
  { label: "Support", href: "/support" },
] as const;

export const PRIMARY_CTA = { label: "SHOP POWER", href: "/products" } as const;
export const SECONDARY_CTA = { label: "FIND YOUR POWER", href: "/power-calculator" } as const;
export const TERTIARY_CTA = { label: "TALK TO ISLAND SOL", href: "/support" } as const;
