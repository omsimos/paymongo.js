import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreatePaymentMethodProps, PaymentMethodResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.method.create({
 *    details: {
 *      card_number: "4343434343434345",
 *      exp_month: 3,
 *      exp_year: 2023,
 *      cvc: "321",
 *    },
 *    type: "card",
 *  });
 *  return data
 * }
 * ```
 */
export const createMethod = async (
  api: FetchClient,
  props: CreatePaymentMethodProps
): Promise<PaymentMethodResponse> => {
  return api<PaymentMethodResponse>({
    method: "POST",
    path: "/payment_methods",
    body: { data: { attributes: props } },
  });
};