import api from "../../utils/api-base";
import { PaymentLinkResponse } from "./types";

/**
 * @module unarchiveLink
 * @property {string} linkId - ID of the link to archive.
 * @returns {PaymentLinkResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.unarchive("link_id");
 *  return data
 * }
 * ```
 */
export const unarchiveLink = async (
  linkId: string
): Promise<PaymentLinkResponse> => {
  try {
    const res = await api.post(`/links/${linkId}/unarchive`);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
