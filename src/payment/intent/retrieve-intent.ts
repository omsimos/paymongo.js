import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentIntentResponse, RetrievePaymentIntentProps } from "./types.js";

/**
 * @module retrieveIntent
 * @property {string} id - Id of the PaymentIntent.
 * @property {string} clientKey - Client key of the PaymentIntent if the key used is a public key.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.retrieve({
 *    id: "pi_key",
 *  });
 *  return data
 * }
 * ```
 */
export const retrieveIntent = async (
  api: FetchClient,
  { intentId, clientKey }: RetrievePaymentIntentProps
): Promise<PaymentIntentResponse> => {
  let path = `/payment_intents/${intentId}`;
  if (clientKey) path = `${path}?client_key=${clientKey}`;

  return api<PaymentIntentResponse>({ method: "GET", path });
};
