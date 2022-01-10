import { CreateWebhookProps, PaymentWebhookResponse } from "./types";
/**
 * @module createWebhook
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
export declare const createWebhook: ({ url, events, }: CreateWebhookProps) => Promise<PaymentWebhookResponse>;
