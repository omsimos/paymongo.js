import type { FetchClient } from "../../utils/fetch-client.js";
import type { AttachPaymentIntentProps, AttachPaymentIntentResponse } from "./types.js";

/**
 * @module attachIntent
 * @property {string} intent_id - Id of PaymentIntent.
 * @property {string} method_id - Id of PaymentMethod to attach to the PaymentIntent
 * @property {string} client_key - Client key of the PaymentIntent if the key used is a public API key.
 * @property {string} return_url - An optional value for card payment method but required for paymaya. The URL to redirect your customer back to after they authenticate or cancel their payment. This parameter is only used for redirect-based payment methods.
 * @returns {AttachPaymentIntentResponse} - The payment intent data.
 *
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
