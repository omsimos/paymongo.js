import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListTransactionProps, ListTransactionResponse } from "./types.js";

export const listTransactions = async (
  api: FetchClient,
  props: ListTransactionProps = {}
): Promise<ListTransactionResponse> => {
  const query: Record<string, unknown> = { limit: props.limit ?? 10 };
  if (props.cursor) query.cursor = props.cursor;
  if (props.type) query.type = props.type;
  if (props.created_at_start) query.created_at_start = props.created_at_start;
  if (props.created_at_end) query.created_at_end = props.created_at_end;

  return api<ListTransactionResponse>({
    method: "GET",
    path: "/transactions",
    query,
  });
};