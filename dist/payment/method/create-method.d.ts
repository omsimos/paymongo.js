import { CreatePaymentMethodProps, PaymentMethodResponse } from "./types";
/**
 * @module createPaymentMethod
 * @property {PaymentMethodDetails} details - The details of the payment method.
 * @property {string} type - The type of payment method. The possible values are card and paymaya for now.
 * @property {PaymentMethodBilling} billing - The billing details
 * @property {MetaData} metadata - A set of key-value pairs that you can attach to the resource. This can be useful for storing additional information about the object in a structured format. Only string values are accepted.
 * @returns {PaymentMethodResponse} - The payment method data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.method.create({
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
export declare const createMethod: ({ details, type, billing, metadata, }: CreatePaymentMethodProps) => Promise<PaymentMethodResponse>;
