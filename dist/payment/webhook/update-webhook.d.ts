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
 *  const webhook = await client.webhook.update({
 *    webhookId: "webhook_id",
 *    events: ["payment.failed", "payment.paid", "source.chargeable"],
 *    url: "https://example.com/webhook",
 *  });
 *  return webhook;
 * }
 * ```
 */
export declare const updateWebhook: ({ webhookId, url, events, }: UpdateWebhookProps) => Promise<PaymentWebhookResponse>;
