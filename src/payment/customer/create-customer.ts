import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateCustomerProps, CustomerResponse } from "./types.js";

/**
 * @module createCustomer
 * @property {string} name - The name of the customer.
 * @property {string} mobile_phone - The mobile phone number in E.164 format (must start with +).
 * @property {string} email - The email address of the customer.
 * @property {CustomerAddress} address - The address of the customer.
 * @property {CustomerShipping} shipping - The shipping information for the customer.
 * @property {MetaData} metadata - A set of key-value pairs for additional information.
 * @returns {CustomerResponse} - The customer data.
 *
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