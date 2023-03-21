import api from "../../utils/api-base";
import { PaymentIntentResponse, RetrievePaymentIntentProps } from "./types";

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
export const retrieveIntent = async ({
  intentId,
  clientKey,
}: RetrievePaymentIntentProps): Promise<PaymentIntentResponse> => {
  try {
    let url = `/payment_intents/${intentId}`;
    if (clientKey) url = `${url}?client_key=${clientKey}`;
    const res = await api.get<PaymentIntentResponse>(url);
    return res.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
