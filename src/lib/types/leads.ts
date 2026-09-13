/** Lead-capture data models (general inquiry, quote, trade-in, recommendation). */

export type PreferredContactMethod = "whatsapp" | "email" | "phone";

export type LeadType =
  | "general_inquiry"
  | "product_recommendation"
  | "quote_request"
  | "trade_in"
  | "business_backup"
  | "home_backup";

export interface QuoteRequest {
  name: string;
  contact: string;
  email: string;
  useCase: string;
  approximateBudget: string | null;
  whatToPower: string;
  preferredContactMethod: PreferredContactMethod;
  notes: string | null;
}

export interface TradeInRequest {
  name: string;
  contact: string;
  email: string;
  ownedProductSlug: string | null;
  ownedProductDescription: string;
  conditionNotes: string;
  interestedInUpgradingTo: string | null;
}

export interface Lead {
  type: LeadType;
  submittedAt: string;
  payload: QuoteRequest | TradeInRequest | Record<string, string>;
}
