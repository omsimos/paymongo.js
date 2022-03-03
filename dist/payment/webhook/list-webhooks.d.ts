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
export declare const listWebhooks: () => Promise<PaymentWebhookResponse[]>;
