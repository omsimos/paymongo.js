import { PaymentIntentResponse, RetrievePaymentIntentProps } from "./types";
/**
 * @module retrieveIntent
 * @property {string} id - Id of the PaymentIntent.
 * @property {string} clientKey - Client key of the PaymentIntent if the key used is a public key.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.retrieve({
 *    id: "pi_key",
 *  });
 *  return data
 * }
 * ```
 */
export declare const retrieveIntent: ({ intentId, clientKey, }: RetrievePaymentIntentProps) => Promise<PaymentIntentResponse>;
