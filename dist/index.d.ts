import { attachPaymentIntent, createPaymentIntent, retrievePaymentIntent } from "./payment/intent";
import { createPaymentMethod, retrievePaymentMethod } from "./payment/method";
import { createWebhook, disableWebhook, enableWebhook, listWebhooks, retrieveWebhook, updateWebhook } from "./payment/webhook";
import { createSource, retrieveSource } from "./payment/source";
import { createPayment, retrievePayment, listPayments } from "./payment";
export * from "./payment/types";
export interface PaymongoClient {
    intent: {
        attach: typeof attachPaymentIntent;
        create: typeof createPaymentIntent;
        retrieve: typeof retrievePaymentIntent;
    };
    method: {
        create: typeof createPaymentMethod;
        retrieve: typeof retrievePaymentMethod;
    };
    webhook: {
        create: typeof createWebhook;
        disable: typeof disableWebhook;
        enable: typeof enableWebhook;
        list: typeof listWebhooks;
        retrieve: typeof retrieveWebhook;
        update: typeof updateWebhook;
    };
    source: {
        create: typeof createSource;
        retrieve: typeof retrieveSource;
    };
    payment: {
        create: typeof createPayment;
        retrieve: typeof retrievePayment;
        list: typeof listPayments;
    };
}
export declare type ClientFunction = (secretKey: string) => PaymongoClient;
declare const PaymongoClient: ClientFunction;
export default PaymongoClient;
