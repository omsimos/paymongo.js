import api from "../../utils/api-base";
import { PaymentIntentResponse, RetrievePaymentIntentProps } from "./types";

/**
 * @module retrievePaymentIntent
 * @property {string} id - The id of the payment intent.
 * @property {string} clientKey - The client key of the payment intent.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.retrievePaymentIntent({
 *    id: "pi_key",
 *  });
 *  return data
 * }
 * ```
 */
export const retrievePaymentIntent = async ({
  id,
  clientKey,
}: RetrievePaymentIntentProps): Promise<PaymentIntentResponse> => {
  try {
    let url = `/payment_intents/${id}`;
    if (clientKey) url = `${url}?client_key=${clientKey}`;
    const res = await api.get<PaymentIntentResponse>(url);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
