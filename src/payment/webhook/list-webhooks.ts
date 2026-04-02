import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentWebhookResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhooks = await client.webhook.list();
 *  return webhooks;
 * }
 * ```
 */
export const listWebhooks = async (
  api: FetchClient
): Promise<PaymentWebhookResponse[]> => {
  return api<PaymentWebhookResponse[]>({
    method: "GET",
    path: "/webhooks",
  });
};
