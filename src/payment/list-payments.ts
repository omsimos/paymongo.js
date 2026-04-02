import type { FetchClient } from "../utils/fetch-client.js";
import type { ListPaymentResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const payments = await client.payment.list();
 *  return payments;
 * }
 * ```
 */
export const listPayments = async (
  api: FetchClient
): Promise<ListPaymentResponse> => {
  return api<ListPaymentResponse>({
    method: "GET",
    path: "/payments",
  });
};
