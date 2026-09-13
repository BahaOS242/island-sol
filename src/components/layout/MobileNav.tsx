"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS, PRIMARY_CTA, SECONDARY_CTA, buildWhatsAppLink } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="relative z-50 flex h-11 w-11 items-center justify-center rounded-full text-cream-50"
      >
        <span className="sr-only">Menu</span>
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          {open ? (
            <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M2 6h18M2 11h18M2 16h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-40 flex flex-col bg-navy-950 px-6 pt-24 pb-10">
          <div className="flex flex-col gap-1">
            <Link
              href={PRIMARY_CTA.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl bg-gold-500 px-5 py-4 text-center text-base font-bold uppercase tracking-wide text-navy-950"
            >
              {PRIMARY_CTA.label}
            </Link>
            <Link
              href={SECONDARY_CTA.href}
              onClick={() => setOpen(false)}
              className="mt-3 rounded-2xl border border-cream-50/25 px-5 py-4 text-center text-base font-bold uppercase tracking-wide text-cream-50"
            >
              {SECONDARY_CTA.label}
            </Link>
            <a
              href={buildWhatsAppLink("Hi ISLAND SOL, I have a question.")}
              onClick={() => setOpen(false)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 rounded-2xl border border-turquoise-500/40 px-5 py-4 text-center text-base font-bold uppercase tracking-wide text-turquoise-400"
            >
              WhatsApp / Contact
            </a>
          </div>

          <nav className="mt-10 flex flex-col divide-y divide-cream-50/10 border-t border-b border-cream-50/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-4 text-lg font-medium text-cream-50/90"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
