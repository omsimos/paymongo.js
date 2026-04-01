import type {
  CurrencyType,
  RedirectType,
  SourceType,
  StatusType,
  BillingType,
} from "../types.js";

export interface CreateSourceProps {
  amount: number;
  redirect: RedirectType;
  type: SourceType;
  currency: CurrencyType;
  billing?: BillingType;
}
export interface PaymentSourceResponse {
  data: {
    id: string;
    type: string;
    attributes: PaymentSourceAttributes;
  };
}

export interface PaymentSourceAttributes {
  amount: number;
  billing?: BillingType;
  currency: CurrencyType;
  description?: string | null;
  livemode: boolean;
  redirect: RedirectType;
  statement_descriptor?: string | null;
  status: StatusType;
  type: SourceType;
  created_at: number;
  updated_at: number;
}
