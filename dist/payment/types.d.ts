export * from "./intent/types";
export * from "./method/types";
export * from "./webhook/types";
export declare type MetaData = {
    [key: string]: string;
};
export declare type PaymentType = "card" | "paymaya" | string;
export declare type SourceType = "gcash" | "grab_pay" | string;
export declare type WebhookEvent = "source.chargeable" | "payment.paid" | "payment.failed";
