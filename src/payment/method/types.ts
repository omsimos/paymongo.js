import { MetaData, BillingType } from "../types";

// props
export interface PaymentMethodDetails {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}

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
  type: string;
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
  billing?: any;
  created_at: number;
  updated_at: number;
  details: PaymentMethodDetailsResponse;
  metadata?: any;
}

export interface PaymentMethodDataResponse {
  id: string;
  type: string;
  attributes: PaymentMethodAttributesResponse;
}

export interface PaymentMethodResponse {
  data: PaymentMethodDataResponse;
}
