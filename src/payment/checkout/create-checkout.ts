import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateCheckoutSessionProps, CheckoutSessionResponse } from "./types.js";

/**
 * @module createCheckout
 * @property {CheckoutLineItem[]} line_items - List of items to be purchased.
 * @property {PaymentType[]} payment_method_types - List of allowed payment methods (e.g., ["card", "gcash"]).
 * @property {string} success_url - The URL to redirect the user to after a successful payment.
 * @property {string} cancel_url - The URL to redirect the user to after a cancelled payment.
 * @property {string} description - Description of the checkout session.
 * @property {string} statement_descriptor - Text that appears on customer statements.
 * @property {MetaData} metadata - A set of key-value pairs for additional information.
 * @returns {CheckoutSessionResponse} - The checkout session data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.checkout.create({
 *    line_items: [{ name: "Test Item", amount: 10000, quantity: 1 }],
 *    payment_method_types: ["card"],
 *    success_url: "https://example.com/success",
 *  });
 *  return data
 * }
 * ```
 */
export const createCheckout = async (
  api: FetchClient,
  props: CreateCheckoutSessionProps
): Promise<CheckoutSessionResponse> => {
  return api<CheckoutSessionResponse>({
    method: "POST",
    path: "/checkout_sessions",
    body: { data: { attributes: props } },
  });
};