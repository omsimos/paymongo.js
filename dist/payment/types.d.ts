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
export declare type PaymentType = "card" | "paymaya";
export declare type SourceType = "gcash" | "grab_pay";
