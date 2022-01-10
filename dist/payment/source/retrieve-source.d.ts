import { RetrieveSourceProps, RetrieveSourceResponse } from "./types";
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
export declare const retrieveSource: ({ sourceId, }: RetrieveSourceProps) => Promise<RetrieveSourceResponse>;
