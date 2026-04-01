import type { MetaData, BillingType, PaymentType } from "../types.js";

export type PaymentMethodDetails =
  | { type: "card"; card_number: string; exp_month: number; exp_year: number; cvc: string }
  | { type: "gcash" | "paymaya"; phone_number: string }
  | { type: "dob" | "brankas"; bank_code: string }
  | { type: Exclude<PaymentType, "card" | "gcash" | "paymaya" | "dob" | "brankas">; details: Record<string, unknown> }
  | { type: string; details?: Record<string, unknown> };

export interface CreatePaymentMethodProps {
  details: PaymentMethodDetails;
  type: PaymentType;
  billing?: BillingType;
  metadata?: MetaData;
  expiry_seconds?: number;
}

// response
export interface PaymentMethodAttributesResponse {
  livemode: boolean;
  type: string;
  billing_details?: BillingType | null;
  created_at: number;
  updated_at: number;
  metadata?: MetaData | null;
  card?: {
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
  } | null;
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