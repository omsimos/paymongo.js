import type { FetchClient } from "../../utils/fetch-client.js";
import type { CustomerResponse } from "./types.js";

/**
 * @module deleteCustomer
 * @property {string} customer_id - The unique identifier of the customer to delete.
 * @returns {CustomerResponse} - The deleted customer data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.customer.delete("cus_123");
 *  return data
 * }
 * ```
 */
export const deleteCustomer = async (
  api: FetchClient,
  customer_id: string
): Promise<CustomerResponse> => {
  return api<CustomerResponse>({
    method: "DELETE",
    path: `/v2/customers/${customer_id}`,
  });
};