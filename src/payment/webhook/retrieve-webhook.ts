import api from "../../utils/api-base";
import { PaymentWebhookResponse } from "./types";

/**
 * @module retrieveWebhook
 * @property {string} webhookId - The webhook id
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.retrieveWebhook("webhook_id");
 *  return webhook;
 * }
 * ```
 */
export const retrieveWebhook = async (
  webhookId: string
): Promise<PaymentWebhookResponse> => {
  try {
    const response = await api.get<PaymentWebhookResponse>(
      `/webhooks/${webhookId}`
    );
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
