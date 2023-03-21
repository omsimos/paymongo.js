import api from "../../utils/api-base";
import { RetrieveFromRefResponse } from "./types";

/**
 * @module retrieveFromRefLink
 * @property {string} refId - The unique identifier of the PayMongo link checkout URL.
 * @returns {RetrieveFromRefResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.retrieveFromRef("ref_id");
 *  return data
 * }
 * ```
 */
export const retrieveFromRefLink = async (
  refId: string
): Promise<RetrieveFromRefResponse> => {
  try {
    const res = await api.get(`/links?reference_number=${refId}`);
    return res.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
