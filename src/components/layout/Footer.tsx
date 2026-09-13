import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { buildWhatsAppLink } from "@/lib/constants";
import { getSiteSettings } from "@/lib/data/siteSettings";

const FOOTER_COLUMNS = [
  {
    heading: "Shop",
    links: [
      { label: "Products", href: "/products" },
      { label: "Solutions", href: "/solutions" },
      { label: "Power Calculator", href: "/power-calculator" },
      { label: "Trade-In", href: "/trade-in" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/support" },
    ],
  },
];

export async function Footer() {
  const year = new Date().getFullYear();
  const settings = await getSiteSettings();

  return (
    <footer className="bg-navy-950 text-cream-50/80">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo tone="onDark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream-50/60">
              Portable power and backup energy for island life.
            </p>
            <a
              href={buildWhatsAppLink(settings.supportMessage, settings.whatsapp)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-turquoise-400 hover:text-turquoise-300"
            >
              WhatsApp Us
            </a>
          </div>

          {FOOTER_COLUMNS.map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cream-50/40">
                {col.heading}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-cream-50/70 hover:text-cream-50">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-cream-50/10 pt-8 text-xs text-cream-50/40 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} {settings.businessName}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms" className="hover:text-cream-50/70">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-cream-50/70">
              Privacy
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
