/**
 * PLACEHOLDER LOGO.
 *
 * ISLAND SOL does not yet have a finished brand mark in this project, and
 * per brand guidelines we don't fabricate one and present it as final.
 * This is a simple, neutral wordmark + sun/power glyph used purely so the
 * header, footer, and mobile nav have consistent branding to build
 * against. Swap this component's contents for the real logo (SVG or
 * next/image) when it's ready — every place that needs the logo already
 * imports from here, so there's exactly one place to update.
 */
export function Logo({ tone = "onLight", className = "" }: { tone?: "onLight" | "onDark"; className?: string }) {
  const textColor = tone === "onDark" ? "text-cream-50" : "text-navy-950";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <circle cx="14" cy="14" r="13" stroke="var(--color-gold-500)" strokeWidth="2" />
        <path
          d="M14 6.5V21.5M8 10L20 18M8 18L20 10"
          stroke="var(--color-turquoise-500)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      <span className={`font-bold tracking-tight text-lg leading-none ${textColor}`}>
        ISLAND<span className="text-gold-600">SOL</span>
      </span>
    </span>
  );
}
