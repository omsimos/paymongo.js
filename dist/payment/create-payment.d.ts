import { CreatePaymentProps, CreatePaymentResponse } from "./types";
/**
 * @module createPayment
 * @property {number} amount - amount of the payment intent in cents (PHP100 = 100000).
 * @property {string} currency - currency of the payment source, defaults to PHP.
 * @property {string} description - The description of the payment.
 * @property {string} statement_descriptor - The statement descriptor of the payment.
 * @property {object} source - The source of the payment.
 * @returns {CreatePaymentResponse} - The payment data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.createPayment({
 *    amount: 10000,
 *    currency: "PHP",
 *    source: {
 *      id: "src_utfBfBav5fzXuJiJMDs7J6ye",
 *      type: "source",
 *   },
 *    statement_descriptor: "Test Payment",
            description: "Test Payment"
 *  });
 *  return data
 * }
 * ```
 */
export declare const createPayment: ({ amount, currency, description, statement_descriptor, source, }: CreatePaymentProps) => Promise<CreatePaymentResponse>;
