import type { FetchClient } from "../../utils/fetch-client.js";
import type { CancelPaymentIntentResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.intent.cancel("pi_xxx");
 *  return data
 * }
 * ```
 */
export const cancelIntent = async (
  api: FetchClient,
  intent_id: string
): Promise<CancelPaymentIntentResponse> => {
  return api<CancelPaymentIntentResponse>({
    method: "POST",
    path: `/payment_intents/${intent_id}/cancel`,
  });
};