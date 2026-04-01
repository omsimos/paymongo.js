import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdateWebhookProps, PaymentWebhookResponse } from "./types.js";

/**
 * @module updateWebhook
 * @property {string} webhookId - The ID of the webhook to update.
 * @property {string} url - The webhook url
 * @property {string[]} events - The webhook events
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.update({
 *    webhookId: "webhook_id",
 *    events: ["payment.failed", "payment.paid", "source.chargeable"],
 *    url: "https://example.com/webhook",
 *  });
 *  return webhook;
 * }
 * ```
 */
export const updateWebhook = async (
  api: FetchClient,
  { webhookId, url, events }: UpdateWebhookProps
): Promise<PaymentWebhookResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      ...(url && { url }),
      ...(events && { events }),
    },
  };

  return api<PaymentWebhookResponse>({
    method: "PUT",
    path: `/webhooks/${webhookId}`,
    body: { data },
  });
};
