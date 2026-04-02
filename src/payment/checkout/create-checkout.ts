import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateCheckoutSessionProps, CheckoutSessionResponse } from "./types.js";

/**
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