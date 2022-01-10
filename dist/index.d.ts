import { attachPaymentIntent, createPaymentIntent, retrievePaymentIntent } from "./payment/intent";
import { createPaymentMethod, retrievePaymentMethod } from "./payment/method";
export * from "./payment/types";
export interface PaymongoClient {
    attachPaymentIntent: typeof attachPaymentIntent;
    createPaymentIntent: typeof createPaymentIntent;
    retrievePaymentIntent: typeof retrievePaymentIntent;
    createPaymentMethod: typeof createPaymentMethod;
    retrievePaymentMethod: typeof retrievePaymentMethod;
}
export declare type ClientFunction = (secretKey: string) => PaymongoClient;
declare const PaymongoClient: ClientFunction;
export default PaymongoClient;
