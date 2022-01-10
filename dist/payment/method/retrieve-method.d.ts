import { RetrievePaymentMethodProps, PaymentMethodResponse } from "./types";
/**
 * @module retrievePaymentMethod
 * @property {string} id - The id of the payment method.
 * @returns {PaymentMethodResponse} - The payment method data.
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
export declare const retrievePaymentMethod: ({ methodId, }: RetrievePaymentMethodProps) => Promise<PaymentMethodResponse>;
