import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateCustomerProps, CustomerResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.customer.create({
 *    name: "John Doe",
 *    email: "john@example.com",
 *  });
 *  return data
 * }
 * ```
 */
export const createCustomer = async (
  api: FetchClient,
  props: CreateCustomerProps
): Promise<CustomerResponse> => {
  return api<CustomerResponse>({
    method: "POST",
    path: "/v2/customers",
    body: { data: props },
  });
};