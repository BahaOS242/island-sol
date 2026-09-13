import Image from "next/image";

/**
 * The real ISLAND SOL brand mark (see public/logo-mark.png). Kept small
 * and paired with a plain text wordmark set in the site's own typeface —
 * per brand direction, the mark's energy stays a signature at header/
 * footer scale rather than driving the rest of the page's design system.
 */
export function Logo({ tone = "onLight", className = "" }: { tone?: "onLight" | "onDark"; className?: string }) {
  const textColor = tone === "onDark" ? "text-cream-50" : "text-navy-950";

  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <Image src="/logo-mark.png" alt="" width={240} height={183} className="h-8 w-auto sm:h-9" priority />
      <span className={`font-bold tracking-tight text-lg leading-none ${textColor}`}>
        ISLAND<span className="text-gold-600">SOL</span>
      </span>
    </span>
  );
}
