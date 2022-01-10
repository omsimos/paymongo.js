import { MetaData, PaymentType } from "../types";
export interface CreatePaymentIntentProps {
    amount: number;
    paymentMethodAllowed?: PaymentType[];
    request3DS?: "any" | "automatic";
    currency?: "PHP" | string;
    description?: string;
    statementDescriptor?: string;
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
export interface PICardResponse {
    request_three_d_secure: string;
}
export interface PIPaymentMethodOptionsResponse {
    card: PICardResponse;
}
export interface PIAttributesResponse {
    amount: number;
    currency: string;
    description?: string;
    statement_descriptor: string;
    status: string;
    livemode: boolean;
    client_key: string;
    created_at: number;
    updated_at: number;
    last_payment_error?: any;
    payment_method_allowed: PaymentType[];
    payments: any[];
    next_action?: any;
    payment_method_options?: PIPaymentMethodOptionsResponse;
    metadata?: MetaData;
}
export interface PIData {
    id: string;
    type: string;
    attributes: PIAttributesResponse;
}
export interface PaymentIntentResponse {
    data: PIData;
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
    billing?: any;
    currency: string;
    description?: string;
    disputed: boolean;
    external_reference_number?: any;
    fee: number;
    foreign_fee: number;
    livemode: boolean;
    net_amount: number;
    origin: string;
    payment_intent_id: string;
    payout?: any;
    source: AttachSource;
    statement_descriptor: string;
    status: string;
    tax_amount?: any;
    refunds: any[];
    taxes: any[];
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
    last_payment_error?: any;
    payment_method_allowed: string[];
    payments: AttachPayment[];
    next_action?: any;
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
