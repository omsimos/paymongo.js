import { retrievePaymentIntent, createPaymentIntent } from "./payment/intent";
export * from "./payment/types";
export interface PaymongoClient {
    retrievePaymentIntent: typeof retrievePaymentIntent;
    createPaymentIntent: typeof createPaymentIntent;
}
export declare type ClientFunction = (secretKey: string) => PaymongoClient;
declare const PaymongoClient: ClientFunction;
export default PaymongoClient;
