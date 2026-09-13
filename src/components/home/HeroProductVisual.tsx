/**
 * Placeholder hero product visual.
 *
 * Real product photography (shot per the brand's dark-environment /
 * solar-gold rim-light / turquoise accent direction) should replace this
 * once available — swap the <svg> below for a next/image render of the
 * actual product. Built as an abstract illustration on purpose: we never
 * present a stand-in as if it were a real ISLAND SOL product photo.
 *
 * Deliberately has no blurred glow or gradient halo behind it — the only
 * background element is a single precise, unblurred ring referencing the
 * logo's sun motif, cropped off-center for asymmetry rather than centered
 * behind the product like a generic "feature glow."
 */
export function HeroProductVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <svg
        className="pointer-events-none absolute -right-6 -top-6 h-[70%] w-[70%] opacity-[0.35]"
        viewBox="0 0 200 200"
        aria-hidden="true"
      >
        <circle cx="100" cy="100" r="98" fill="none" stroke="var(--color-gold-500)" strokeWidth="1" />
      </svg>

      <svg
        viewBox="0 0 400 400"
        className="relative h-full w-full"
        role="img"
        aria-label="Illustration of a portable power station"
      >
        <defs>
          <linearGradient id="bodyGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1D3A5C" />
            <stop offset="55%" stopColor="#0D1F33" />
            <stop offset="100%" stopColor="#081321" />
          </linearGradient>
          <linearGradient id="rimGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-400)" stopOpacity="0.9" />
            <stop offset="100%" stopColor="var(--color-gold-500)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="screenGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-turquoise-400)" />
            <stop offset="100%" stopColor="var(--color-turquoise-600)" />
          </linearGradient>
        </defs>

        {/* Body */}
        <rect x="90" y="120" width="220" height="190" rx="10" fill="url(#bodyGradient)" />
        {/* Gold rim light, left edge */}
        <rect x="90" y="120" width="8" height="190" fill="url(#rimGold)" />
        {/* Handle */}
        <rect x="150" y="92" width="100" height="34" rx="6" fill="none" stroke="#2A4D76" strokeWidth="10" />
        {/* Screen */}
        <rect x="118" y="150" width="90" height="46" rx="2" fill="#040A11" stroke="#2A4D76" strokeWidth="2" />
        <rect x="126" y="164" width="54" height="8" fill="url(#screenGlow)" />
        {/* Ports */}
        <circle cx="230" cy="215" r="10" fill="#040A11" stroke="#2A4D76" strokeWidth="2" />
        <circle cx="258" cy="215" r="10" fill="#040A11" stroke="#2A4D76" strokeWidth="2" />
        <rect x="220" y="240" width="60" height="16" rx="2" fill="#040A11" stroke="#2A4D76" strokeWidth="2" />
        {/* Base shadow */}
        <ellipse cx="200" cy="322" rx="110" ry="10" fill="#000000" opacity="0.3" />
      </svg>
    </div>
  );
}
