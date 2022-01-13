import api from "../../utils/api-base";
import { CreateWebhookProps, PaymentWebhookResponse } from "./types";

/**
 * @module createWebhook
 * @property {string} url - The destination URL of the events that happened from your account. Please make sure that the URL is publicly accessible in order for you to receive the event.
 * @property {string[]} events - The list of events to be sent to this webhook. Possible values in the meantime are source.chargeable, payment.paid and payment.failed.
 * @returns {PaymentWebhookResponse} - The payment webhook data.  *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.create({
 *    events: ["payment.failed", "payment.paid", "source.chargeable"],
 *    url: "https://example.com/webhook",
 *  });
 *  return webhook;
 * }
 * ```
 */
export const createWebhook = async ({
  url,
  events,
}: CreateWebhookProps): Promise<PaymentWebhookResponse> => {
  const data: any = {
    attributes: {
      url,
      events,
    },
  };

  try {
    const response = await api.post<PaymentWebhookResponse>("/webhooks", {
      data,
    });
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
