import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListCustomerProps, ListCustomerResponse } from "./types.js";

/**
 * @module listCustomers
 * @property {number} limit - The number of results to return per page. Default is 20.
 * @property {number} page - The page number of the results to retrieve. Default is 1.
 * @returns {ListCustomerResponse} - List of customers.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.customer.list({ limit: 10, page: 1 });
 *  return data
 * }
 * ```
 */
export const listCustomers = async (
  api: FetchClient,
  { limit = 20, page = 1 }: ListCustomerProps = {}
): Promise<ListCustomerResponse> => {
  return api<ListCustomerResponse>({
    method: "GET",
    path: "/v2/customers",
    query: { limit, page },
  });
};