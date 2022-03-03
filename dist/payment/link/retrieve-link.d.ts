import { PaymentLinkResponse } from "./types";
/**
 * @module retrieveLink
 * @property {string} linkId - The id of the payment link.
 * @returns {PaymentLinkResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.retrieve("link_id");
 *  return data
 * }
 * ```
 */
export declare const retrieveLink: (linkId: string) => Promise<PaymentLinkResponse>;
