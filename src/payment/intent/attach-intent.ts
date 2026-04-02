import type { FetchClient } from "../../utils/fetch-client.js";
import type { AttachPaymentIntentProps, AttachPaymentIntentResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.attach({
 *    intent_id: intent.data.id,
 *    method_id: method.data.id,
 *  });
 *  return data
 * }
 * ```
 */
export const attachIntent = async (
  api: FetchClient,
  { intent_id, method_id, client_key, return_url }: AttachPaymentIntentProps
): Promise<AttachPaymentIntentResponse> => {
  return api<AttachPaymentIntentResponse>({
    method: "POST",
    path: `/payment_intents/${intent_id}/attach`,
    body: { data: { attributes: { payment_method: method_id, client_key, return_url } } },
  });
};
