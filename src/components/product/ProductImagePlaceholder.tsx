/**
 * Shown when a product has no real photography yet. Deliberately abstract
 * (not a fake product photo) — swap for next/image once real photography
 * exists (see Product.image / Product.gallery).
 */
export function ProductImagePlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-gradient-to-br from-navy-900 to-navy-950 ${className}`}
    >
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <rect x="14" y="18" width="36" height="30" rx="6" stroke="var(--color-gold-500)" strokeWidth="2" />
        <rect x="22" y="26" width="14" height="7" rx="2" fill="var(--color-turquoise-500)" opacity="0.8" />
        <circle cx="44" cy="38" r="3" fill="none" stroke="var(--color-gold-500)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
