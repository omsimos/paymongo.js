import type { MetaData, PaymentType } from "../types.js";

export interface CreatePaymentIntentProps {
  amount: number;
  payment_method_allowed?: PaymentType[];
  payment_method_options?: {
    card?: {
      request_three_d_secure?: "any" | "automatic";
      installments?: {
        enabled?: boolean;
      };
    };
  };
  currency?: "PHP" | string;
  description?: string;
  statement_descriptor?: string;
  capture_type?: "automatic" | "manual";
  setup_future_usage?: {
    session_type: "on_session" | "off_session";
    customer_id: string;
  };
  split_payment?: {
    transfer_to?: string;
    recipients?: {
      id: string;
      amount: number;
    }[];
  };
  metadata?: MetaData;
}

export interface RetrievePaymentIntentProps {
  intent_id: string;
  client_key?: string;
}

export interface AttachPaymentIntentProps {
  intent_id: string;
  method_id: string;
  client_key?: string;
  return_url?: string;
}

// response
export interface PaymentIntentAttributesResponse {
  amount: number;
  capture_type: string;
  currency: string;
  description?: string;
  statement_descriptor: string;
  status: string;
  livemode: boolean;
  client_key: string;
  created_at: number;
  updated_at: number;
  last_payment_error?: unknown;
  payment_method_allowed: PaymentType[];
  payments: unknown[];
  next_action?: {
    type: string;
    redirect: {
      url: string;
      return_url: string;
    };
  } | null;
  payment_method_options?: {
    card: {
      request_three_d_secure: string;
    };
  };
  metadata?: MetaData;
}

export interface PaymentIntentData {
  id: string;
  type: string;
  attributes: PaymentIntentAttributesResponse;
}

export interface PaymentIntentResponse {
  data: PaymentIntentData;
}

export interface AttachAttributes {
  amount: number;
  currency: string;
  description?: string;
  statement_descriptor: string;
  status: string;
  livemode: boolean;
  client_key: string;
  created_at: number;
  updated_at: number;
  last_payment_error?: unknown;
  payment_method_allowed: string[];
  payments: {
    id: string;
    type: string;
    attributes: {
      access_url?: string;
      amount: number;
      balance_transaction_id: string;
      billing?: unknown;
      currency: string;
      description?: string;
      disputed: boolean;
      external_reference_number?: string | null;
      fee: number;
      foreign_fee: number;
      livemode: boolean;
      net_amount: number;
      origin: string;
      payment_intent_id: string;
      payout?: unknown;
      source: {
        id: string;
        type: string;
        brand: string;
        country: string;
        last4: string;
      };
      statement_descriptor: string;
      status: string;
      tax_amount?: number | null;
      refunds: unknown[];
      taxes: unknown[];
      available_at: number;
      created_at: number;
      paid_at: number;
      updated_at: number;
    };
  }[];
  next_action?: {
    type: string;
    redirect: {
      url: string;
      return_url: string;
    };
  } | null;
  payment_method_options: {
    card: {
      request_three_d_secure: string;
    };
  };
  metadata?: MetaData;
}

export interface AttachData {
  id: string;
  type: string;
  attributes: AttachAttributes;
}

export interface AttachPaymentIntentResponse {
  data: AttachData;
}

// capture
export interface CapturePaymentIntentProps {
  amount?: number;
}

export interface CapturePaymentIntentResponse {
  data: Record<string, unknown>;
}

// cancel
export interface CancelPaymentIntentResponse {
  data: Record<string, unknown>;
}
