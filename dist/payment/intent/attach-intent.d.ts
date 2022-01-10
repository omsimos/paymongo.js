import { AttachPaymentIntentProps, AttachPaymentIntentResponse } from "./types";
/**
 * @module attachPaymentIntent
 * @property {string} intentId - The id of the payment intent.
 * @property {string} methodId - The is of the payment method.
 * @property {string} clientKey - The client key of the payment intent.
 * @property {string} returnUrl - The return url of the payment intent.
 * @returns {AttachPaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.attachPaymentIntent({
 *    intentId: intent.data.id,
 *    methodId: method.data.id,
 *  });
 *  return data
 * }
 * ```
 */
export declare const attachPaymentIntent: ({ intentId, methodId, clientKey, returnUrl, }: AttachPaymentIntentProps) => Promise<AttachPaymentIntentResponse>;
