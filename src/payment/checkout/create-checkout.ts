import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateCheckoutSessionProps, CheckoutSessionResponse } from "./types.js";

/**
 * @module createCheckout
 * @property {CheckoutLineItem[]} lineItems - List of items to be purchased.
 * @property {PaymentType[]} paymentMethodTypes - List of allowed payment methods (e.g., ["card", "gcash"]).
 * @property {string} successUrl - The URL to redirect the user to after a successful payment.
 * @property {string} cancelUrl - The URL to redirect the user to after a cancelled payment.
 * @property {string} description - Description of the checkout session.
 * @property {string} statementDescriptor - Text that appears on customer statements.
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
 *    lineItems: [{ name: "Test Item", amount: 10000, quantity: 1 }],
 *    paymentMethodTypes: ["card"],
 *    successUrl: "https://example.com/success",
 *  });
 *  return data
 * }
 * ```
 */
export const createCheckout = async (
  api: FetchClient,
  {
    lineItems,
    paymentMethodTypes,
    successUrl,
    cancelUrl,
    description,
    statementDescriptor,
    metadata,
  }: CreateCheckoutSessionProps
): Promise<CheckoutSessionResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      line_items: lineItems.map((item) => ({
        name: item.name,
        amount: item.amount,
        currency: item.currency || "PHP",
        quantity: item.quantity,
        ...(item.description && { description: item.description }),
        ...(item.imageUrl && { image_url: item.imageUrl }),
      })),
      payment_method_types: paymentMethodTypes,
      success_url: successUrl,
      ...(cancelUrl && { cancel_url: cancelUrl }),
      ...(description && { description }),
      ...(statementDescriptor && { statement_descriptor: statementDescriptor }),
      ...(metadata && { metadata }),
    },
  };

  return api<CheckoutSessionResponse>({
    method: "POST",
    path: "/checkout_sessions",
    body: { data },
  });
};