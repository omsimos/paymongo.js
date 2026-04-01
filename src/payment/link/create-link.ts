import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentLinkResponse, CreatePaymentLinkProps } from "./types.js";

/**
 * @module createLink
 * @property {number} amount - The expected amount that the link should receive. A positive integer with a minimum amount of 100. 100 is the smallest unit in cents. If you want the link to receive an amount of 1.00, the value that you should pass is 100. If you want the link to receive an amount of 1500.50, the value that you should pass is 150050.
 * @property {string} description - Describes the purpose of the link. The value is also displayed when you access the link from a browser.
 * @property {string} remarks - (optional) Additional information about the link but for internal use. The value is not displayed if a customer accessed the PayMongo link from the browser.
 * @returns {PaymentLinkResponse} - The payment link data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.link.create({
 *    amount: 10000,
 *    description: "Payment for order 123",
 *  });
 *  return data
 * }
 * ```
 */
export const createLink = async (
  api: FetchClient,
  { amount, description, remarks }: CreatePaymentLinkProps
): Promise<PaymentLinkResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      amount,
      description,
      ...(remarks && { remarks }),
    },
  };

  return api<PaymentLinkResponse>({
    method: "POST",
    path: "/links",
    body: { data },
  });
};
