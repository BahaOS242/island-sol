import type { ReactNode } from "react";

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={`text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-gold-600 ${className}`}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className = "",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow ? <Eyebrow className="mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]">{title}</h2>
      {subtitle ? (
        <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">{subtitle}</p>
      ) : null}
    </div>
  );
}
