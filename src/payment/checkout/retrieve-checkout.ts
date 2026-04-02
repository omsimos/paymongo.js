import type { FetchClient } from "../../utils/fetch-client.js";
import type { RetrieveCheckoutSessionResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.checkout.retrieve("cs_test_123");
 *  return data
 * }
 * ```
 */
export const retrieveCheckout = async (
  api: FetchClient,
  checkout_id: string
): Promise<RetrieveCheckoutSessionResponse> => {
  return api<RetrieveCheckoutSessionResponse>({
    method: "GET",
    path: `/checkout_sessions/${checkout_id}`,
  });
};