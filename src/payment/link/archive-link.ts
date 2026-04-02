import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentLinkResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.archive("link_id");
 *  return data
 * }
 * ```
 */
export const archiveLink = async (
  api: FetchClient,
  linkId: string
): Promise<PaymentLinkResponse> => {
  return api<PaymentLinkResponse>({
    method: "POST",
    path: `/links/${linkId}/archive`,
  });
};
