import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-gold-500 text-navy-950 hover:bg-gold-400 active:bg-gold-600",
  secondary: "border-[1.5px] border-current text-current hover:bg-current/[0.06]",
  ghost: "text-current underline underline-offset-4 decoration-current/40 hover:decoration-current",
};

const SIZE_CLASSES: Record<Size, string> = {
  md: "h-11 px-6 text-sm",
  lg: "h-14 px-8 text-base",
};

/**
 * Sharp rectangle, not a pill — see brand guidelines against generic
 * rounded-pill SaaS buttons. The only rounding in this system belongs to
 * small interactive controls (see FormField), never CTAs.
 */
const BASE =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-[0.04em] uppercase transition-colors duration-150 whitespace-nowrap";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  href,
  ...rest
}: CommonProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
