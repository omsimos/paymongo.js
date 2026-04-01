import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateProductProps, ProductResponse } from "./types.js";

export const createProduct = async (
  api: FetchClient,
  { name, description, price, currency, images, metadata }: CreateProductProps
): Promise<ProductResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      name,
      ...(description && { description }),
      ...(price && { price }),
      ...(currency && { currency }),
      ...(images && { images }),
      ...(metadata && { metadata }),
    },
  };

  return api<ProductResponse>({
    method: "POST",
    path: "/v1/products",
    body: { data },
  });
};