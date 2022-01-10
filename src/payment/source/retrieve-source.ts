import api from "../../utils/api-base";
import { RetrieveSourceProps, PaymentSourceResponse } from "./types";

/**
 * @module retrieveSource
 * @property {string} sourceId - The id of the payment source.
 * @returns {RetrieveSourceResponse} - The payment source data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  data = await client.retrieveSource({
 *    sourceId: "source_id",
 *  });
 *  return data
 * }
 * ```
 */
export const retrieveSource = async ({
  sourceId,
}: RetrieveSourceProps): Promise<PaymentSourceResponse> => {
  try {
    const res = await api.get<PaymentSourceResponse>(`/sources/${sourceId}`);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
