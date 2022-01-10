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
    id: string;
    clientKey?: string;
}
export interface PICard {
    request_three_d_secure: string;
}
export interface PIPaymentMethodOptions {
    card: PICard;
}
export interface PIAttributes {
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
    payment_method_options?: PIPaymentMethodOptions;
    metadata?: MetaData;
}
export interface PIData {
    id: string;
    type: string;
    attributes: PIAttributes;
}
export interface PaymentIntentResponse {
    data: PIData;
}
