import { attachIntent, createIntent, retrieveIntent } from "./payment/intent";
import { createMethod, retrieveMethod } from "./payment/method";
import { createWebhook, disableWebhook, enableWebhook, listWebhooks, retrieveWebhook, updateWebhook } from "./payment/webhook";
import { createSource, retrieveSource } from "./payment/source";
import { archiveLink, createLink, retrieveFromRefLink, retrieveLink, unarchiveLink } from "./payment/link";
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
        archive: typeof archiveLink;
        create: typeof createLink;
        retrieveFromRef: typeof retrieveFromRefLink;
        retrieve: typeof retrieveLink;
        unarchive: typeof unarchiveLink;
    };
    payment: {
        create: typeof createPayment;
        retrieve: typeof retrievePayment;
        list: typeof listPayments;
    };
}
export declare type ClientFunction = (secretKey: string) => PaymongoClient;
/**
 * @module PaymongoClient
 * @param secretKey - The secret key of your Paymongo account.
 * @returns {PaymongoClient} - The Paymongo client.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  return client;
 * }
 * ```
 * @returns
 */
declare const PaymongoClient: ClientFunction;
export default PaymongoClient;
