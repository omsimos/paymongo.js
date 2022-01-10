import { RetrievePaymentMethodProps, PaymentMethodResponse } from "./types";
/**
 * @module retrievePaymentMethod
 * @property {string} id - The id of the payment intent.
 * @returns {PaymentMethodResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.retrievePaymentMethod({
 *    id: "pm_key",
 *  });
 *  return data
 * }
 * ```
 */
export declare const retrievePaymentMethod: ({ id, }: RetrievePaymentMethodProps) => Promise<PaymentMethodResponse>;
