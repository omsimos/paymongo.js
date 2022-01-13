export interface CreatePaymentLinkProps {
  amount: number;
  description: string;
  remarks?: string;
}

export interface PaymentLinkAttributes {
  amount: number;
  archived: boolean;
  currency: string;
  description: string;
  livemode: boolean;
  fee: number;
  remarks?: string;
  status: string;
  tax_amount?: any;
  taxes: any[];
  checkout_url: string;
  reference_number: string;
  created_at: number;
  updated_at: number;
  payments: any[];
}

export interface PaymentLinkData {
  id: string;
  type: string;
  attributes: PaymentLinkAttributes;
}

export interface PaymentLinkResponse {
  data: PaymentLinkData;
}
