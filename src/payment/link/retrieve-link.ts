import api from "../../utils/api-base";
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
export const retrieveLink = async (
  linkId: string
): Promise<PaymentLinkResponse> => {
  try {
    const res = await api.get(`/links/${linkId}`);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
