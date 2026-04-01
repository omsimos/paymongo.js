import type { FetchClient } from "../../utils/fetch-client.js";
import type { ProductResponse } from "./types.js";

export const retrieveProduct = async (
  api: FetchClient,
  productId: string
): Promise<ProductResponse> => {
  return api<ProductResponse>({
    method: "GET",
    path: `/v1/products/${productId}`,
  });
};