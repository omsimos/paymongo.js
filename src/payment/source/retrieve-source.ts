import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentSourceResponse } from "./types.js";

/**
 * @module retrieveSource
 * @property {string} sourceId - The id of the payment source.
 * @returns {RetrieveSourceResponse} - The payment source data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  data = await client.source.retrieve("source_id");
 *  return data
 * }
 * ```
 */
export const retrieveSource = async (
  api: FetchClient,
  sourceId: string
): Promise<PaymentSourceResponse> => {
  return api<PaymentSourceResponse>({
    method: "GET",
    path: `/sources/${sourceId}`,
  });
};
