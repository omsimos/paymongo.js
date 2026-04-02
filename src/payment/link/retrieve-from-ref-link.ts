import type { FetchClient } from "../../utils/fetch-client.js";
import type { RetrieveFromRefResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.retrieveFromRef("ref_id");
 *  return data
 * }
 * ```
 */
export const retrieveFromRefLink = async (
  api: FetchClient,
  refId: string
): Promise<RetrieveFromRefResponse> => {
  return api<RetrieveFromRefResponse>({
    method: "GET",
    path: `/links?reference_number=${refId}`,
  });
};
