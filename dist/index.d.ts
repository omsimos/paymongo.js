import { attachIntent, createIntent, retrieveIntent } from "./payment/intent";
import { createMethod, retrieveMethod } from "./payment/method";
import { createWebhook, disableWebhook, enableWebhook, listWebhooks, retrieveWebhook, updateWebhook } from "./payment/webhook";
import { createSource, retrieveSource } from "./payment/source";
import { createLink, retrieveLink } from "./payment/link";
import { createPayment, retrievePayment, listPayments } from "./payment";
export * from "./payment/types";
export interface PaymongoClient {
    intent: {
        attach: typeof attachIntent;
        create: typeof createIntent;
        retrieve: typeof retrieveIntent;
    };
    method: {
        create: typeof createMethod;
        retrieve: typeof retrieveMethod;
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
    link: {
        create: typeof createLink;
        retrieve: typeof retrieveLink;
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
