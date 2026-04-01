export type TransactionType = "payment" | "refund" | "dispute";

export interface ListTransactionProps {
  limit?: number;
  cursor?: string;
  type?: TransactionType;
  createdAtStart?: number;
  createdAtEnd?: number;
}

export interface TransactionAttributes {
  amount: number;
  balance_transaction_id: string;
  created_at: number;
  currency: string;
  description?: string;
  fee: number;
  livemode: boolean;
  net_amount: number;
  organization_id: string;
  payout_id?: string;
  transaction_at: number;
  updated_at: number;
  paid_at?: number;
  tax_amount?: number;
  digital_withholding_vat_amount?: number;
}

export interface TransactionData {
  id: string;
  type: string;
  attributes: TransactionAttributes;
}

export interface TransactionPagination {
  next_cursor: string | null;
  prev_cursor: string | null;
}

export interface ListTransactionResponse {
  pagination: TransactionPagination;
  data: TransactionData[];
}