import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentIntentResponse, CreatePaymentIntentProps } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.intent.create({
 *    amount: 10000,
 *    metadata: {
 *      order_id: "abc123",
 *    },
 *  });
 *  return data
 * }
 * ```
 */
export const createIntent = async (
  api: FetchClient,
  props: CreatePaymentIntentProps
): Promise<PaymentIntentResponse> => {
  return api<PaymentIntentResponse>({
    method: "POST",
    path: "/payment_intents",
    body: { data: { attributes: props } },
  });
};
