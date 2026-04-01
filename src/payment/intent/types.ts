import type { MetaData, PaymentType } from "../types.js";

export interface SetupFutureUsage {
  sessionType: "on_session" | "off_session";
  customerId: string;
}

export interface SplitPaymentRecipient {
  id: string;
  amount: number;
}

export interface SplitPayment {
  transferTo?: string;
  recipients?: SplitPaymentRecipient[];
}

export interface PaymentIntentCardOptions {
  requestThreeDSecure?: "any" | "automatic";
  installments?: {
    enabled?: boolean;
  };
}

export interface PaymentMethodOptions {
  card?: PaymentIntentCardOptions;
}

export interface CreatePaymentIntentProps {
  amount: number;
  paymentMethodAllowed?: PaymentType[];
  paymentMethodOptions?: PaymentMethodOptions;
  currency?: "PHP" | string;
  description?: string;
  statementDescriptor?: string;
  captureType?: "automatic" | "manual";
  setupFutureUsage?: SetupFutureUsage;
  splitPayment?: SplitPayment;
  metadata?: MetaData;
}

export interface RetrievePaymentIntentProps {
  intentId: string;
  clientKey?: string;
}

export interface AttachPaymentIntentProps {
  intentId: string;
  methodId: string;
  clientKey?: string;
  returnUrl?: string;
}

// response
export interface PaymentIntentNextAction {
  type: string;
  redirect: {
    url: string;
    return_url: string;
  };
}

export interface PaymentIntentCardResponse {
  request_three_d_secure: string;
}

export interface PaymentIntentPaymentMethodOptionsResponse {
  card: PaymentIntentCardResponse;
}

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
  next_action?: PaymentIntentNextAction | null;
  payment_method_options?: PaymentIntentPaymentMethodOptionsResponse;
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

export interface AttachSource {
  id: string;
  type: string;
  brand: string;
  country: string;
  last4: string;
}

export interface AttachPaymentAttributes {
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
  source: AttachSource;
  statement_descriptor: string;
  status: string;
  tax_amount?: number | null;
  refunds: unknown[];
  taxes: unknown[];
  available_at: number;
  created_at: number;
  paid_at: number;
  updated_at: number;
}

export interface AttachPayment {
  id: string;
  type: string;
  attributes: AttachPaymentAttributes;
}

export interface AttachCard {
  request_three_d_secure: string;
}

export interface AttachPaymentMethodOptions {
  card: AttachCard;
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
  payments: AttachPayment[];
  next_action?: PaymentIntentNextAction | null;
  payment_method_options: AttachPaymentMethodOptions;
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
