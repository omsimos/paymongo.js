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
