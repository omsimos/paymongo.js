import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListTransactionProps, ListTransactionResponse } from "./types.js";

export const listTransactions = async (
  api: FetchClient,
  { limit = 10, cursor, type, createdAtStart, createdAtEnd }: ListTransactionProps = {}
): Promise<ListTransactionResponse> => {
  const query: Record<string, unknown> = { limit };
  if (cursor) query.cursor = cursor;
  if (type) query.type = type;
  if (createdAtStart) query.created_at_start = createdAtStart;
  if (createdAtEnd) query.created_at_end = createdAtEnd;

  return api<ListTransactionResponse>({
    method: "GET",
    path: "/transactions",
    query,
  });
};