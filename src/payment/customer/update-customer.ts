import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdateCustomerProps, CustomerResponse } from "./types.js";

/**
 * @module updateCustomer
 * @property {string} customerId - The unique identifier of the customer.
 * @property {UpdateCustomerProps} props - The fields to update.
 * @returns {CustomerResponse} - The updated customer data.
 *
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
  customerId: string,
  { name, mobilePhone, email, address, shipping, metadata }: UpdateCustomerProps
): Promise<CustomerResponse> => {
  const data: Record<string, unknown> = {
    ...(name && { name }),
    ...(mobilePhone && { mobile_phone: mobilePhone }),
    ...(email && { email }),
    ...(address && { address }),
    ...(shipping && { shipping }),
    ...(metadata && { metadata }),
  };

  return api<CustomerResponse>({
    method: "PUT",
    path: `/v2/customers/${customerId}`,
    body: { data },
  });
};