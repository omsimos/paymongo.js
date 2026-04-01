import type { FetchClient } from "../../utils/fetch-client.js";
import type { RetrieveCheckoutSessionResponse } from "./types.js";

/**
 * @module retrieveCheckout
 * @property {string} checkout_id - The unique identifier of the Checkout Session (prefixed with cs_).
 * @returns {RetrieveCheckoutSessionResponse} - The checkout session data.
 *
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