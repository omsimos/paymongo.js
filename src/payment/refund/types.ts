import type { MetaData } from "../types.js";

export type RefundReason = "duplicate" | "fraudulent" | "requested_by_customer" | "others";

export interface CreateRefundProps {
  paymentId: string;
  amount?: number;
  reason: RefundReason;
  notes?: string;
  metadata?: MetaData;
}

export interface RefundPayment {
  id: string;
  type: string;
  attributes: {
    amount: number;
    currency: string;
    status: string;
  };
}

export interface RefundTransaction {
  id: string;
  type: string;
  attributes: {
    amount: number;
    created_at: number;
    currency: string;
    status: string;
    type: string;
  };
}

export interface RefundAttributes {
  amount: number;
  currency: string;
  status: string;
  reason: string;
  notes?: string;
  payment: {
    data: RefundPayment;
  };
  refund_transaction: {
    data: RefundTransaction;
  };
  created_at: number;
}

export interface RefundData {
  id: string;
  type: string;
  attributes: RefundAttributes;
}

export interface RefundResponse {
  data: RefundData;
}

export interface ListRefundProps {
  paymentId?: string;
  limit?: number;
  after?: string;
  before?: string;
}

export interface ListRefundResponse {
  has_more: boolean;
  data: RefundData[];
}