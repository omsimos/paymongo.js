import type { FetchClient } from "../../utils/fetch-client.js";
import type { CapturePaymentIntentProps, CapturePaymentIntentResponse } from "./types.js";

/**
 * @module captureIntent
 * @property {string} intent_id - The unique identifier of the PaymentIntent to capture.
 * @property {number} amount - Amount to be collected. A positive integer (minimum 2000). Must be less than or equal to the authorized amount.
 * @returns {CapturePaymentIntentResponse} - Empty object on success.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.intent.capture("pi_xxx", { amount: 10000 });
 *  return data
 * }
 * ```
 */
export const captureIntent = async (
  api: FetchClient,
  intent_id: string,
  props?: CapturePaymentIntentProps
): Promise<CapturePaymentIntentResponse> => {
  return api<CapturePaymentIntentResponse>({
    method: "POST",
    path: `/payment_intents/${intent_id}/capture`,
    body: { data: { attributes: props ?? {} } },
  });
};