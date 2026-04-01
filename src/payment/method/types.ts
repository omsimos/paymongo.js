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
}

// response
export interface PaymentMethodDetailsResponse {
  exp_month: number;
  exp_year: number;
  last4: string;
}

export interface PaymentMethodAttributesResponse {
  livemode: boolean;
  type: string;
  billing?: BillingType | null;
  created_at: number;
  updated_at: number;
  details: PaymentMethodDetailsResponse;
  metadata?: MetaData | null;
}

export interface PaymentMethodDataResponse {
  id: string;
  type: string;
  attributes: PaymentMethodAttributesResponse;
}

export interface PaymentMethodResponse {
  data: PaymentMethodDataResponse;
}
