import type { MetaData, PaymentType } from "../types.js";

export interface CheckoutLineItem {
  name: string;
  amount: number;
  currency?: "PHP";
  quantity: number;
  description?: string;
  imageUrl?: string;
}

export interface CreateCheckoutSessionProps {
  lineItems: CheckoutLineItem[];
  paymentMethodTypes: PaymentType[];
  successUrl: string;
  cancelUrl?: string;
  description?: string;
  statementDescriptor?: string;
  metadata?: MetaData;
}

export interface CheckoutSessionAttributes {
  checkoutUrl: string;
  referenceNumber?: string;
  status: string;
  lineItems?: CheckoutLineItem[];
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
  checkoutId: string;
}

export interface RetrieveCheckoutSessionAttributes {
  referenceNumber: string;
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