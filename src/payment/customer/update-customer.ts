import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdateCustomerProps, CustomerResponse } from "./types.js";

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.customer.update("cus_123", {
 *    name: "Updated Name",
 *  });
 *  return data
 * }
 * ```
 */
export const updateCustomer = async (
  api: FetchClient,
  customer_id: string,
  props: UpdateCustomerProps
): Promise<CustomerResponse> => {
  return api<CustomerResponse>({
    method: "PUT",
    path: `/v2/customers/${customer_id}`,
    body: { data: props },
  });
};