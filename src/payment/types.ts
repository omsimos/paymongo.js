// intent
export * from "./intent/types";

// method
export * from "./method/types";

// webhook
export * from "./webhook/types";

// source
export * from "./source/types";

// links
export * from "./link/types";

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
  access_url?: any;
  amount: number;
  balance_transaction_id: string;
  billing?: BillingType;
  currency: CurrencyType;
  description: string;
  disputed: boolean;
  external_reference_number?: any;
  fee: number;
  livemode: boolean;
  net_amount: number;
  origin: string;
  payment_intent_id?: any;
  payout?: any;
  source: PaymentSource;
  statement_descriptor: string;
  status: StatusType;
  tax_amount?: any;
  refunds: any[];
  taxes: any[];
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

export type PaymentType = "card" | "paymaya" | string;
export type SourceType = "gcash" | "grab_pay" | string;
export type CurrencyType = "PHP";
export type RedirectType = {
  success: string;
  failed: string;
  checkout_url?: string;
};
export type StatusType = "pending" | "paid" | string;

export type WebhookEvent =
  | "source.chargeable"
  | "payment.paid"
  | "payment.failed";

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
