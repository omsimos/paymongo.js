import type { FetchClient } from "../../utils/fetch-client.js";
import type { CustomerResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.customer.retrieve("cus_123");
 *  return data
 * }
 * ```
 */
export const retrieveCustomer = async (
  api: FetchClient,
  customer_id: string
): Promise<CustomerResponse> => {
  return api<CustomerResponse>({
    method: "GET",
    path: `/v2/customers/${customer_id}`,
  });
};