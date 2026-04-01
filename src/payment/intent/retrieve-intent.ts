import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentIntentResponse, RetrievePaymentIntentProps } from "./types.js";

/**
 * @module retrieveIntent
 * @property {string} intent_id - Id of the PaymentIntent.
 * @property {string} client_key - Client key of the PaymentIntent if the key used is a public key.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.retrieve({
 *    intent_id: "pi_key",
 *  });
 *  return data
 * }
 * ```
 */
export const retrieveIntent = async (
  api: FetchClient,
  { intent_id, client_key }: RetrievePaymentIntentProps
): Promise<PaymentIntentResponse> => {
  let path = `/payment_intents/${intent_id}`;
  if (client_key) path = `${path}?client_key=${client_key}`;

  return api<PaymentIntentResponse>({ method: "GET", path });
};
