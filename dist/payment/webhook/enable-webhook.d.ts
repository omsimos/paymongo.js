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
 *  const webhook = await client.webhook.enable("webhook_id");
 *  return webhook;
 * }
 * ```
 */
export declare const enableWebhook: (webhookId: string) => Promise<PaymentWebhookResponse>;
