import { CreatePaymentMethodProps, PaymentMethodResponse } from "./types";
/**
 * @module createPaymentMethod
 * @property {Object} details - The payment method details
 * @property {string} type - The type of payment method. The possible values are card and paymaya for now.
 * @property {Object} billing - The billing details
 * @property {Object} metadata - The metadata of the payment intent.
 * @returns {PaymentMethodResponse} - The payment method data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.createPaymentMethod({
 *    details: {
 *      cardNumber: "4343434343434345",
 *      expMonth: 3,
 *      expYear: 2023,
 *      cvc: "321",
 *    },
 *    type: "card",
 *  });
 *  return data
 * }
 * ```
 */
export declare const createPaymentMethod: ({ details, type, billing, metadata, }: CreatePaymentMethodProps) => Promise<PaymentMethodResponse>;
