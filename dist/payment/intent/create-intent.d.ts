import { PaymentIntentResponse, CreatePaymentIntentProps } from "./types";
/**
 * @module createIntent
 * @property {number} amount - Amount to be collected by the PaymentIntent. A positive integer with minimum amount of 10000. 10000 is the smallest unit in cents. If you want to receive an amount of 100.00, the value that you should pass is 10000. If you want to receive an amount of 1500.50, the value that you should pass is 150050.
 * @property {PaymentType} paymentMethodAllowed - The list of payment method types that the PaymentIntent is allowed to use. Possible values are card and paymaya for now.
 * @property {string} request3DS - This is the only current option for card payment method. Depending on the value, this option decides whether the card must require 3DS authentication or adjust depending on the default 3D Secure configuration of the card. Possible values are either any or automatic. any requires 3D Secure authentication if supported while automatic uses the default 3D Secure configuration of the card.
 * @property {string} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
 * @property {string} description - Description of the payment intent. The value saved here will also be saved to the Payments resource that will be generated on attach PaymentMethod to PaymentIntent endpoint.
 * @property {string} statementDescriptor - You can use this value as the complete description that appears on your customers’ statements. Your account's business name is the default value if not passed. The characters accepted are alphanumeric, , . - ) ( @ + &, and space.
 * @property {MetaData} metadata - A set of key-value pairs that you can attach to the resource. This can be useful for storing additional information about the object in a structured format. Only string values are accepted
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.intent.create({
 *    amount: 10000,
 *    metadata: {
 *      order_id: "abc123",
 *    },
 *  });
 *  return data
 * }
 * ```
 */
export declare const createIntent: ({ amount, currency, paymentMethodAllowed, request3DS, description, statementDescriptor, metadata, }: CreatePaymentIntentProps) => Promise<PaymentIntentResponse>;
