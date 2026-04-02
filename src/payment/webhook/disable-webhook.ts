import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentWebhookResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.disable("webhook_id");
 *  return webhook;
 * }
 * ```
 */
export const disableWebhook = async (
  api: FetchClient,
  webhookId: string
): Promise<PaymentWebhookResponse> => {
  return api<PaymentWebhookResponse>({
    method: "POST",
    path: `/webhooks/${webhookId}/disable`,
  });
};
