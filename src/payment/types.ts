// intent
export * from "./intent/types.js";

// method
export * from "./method/types.js";

// webhook
export * from "./webhook/types.js";

// source
export * from "./source/types.js";

// links
export * from "./link/types.js";

// payments
export interface PaymentProps {
  amount: number;
  source: {
    id: string;
    type: string;
  };
  currency?: CurrencyType;
  description?: string;
  statement_descriptor?: string;
}

export interface PaymentResponse {
  data: PaymentData;
}

export interface PaymentData {
  id: string;
  type: string;
  attributes: PaymentAttributes;
}

export interface PaymentAttributes {
  access_url?: string | null;
  amount: number;
  balance_transaction_id: string;
  billing?: BillingType;
  currency: CurrencyType;
  description: string;
  disputed: boolean;
  external_reference_number?: string | null;
  fee: number;
  livemode: boolean;
  net_amount: number;
  origin: string;
  payment_intent_id?: string | null;
  payout?: string | null;
  source: PaymentSource;
  statement_descriptor: string;
  status: StatusType;
  tax_amount?: number | null;
  refunds: unknown[];
  taxes: unknown[];
  available_at: number;
  created_at: number;
  paid_at: number;
  updated_at: number;
}

export interface PaymentSource {
  id: string;
  type: SourceType;
}

export interface ListPaymentResponse {
  has_more: boolean;
  data: PaymentData[];
}

// general types
export type MetaData = {
  [key: string]: string;
};

export type PaymentType =
  | "billease"
  | "card"
  | "dob"
  | "gcash"
  | "grab_pay"
  | "paymaya"
  | "brankas"
  | "qrph"
  | "shopee_pay"
  | (string & {});

export type SourceType = "gcash" | "grab_pay" | (string & {});

export type CurrencyType = "PHP";

export type RedirectType = {
  success: string;
  failed: string;
  checkout_url?: string;
};

export type StatusType = "pending" | "paid" | "failed" | "refunded" | (string & {});

export type WebhookEvent =
  | "checkout_session.payment.paid"
  | "source.chargeable"
  | "payment.paid"
  | "payment.failed"
  | "payment.refunded"
  | "payment.refund.updated"
  | "link.payment.paid"
  | "qrph.expired"
  | "subscription.past_due"
  | "subscription.unpaid"
  | "subscription.updated"
  | "subscription.invoice.created"
  | "subscription.invoice.finalized"
  | "subscription.invoice.paid"
  | "subscription.invoice.payment_failed"
  | (string & {});

/**
 * @property {string} name - Name of the billing information
 * @property {string} phone - Phone number of the billing information
 * @property {string} email - E-mail address of the billing information
 * @property {string} address - Address of the billing information
 */
export type BillingType = {
  name?: string;
  phone?: string;
  email?: string;
  address?: AddressType;
};

export type AddressType = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};
