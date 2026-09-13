import { Container } from "@/components/ui/Container";

const ITEMS = [
  { title: "Quiet Power", description: "No engine noise.", icon: "volume" },
  { title: "No Fuel", description: "Recharge instead of refueling.", icon: "bolt" },
  { title: "Portable", description: "Take your power with you.", icon: "case" },
  { title: "Island Ready", description: "Designed around real-world island needs.", icon: "shield" },
] as const;

function Icon({ name }: { name: (typeof ITEMS)[number]["icon"] }) {
  const common = { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none" } as const;
  switch (name) {
    case "volume":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M3 7h3l4-3v12l-4-3H3V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M14 7.5c1 1.2 1 4 0 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M11 2 4 12h5l-1 6 7-10h-5l1-6Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
    case "case":
      return (
        <svg {...common} aria-hidden="true">
          <rect x="3" y="6" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M7 6V4.5A1.5 1.5 0 0 1 8.5 3h3A1.5 1.5 0 0 1 13 4.5V6" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common} aria-hidden="true">
          <path d="M10 2.5 16 5v5c0 4-2.7 6.5-6 7.5-3.3-1-6-3.5-6-7.5V5l6-2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      );
  }
}

export function TrustStrip() {
  return (
    <section className="border-b border-mist-200 bg-cream-50">
      <Container className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy-950 text-gold-500">
              <Icon name={item.icon} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink">{item.title}</p>
              <p className="text-sm text-slate-600">{item.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
