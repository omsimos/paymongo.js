import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentLinkResponse } from "./types.js";

/**
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
  api: FetchClient,
  linkId: string
): Promise<PaymentLinkResponse> => {
  return api<PaymentLinkResponse>({
    method: "GET",
    path: `/links/${linkId}`,
  });
};
