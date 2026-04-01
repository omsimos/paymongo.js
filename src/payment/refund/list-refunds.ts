import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListRefundProps, ListRefundResponse } from "./types.js";

export const listRefunds = async (
  api: FetchClient,
  props: ListRefundProps = {}
): Promise<ListRefundResponse> => {
  const query: Record<string, unknown> = { limit: props.limit ?? 10 };
  if (props.payment_id) query["data.attributes.payment_id"] = props.payment_id;
  if (props.after) query["data.attributes.after"] = props.after;
  if (props.before) query["data.attributes.before"] = props.before;

  return api<ListRefundResponse>({
    method: "GET",
    path: "/refunds",
    query,
  });
};