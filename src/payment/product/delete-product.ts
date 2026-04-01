import type { FetchClient } from "../../utils/fetch-client.js";
import type { ProductResponse } from "./types.js";

export const deleteProduct = async (
  api: FetchClient,
  productId: string
): Promise<ProductResponse> => {
  return api<ProductResponse>({
    method: "DELETE",
    path: `/v1/products/${productId}`,
  });
};