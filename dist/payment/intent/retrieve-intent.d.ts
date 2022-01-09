import { PaymentIntentResponse } from "../types";
export interface RetrievePaymentIntentProps {
    id: string;
    clientKey?: string;
}
/**
 * @module retrievePaymentIntent
 * @property {string} id - The id of the payment intent.
 * @property {string} clientKey - The client key of the payment intent.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.retrievePaymentIntent({
 *    id: "pi_key",
 *  });
 *  return data
 * }
 * ```
 */
export declare const retrievePaymentIntent: ({ id, clientKey, }: RetrievePaymentIntentProps) => Promise<PaymentIntentResponse>;
