import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { getNavigationItems } from "@/lib/data/navigation";
import { getSiteSettings } from "@/lib/data/siteSettings";

export async function Header() {
  const [navItems, settings] = await Promise.all([getNavigationItems(), getSiteSettings()]);

  return (
    <header className="sticky top-0 z-30 bg-navy-950">
      <Container className="flex h-[72px] items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo tone="onDark" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              className="text-sm font-medium text-cream-50/80 hover:text-cream-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={settings.primaryCtaLink} variant="primary" size="md">
            {settings.primaryCtaLabel}
          </Button>
        </div>

        <MobileNav
          navItems={navItems}
          primaryCta={{ label: settings.primaryCtaLabel, href: settings.primaryCtaLink }}
        />
      </Container>
    </header>
  );
}
