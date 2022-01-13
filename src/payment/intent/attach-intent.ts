import api from "../../utils/api-base";
import { AttachPaymentIntentProps, AttachPaymentIntentResponse } from "./types";

/**
 * @module attachIntent
 * @property {string} intentId - Id of PaymentIntent.
 * @property {string} methodId - Id of PaymentMethod to attach to the PaymentIntent
 * @property {string} clientKey - Client key of the PaymentIntent if the key used is a public API key.
 * @property {string} returnUrl - An optional value for card payment method but required for paymaya. The URL to redirect your customer back to after they authenticate or cancel their payment. This parameter is only used for redirect-based payment methods.
 * @returns {AttachPaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.attach({
 *    intentId: intent.data.id,
 *    methodId: method.data.id,
 *  });
 *  return data
 * }
 * ```
 */
export const attachIntent = async ({
  intentId,
  methodId,
  clientKey,
  returnUrl,
}: AttachPaymentIntentProps): Promise<AttachPaymentIntentResponse> => {
  const data: any = {
    attributes: {
      payment_method: methodId,
    },
  };

  if (clientKey) data.attributes.client_key = clientKey;
  if (returnUrl) data.attributes.return_url = returnUrl;

  try {
    const res = await api.post<AttachPaymentIntentResponse>(
      `/payment_intents/${intentId}/attach`,
      { data }
    );
    return res.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
