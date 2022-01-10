import { attachPaymentIntent, createPaymentIntent, retrievePaymentIntent } from "./payment/intent";
import { createPaymentMethod, retrievePaymentMethod } from "./payment/method";
import { createWebhook, disableWebhook, enableWebhook, listWebhooks, retrieveWebhook, updateWebhook } from "./payment/webhook";
import { createSource, retrieveSource } from "./payment/source";
import { createPayment } from "./payment";
export * from "./payment/types";
export interface PaymongoClient {
    attachPaymentIntent: typeof attachPaymentIntent;
    createPaymentIntent: typeof createPaymentIntent;
    retrievePaymentIntent: typeof retrievePaymentIntent;
    createPaymentMethod: typeof createPaymentMethod;
    retrievePaymentMethod: typeof retrievePaymentMethod;
    createWebhook: typeof createWebhook;
    disableWebhook: typeof disableWebhook;
    enableWebhook: typeof enableWebhook;
    listWebhooks: typeof listWebhooks;
    retrieveWebhook: typeof retrieveWebhook;
    updateWebhook: typeof updateWebhook;
    createSource: typeof createSource;
    retrieveSource: typeof retrieveSource;
    createPayment: typeof createPayment;
}
export declare type ClientFunction = (secretKey: string) => PaymongoClient;
declare const PaymongoClient: ClientFunction;
export default PaymongoClient;
