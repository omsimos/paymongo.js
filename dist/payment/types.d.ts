export { CreatePaymentIntentProps, RetrievePaymentIntentProps } from "./intent";
export interface PaymentIntentResponse {
    data: {
        id: string;
        type: string;
        attributes: {
            amount: number;
            currency: string;
            description?: any;
            statement_descriptor: string;
            status: string;
            livemode: boolean;
            client_key: string;
            created_at: number;
            updated_at: number;
            last_payment_error?: any;
            payment_method_allowed: string[];
            payments: any[];
            next_action?: any;
            payment_method_options: {
                card: {
                    request_three_d_secure: string;
                };
            };
            metadata?: {
                [key: string]: string;
            };
        };
    };
}
export interface CreateSourceResponse {
    data: {
        id: string;
        type: string;
        attributes: {
            amount: number;
            billing?: any;
            currency: CurrencyType;
            description?: any;
            livemode: boolean;
            redirect: RedirectType;
            statement_descriptor?: any;
            status: string;
            type: SourceType;
            created_at: number;
            updated_at: number;
        };
    };
}
export interface BillingProps {
    name?: string;
    phone?: string;
    email?: string;
    address?: AddressType;
}
export declare type AddressType = {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
};
export declare type PaymentType = "card" | "paymaya";
export declare type SourceType = "gcash" | "grab_pay";
export declare type RedirectType = {
    success: string;
    failed: string;
    checkout_url?: string;
};
export declare type CurrencyType = "PHP";
