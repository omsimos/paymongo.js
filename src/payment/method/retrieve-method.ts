import api from "../../utils/api-base";
import { PaymentMethodResponse } from "./types";

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
 *  data = await client.retrievePaymentMethod("pm_key");
 *  return data
 * }
 * ```
 */
export const retrievePaymentMethod = async (
  methodId: string
): Promise<PaymentMethodResponse> => {
  try {
    const res = await api.get<PaymentMethodResponse>(
      `/payment_methods/${methodId}`
    );
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
