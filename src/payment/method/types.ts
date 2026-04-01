import type { MetaData, BillingType, PaymentType } from "../types.js";

export type PaymentMethodDetails =
  | { type: "card"; cardNumber: string; expMonth: number; expYear: number; cvc: string }
  | { type: "gcash" | "paymaya"; phoneNumber: string }
  | { type: "dob" | "brankas"; bankCode: string }
  | { type: Exclude<PaymentType, "card" | "gcash" | "paymaya" | "dob" | "brankas">; details: Record<string, unknown> }
  | { type: string; details?: Record<string, unknown> };

export interface PaymentMethodAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface CreatePaymentMethodProps {
  details: PaymentMethodDetails;
  type: PaymentType;
  billing?: BillingType;
  metadata?: MetaData;
  expirySeconds?: number;
}

// response - card details
export interface PaymentMethodCardDetails {
  email: string | null;
  first_name: string;
  last_name: string;
  type: string;
  expiry_month: number;
  expiry_year: number;
  last_4: string;
  network: string;
  country: string;
  description: string;
  statement_description: string;
  verification_url: string | null;
}

// response - generic details base
export interface PaymentMethodDetailsResponse {
  exp_month?: number;
  exp_year?: number;
  last4?: string;
}

// response - all possible detail types
export type PaymentMethodMethodDetails =
  | { type: "card"; card: PaymentMethodCardDetails }
  | { type: "gcash"; gcash: Record<string, unknown> | null }
  | { type: "paymaya"; paymaya: Record<string, unknown> | null }
  | { type: "qrph"; qr: Record<string, unknown> | null }
  | { type: "shopee_pay"; shopee_pay: Record<string, unknown> | null }
  | { type: "dob"; dob: Record<string, unknown> | null }
  | { type: "grab_pay"; grab_pay: Record<string, unknown> | null }
  | { type: "billease"; billease: Record<string, unknown> | null }
  | { type: "brankas"; brankas: Record<string, unknown> | null };

export interface PaymentMethodAttributesResponse {
  livemode: boolean;
  type: string;
  billing_details?: BillingType | null;
  created_at: number;
  updated_at: number;
  metadata?: MetaData | null;
  card?: PaymentMethodCardDetails | null;
  gcash_details?: Record<string, unknown> | null;
  paymaya_details?: Record<string, unknown> | null;
  qr_details?: Record<string, unknown> | null;
  shopee_pay_details?: Record<string, unknown> | null;
  dob_details?: Record<string, unknown> | null;
  grab_pay_details?: Record<string, unknown> | null;
  billease_details?: Record<string, unknown> | null;
  brankas_details?: Record<string, unknown> | null;
}

export interface PaymentMethodDataResponse {
  id: string;
  type: string;
  attributes: PaymentMethodAttributesResponse;
}

export interface PaymentMethodResponse {
  data: PaymentMethodDataResponse;
}
