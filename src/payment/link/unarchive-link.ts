import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentLinkResponse } from "./types.js";

/**
 * @module unarchiveLink
 * @property {string} linkId - ID of the link to unarchive.
 * @returns {PaymentLinkResponse} - The payment link data.
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
  api: FetchClient,
  linkId: string
): Promise<PaymentLinkResponse> => {
  return api<PaymentLinkResponse>({
    method: "POST",
    path: `/links/${linkId}/unarchive`,
  });
};
