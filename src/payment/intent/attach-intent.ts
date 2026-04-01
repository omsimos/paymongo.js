import type { FetchClient } from "../../utils/fetch-client.js";
import type { AttachPaymentIntentProps, AttachPaymentIntentResponse } from "./types.js";

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
export const attachIntent = async (
  api: FetchClient,
  { intentId, methodId, clientKey, returnUrl }: AttachPaymentIntentProps
): Promise<AttachPaymentIntentResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      payment_method: methodId,
      ...(clientKey && { client_key: clientKey }),
      ...(returnUrl && { return_url: returnUrl }),
    },
  };

  return api<AttachPaymentIntentResponse>({
    method: "POST",
    path: `/payment_intents/${intentId}/attach`,
    body: { data },
  });
};
