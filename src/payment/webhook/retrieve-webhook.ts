import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentWebhookResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.retrieve("webhook_id");
 *  return webhook;
 * }
 * ```
 */
export const retrieveWebhook = async (
  api: FetchClient,
  webhookId: string
): Promise<PaymentWebhookResponse> => {
  return api<PaymentWebhookResponse>({
    method: "GET",
    path: `/webhooks/${webhookId}`,
  });
};
