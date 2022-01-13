export * from "./intent/types";
export * from "./method/types";
export * from "./webhook/types";
export * from "./source/types";
export * from "./link/types";
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
export declare type MetaData = {
    [key: string]: string;
};
export declare type PaymentType = "card" | "paymaya" | string;
export declare type SourceType = "gcash" | "grab_pay" | string;
export declare type CurrencyType = "PHP";
export declare type RedirectType = {
    success: string;
    failed: string;
    checkout_url?: string;
};
export declare type StatusType = "pending" | "paid" | string;
export declare type WebhookEvent = "source.chargeable" | "payment.paid" | "payment.failed";
export declare type BillingType = {
    name?: string;
    phone?: string;
    email?: string;
    address?: AddressType;
};
export declare type AddressType = {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
};
