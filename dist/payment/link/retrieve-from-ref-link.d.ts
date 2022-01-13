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
export declare const retrieveFromRefLink: (refId: string) => Promise<RetrieveFromRefResponse>;
