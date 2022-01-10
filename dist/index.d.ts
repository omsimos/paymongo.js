import { retrievePaymentIntent, createPaymentIntent } from "./payment/intent";
import { retrievePaymentMethod, createPaymentMethod } from "./payment/method";
export * from "./payment/types";
export interface PaymongoClient {
    createPaymentIntent: typeof createPaymentIntent;
    retrievePaymentIntent: typeof retrievePaymentIntent;
    createPaymentMethod: typeof createPaymentMethod;
    retrievePaymentMethod: typeof retrievePaymentMethod;
}
export declare type ClientFunction = (secretKey: string) => PaymongoClient;
declare const PaymongoClient: ClientFunction;
export default PaymongoClient;
