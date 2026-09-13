"use client";

import { useState } from "react";
import { FormField, fieldClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { buildWhatsAppLink } from "@/lib/constants";

/**
 * Same interim pattern as TradeInForm: no lead-capture backend yet, so
 * this routes the structured request to WhatsApp. Fields match the
 * QuoteRequest data model — swap the submit handler for a real POST once
 * a backend (Wix Data / CRM) exists.
 */
export function QuoteForm({ whatsappNumber }: { whatsappNumber?: string }) {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    whatToPower: "",
    approximateBudget: "",
    notes: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const message = [
    "Hi ISLAND SOL, I'd like a quote.",
    form.name && `Name: ${form.name}`,
    form.contact && `Contact: ${form.contact}`,
    form.email && `Email: ${form.email}`,
    form.whatToPower && `What I need to power: ${form.whatToPower}`,
    form.approximateBudget && `Approximate budget: ${form.approximateBudget}`,
    form.notes && `Notes: ${form.notes}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(buildWhatsAppLink(message, whatsappNumber), "_blank", "noopener,noreferrer");
      }}
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField label="Name" htmlFor="q-name" required>
          <input id="q-name" required className={fieldClasses} value={form.name} onChange={(e) => update("name", e.target.value)} />
        </FormField>
        <FormField label="Phone" htmlFor="q-contact" required>
          <input id="q-contact" required className={fieldClasses} value={form.contact} onChange={(e) => update("contact", e.target.value)} />
        </FormField>
      </div>

      <FormField label="Email" htmlFor="q-email">
        <input id="q-email" type="email" className={fieldClasses} value={form.email} onChange={(e) => update("email", e.target.value)} />
      </FormField>

      <FormField label="What do you need to power?" htmlFor="q-what" required>
        <textarea
          id="q-what"
          required
          rows={3}
          className={fieldClasses}
          placeholder="e.g. refrigerator, Wi-Fi, lights during outages"
          value={form.whatToPower}
          onChange={(e) => update("whatToPower", e.target.value)}
        />
      </FormField>

      <FormField label="Approximate budget (optional)" htmlFor="q-budget">
        <input id="q-budget" className={fieldClasses} value={form.approximateBudget} onChange={(e) => update("approximateBudget", e.target.value)} />
      </FormField>

      <FormField label="Anything else we should know? (optional)" htmlFor="q-notes">
        <textarea id="q-notes" rows={2} className={fieldClasses} value={form.notes} onChange={(e) => update("notes", e.target.value)} />
      </FormField>

      <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">
        Send Request
      </Button>
      <p className="text-xs text-slate-500">This sends your request to ISLAND SOL over WhatsApp.</p>
    </form>
  );
}
