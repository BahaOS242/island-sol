import type { Solution } from "@/lib/types/product";

/**
 * A solution has no CMS-stored CTA copy/link by design (see the
 * `solutions` collection schema) — the call to action is a presentation
 * decision derived here in code, not marketing content in the CMS.
 *
 * Deliberately has no dependency on the Wix server client — it's a pure
 * function so it can be safely imported from Client Components (e.g.
 * ResultCard, rendered inside the interactive power calculator).
 */
export function solutionCta(solution: Solution): { label: string; href: string } {
  if (solution.recommendedProductIds.length > 0) {
    return { label: `Shop ${solution.solutionName}`, href: `/products?solution=${solution.slug}` };
  }
  return { label: "Request a Quote", href: "/support?type=quote_request" };
}
