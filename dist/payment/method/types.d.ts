import { MetaData } from "../types";
export interface PMDetails {
    card_number: string;
    exp_month: number;
    exp_year: number;
    cvc: string;
}
export interface PMAddress {
    line1: string;
    line2: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
}
export interface PMBilling {
    address: PMAddress;
    name: string;
    email: string;
    phone: string;
}
/**
 * @see https://developers.paymongo.com/reference/create-a-paymentmethod
 */
export interface CreatePaymentMethodProps {
    details: PMDetails;
    type: string;
    billing?: PMBilling;
    metadata?: MetaData;
}
/**
 * @see https://developers.paymongo.com/reference/retrieve-a-paymentmethod
 */
export interface RetrievePaymentMethodProps {
    methodId: string;
}
export interface PMDetailsResponse {
    exp_month: number;
    exp_year: number;
    last4: string;
}
export interface PMAttributesResponse {
    livemode: boolean;
    type: string;
    billing?: any;
    created_at: number;
    updated_at: number;
    details: PMDetailsResponse;
    metadata?: any;
}
export interface PMDataResponse {
    id: string;
    type: string;
    attributes: PMAttributesResponse;
}
export interface PaymentMethodResponse {
    data: PMDataResponse;
}
