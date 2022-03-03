import api from "../utils/api-base";
import { ListPaymentResponse } from "./types";

/**
 * @module listPayments
 * @returns {ListPaymentResponse} - The list of payment webhooks.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhooks = await client.payment.list();
 *  return webhooks;
 * }
 * ```
 */
export const listPayments = async (): Promise<ListPaymentResponse> => {
  try {
    const response = await api.get<ListPaymentResponse>("/payments");
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
