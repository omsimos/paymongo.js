import { RetrievePaymentProps, PaymentResponse } from "./types";
/**
 * @module retrievePayment
 * @property {string} paymentId - The id of the payment.
 * @returns {PaymentResponse} - The payment data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  data = await client.retrievePayment({
 *    paymentId: "payment_id",
 *  });
 *  return data
 * }
 * ```
 */
export declare const retrievePayment: ({ paymentId, }: RetrievePaymentProps) => Promise<PaymentResponse>;
