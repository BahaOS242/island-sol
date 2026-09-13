"use client";

import { useState } from "react";
import { FormField, fieldClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/constants";

/**
 * There is no trade-in backend yet (see TradeInRequest type / spawn
 * section on TradeInRequest CMS collection). Until one exists, submitting
 * this form hands the details to ISLAND SOL over WhatsApp so trade-in
 * requests are still actionable today. Swap `handleSubmit` for a real POST
 * to the TradeInRequest collection once the Wix backend is connected —
 * the form fields already match that data model 1:1.
 */
export function TradeInForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    ownedProductDescription: "",
    conditionNotes: "",
    interestedInUpgradingTo: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const message = [
    "Hi ISLAND SOL, I'd like to start a trade-in.",
    form.name && `Name: ${form.name}`,
    form.contact && `Contact: ${form.contact}`,
    form.ownedProductDescription && `Current unit: ${form.ownedProductDescription}`,
    form.conditionNotes && `Condition: ${form.conditionNotes}`,
    form.interestedInUpgradingTo && `Interested in upgrading to: ${form.interestedInUpgradingTo}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(buildWhatsAppLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <FormField label="Name" htmlFor="ti-name" required>
        <input
          id="ti-name"
          required
          className={fieldClasses}
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
      </FormField>

      <FormField label="Phone or Email" htmlFor="ti-contact" required>
        <input
          id="ti-contact"
          required
          className={fieldClasses}
          value={form.contact}
          onChange={(e) => update("contact", e.target.value)}
        />
      </FormField>

      <FormField label="What ISLAND SOL system do you currently own?" htmlFor="ti-product">
        <input
          id="ti-product"
          className={fieldClasses}
          placeholder="e.g. ISLAND SOL Portable"
          value={form.ownedProductDescription}
          onChange={(e) => update("ownedProductDescription", e.target.value)}
        />
      </FormField>

      <FormField label="Condition of your current unit" htmlFor="ti-condition">
        <textarea
          id="ti-condition"
          rows={3}
          className={fieldClasses}
          placeholder="Age, usage, any issues"
          value={form.conditionNotes}
          onChange={(e) => update("conditionNotes", e.target.value)}
        />
      </FormField>

      <FormField label="What are you looking to upgrade to?" htmlFor="ti-upgrade">
        <input
          id="ti-upgrade"
          className={fieldClasses}
          placeholder="e.g. Home Essentials, Pro Backup"
          value={form.interestedInUpgradingTo}
          onChange={(e) => update("interestedInUpgradingTo", e.target.value)}
        />
      </FormField>

      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        Start My Trade-In
      </Button>
      <p className="text-xs text-slate-500">
        This sends your details to ISLAND SOL over WhatsApp so we can evaluate your unit.
      </p>
    </form>
  );
}
