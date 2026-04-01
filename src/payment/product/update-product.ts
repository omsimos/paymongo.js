import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdateProductProps, ProductResponse } from "./types.js";

export const updateProduct = async (
  api: FetchClient,
  productId: string,
  { name, description, price, currency, images, metadata }: UpdateProductProps
): Promise<ProductResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      ...(name && { name }),
      ...(description && { description }),
      ...(price !== undefined && { price }),
      ...(currency && { currency }),
      ...(images && { images }),
      ...(metadata && { metadata }),
    },
  };

  return api<ProductResponse>({
    method: "PUT",
    path: `/v1/products/${productId}`,
    body: { data },
  });
};