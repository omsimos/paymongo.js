import { ListPaymentResponse } from "./types";
/**
 * @module listPayments
 * @returns {ListPaymentResponse} - The list of payment webhooks.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhooks = await client.payment.list();
 *  return webhooks;
 * }
 * ```
 */
export declare const listPayments: () => Promise<ListPaymentResponse>;
