import { CreatePaymentMethodProps, PaymentMethodResponse } from "./types";
/**
 * @module createPaymentMethod
 * @property {Object} details - amount of the payment intent in cents (PHP100 = 100000).
 * @property {string} type - The currency of the payment intent defaults to PHP.
 * @property {Object} billing - The description of the payment intent.
 * @property {Object} metadata - The metadata of the payment intent.
 * @returns {PaymentMethodResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.createPaymentMethod({
 *    amount: 10000,
 *    metadata: {
 *      order_id: "abc123",
 *    },
 *  });
 *  return data
 * }
 * ```
 */
export declare const createPaymentMethod: ({ details, type, billing, metadata, }: CreatePaymentMethodProps) => Promise<PaymentMethodResponse>;
