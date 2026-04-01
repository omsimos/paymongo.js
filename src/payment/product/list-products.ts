import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListProductProps, ListProductResponse } from "./types.js";

export const listProducts = async (
  api: FetchClient,
  { limit = 10, page = 1 }: ListProductProps = {}
): Promise<ListProductResponse> => {
  return api<ListProductResponse>({
    method: "GET",
    path: "/v1/products",
    query: { limit, page },
  });
};