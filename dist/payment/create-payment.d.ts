import { PaymentProps, PaymentResponse } from "./types";
/**
 * @module createPayment
 * @property {number} amount - Amount of the Payment. A positive integer with minimum amount of 10000. 10000 is the smallest unit in cents. If you want to receive an amount of 100.00, the value that you should pass is 10000. If you want to receive an amount of 1500.50, the value that you should pass is 150050. The amount is also considered as the gross amount.
 * @property {string} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
 * @property {string} description - The description of the payment.
 * @property {string} statement_descriptor - You can use this value as the complete description that appears on your customers’ statements. Your account's business name is the default value if not passed. The characters accepted are alphanumeric, , . - ) ( @ + &, and space.
 * @property {object} source - The source of the payment.
 * @property {string} source.id - The id of the source.
 * @property {string} source.type - Type of a Source resource. Possible value is source
 * @returns {CreatePaymentResponse} - The payment data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.payment.create({
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
export declare const createPayment: ({ amount, currency, source, description, statement_descriptor, }: PaymentProps) => Promise<PaymentResponse>;
