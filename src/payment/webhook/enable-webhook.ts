import api from "../../utils/api-base";
import { PaymentWebhookResponse } from "./types";

/**
 * @module enableWebhook
 * @property {string} webhookId - The webhook id
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.enableWebhook("webhook_id");
 *  return webhook;
 * }
 * ```
 */
export const enableWebhook = async (
  webhookId: string
): Promise<PaymentWebhookResponse> => {
  try {
    const response = await api.post<PaymentWebhookResponse>(
      `/webhooks/${webhookId}/enable`
    );
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
