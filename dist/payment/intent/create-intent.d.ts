import { PaymentIntentResponse, CreatePaymentIntentProps } from "./types";
/**
 * @module createPaymentIntent
 * @property {number} amount - amount of the payment intent in cents (PHP100 = 100000).
 * @property {PaymentType} paymentMethodAllowed - The payment method allowed.
 * @property {string} request3DS - any | automatic
 * @property {string} currency - The currency of the payment intent defaults to PHP.
 * @property {string} description - The description of the payment intent.
 * @property {string} statementDescriptor - The statement descriptor of the payment intent.
 * @property {object} metadata - The metadata of the payment intent.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.createPaymentIntent({
 *    amount: 10000,
 *    metadata: {
 *      order_id: "abc123",
 *    },
 *  });
 *  return data
 * }
 * ```
 */
export declare const createPaymentIntent: ({ amount, currency, paymentMethodAllowed, request3DS, description, statementDescriptor, metadata, }: CreatePaymentIntentProps) => Promise<PaymentIntentResponse>;
