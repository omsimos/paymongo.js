import api from "../../utils/api-base";
import { PaymentWebhookResponse } from "./types";

/**
 * @module listWebhook
 * @returns {PaymentWebhookResponse[]} - The list of payment webhooks.
 *
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
export const listWebhooks = async (): Promise<PaymentWebhookResponse[]> => {
  try {
    const response = await api.get<PaymentWebhookResponse[]>("/webhooks");
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
