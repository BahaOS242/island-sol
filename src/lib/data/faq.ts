import type { FaqItem } from "@/lib/types/content";

/**
 * General, product-category-level FAQ content. Deliberately avoids
 * ISLAND-SOL-specific claims (warranty terms, delivery windows, exact
 * specs) that haven't been confirmed — those get their own entries once
 * finalized.
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "how-to-choose",
    question: "How do I know which system I need?",
    answer:
      "Use the power calculator to tell us what you want to keep running. It gives you a recommended tier based on your actual load — or you can talk to us directly for a tailored recommendation.",
    category: "calculator",
  },
  {
    id: "indoor-use",
    question: "Can I use a power station indoors?",
    answer:
      "Portable power stations recharge from an outlet or solar panel and don't produce exhaust, so — depending on the model — indoor use is generally fine. Always check the specific product's guidance.",
    category: "product",
  },
  {
    id: "charging-time",
    question: "How long does it take to charge?",
    answer:
      "Charging time depends on the model and charging method (wall outlet, solar, or car charger). Exact charging times will be listed on each product page.",
    category: "product",
  },
  {
    id: "runtime-estimate",
    question: "How accurate is the runtime estimate from the calculator?",
    answer:
      "It's an estimate based on typical appliance wattage, not a guarantee. Actual runtime depends on your specific devices, their real power draw, and operating conditions.",
    category: "calculator",
  },
  {
    id: "trade-in",
    question: "Can I upgrade to a larger system later?",
    answer:
      "Yes — ISLAND SOL's trade-in program lets you put the value of your current unit toward a larger system. Start a trade-in request and we'll evaluate your unit's condition.",
    category: "trade_in",
  },
  {
    id: "support-channel",
    question: "What's the fastest way to reach ISLAND SOL?",
    answer: "WhatsApp is the fastest way to reach us directly for questions, quotes, or support.",
    category: "support",
  },
];
