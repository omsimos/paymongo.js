import type { FetchClient } from "../utils/fetch-client.js";
import type { PaymentResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  data = await client.payment.retrieve("payment_id");
 *  return data
 * }
 * ```
 */
export const retrievePayment = async (
  api: FetchClient,
  paymentId: string
): Promise<PaymentResponse> => {
  return api<PaymentResponse>({
    method: "GET",
    path: `/payments/${paymentId}`,
  });
};
