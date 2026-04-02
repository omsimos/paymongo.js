import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentLinkResponse, CreatePaymentLinkProps } from "./types.js";

/**
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
