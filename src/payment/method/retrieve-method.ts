import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentMethodResponse } from "./types.js";

/**
 * @module retrievePaymentMethod
 * @property {string} id - The id of the payment method.
 * @returns {PaymentMethodResponse} - The payment method data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.method.retrieve("pm_key");
 *  return data
 * }
 * ```
 */
export const retrieveMethod = async (
  api: FetchClient,
  methodId: string
): Promise<PaymentMethodResponse> => {
  return api<PaymentMethodResponse>({
    method: "GET",
    path: `/payment_methods/${methodId}`,
  });
};
