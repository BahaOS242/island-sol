import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MobileNav } from "@/components/layout/MobileNav";
import { NAV_LINKS, PRIMARY_CTA } from "@/lib/constants";

export function Header() {
  return (
    // Solid background (no backdrop-blur) on purpose: `backdrop-filter`
    // creates a CSS containing block for `position: fixed` descendants,
    // which trapped MobileNav's full-screen overlay inside the header's
    // own box instead of the viewport.
    <header className="sticky top-0 z-30 bg-navy-950">
      <Container className="flex h-[72px] items-center justify-between">
        <Link href="/" className="shrink-0">
          <Logo tone="onDark" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cream-50/80 hover:text-cream-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={PRIMARY_CTA.href} variant="primary" size="md">
            {PRIMARY_CTA.label}
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
