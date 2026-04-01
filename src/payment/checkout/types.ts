import type { MetaData, PaymentType } from "../types.js";

export interface CreateCheckoutSessionProps {
  line_items: {
    name: string;
    amount: number;
    currency?: "PHP";
    quantity: number;
    description?: string;
    image_url?: string;
  }[];
  payment_method_types: PaymentType[];
  success_url: string;
  cancel_url?: string;
  description?: string;
  statement_descriptor?: string;
  metadata?: MetaData;
}

export interface CheckoutSessionAttributes {
  checkout_url: string;
  reference_number?: string;
  status: string;
  line_items?: {
    name: string;
    amount: number;
    currency?: "PHP";
    quantity: number;
    description?: string;
    image_url?: string;
  }[];
  payments?: unknown[];
  metadata?: MetaData;
}

export interface CheckoutSessionData {
  id: string;
  type: string;
  attributes: CheckoutSessionAttributes;
}

export interface CheckoutSessionResponse {
  data: CheckoutSessionData;
}

export interface RetrieveCheckoutSessionProps {
  checkout_id: string;
}

export interface RetrieveCheckoutSessionAttributes {
  reference_number: string;
  status: string;
  payments: unknown[];
  metadata?: MetaData;
}

export interface RetrieveCheckoutSessionData {
  id: string;
  type: string;
  attributes: RetrieveCheckoutSessionAttributes;
}

export interface RetrieveCheckoutSessionResponse {
  data: RetrieveCheckoutSessionData;
}