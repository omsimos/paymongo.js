import api from "../../utils/api-base";
import { UpdateWebhookProps, PaymentWebhookResponse } from "./types";

/**
 * @module updateWebhook
 * @property {string} webhookId - The ID of the webhook to update.
 * @property {string} url - The webhook url
 * @property {string[]} events - The webhook events ("source.chargeable" | "payment.paid" | "payment.failed")
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.createWebhook({
 *    events: ["payment.failed", "payment.paid", "source.chargeable"],
 *    url: "https://example.com/webhook",
 *  });
 *  return webhook;
 * }
 * ```
 */
export const updateWebhook = async ({
  webhookId,
  url,
  events,
}: UpdateWebhookProps): Promise<PaymentWebhookResponse> => {
  const data: any = {
    attributes: {
      url,
      events,
    },
  };

  try {
    const response = await api.put<PaymentWebhookResponse>(
      `/webhooks/${webhookId}`,
      { data }
    );
    return response.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
