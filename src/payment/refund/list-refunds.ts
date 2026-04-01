import type { FetchClient } from "../../utils/fetch-client.js";
import type { ListRefundProps, ListRefundResponse } from "./types.js";

export const listRefunds = async (
  api: FetchClient,
  { paymentId, limit = 10, after, before }: ListRefundProps = {}
): Promise<ListRefundResponse> => {
  const query: Record<string, unknown> = { limit };
  if (paymentId) query["data.attributes.payment_id"] = paymentId;
  if (after) query["data.attributes.after"] = after;
  if (before) query["data.attributes.before"] = before;

  return api<ListRefundResponse>({
    method: "GET",
    path: "/refunds",
    query,
  });
};