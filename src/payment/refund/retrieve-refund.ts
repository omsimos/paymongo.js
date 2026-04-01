import type { FetchClient } from "../../utils/fetch-client.js";
import type { RefundResponse } from "./types.js";

export const retrieveRefund = async (
  api: FetchClient,
  refundId: string
): Promise<RefundResponse> => {
  return api<RefundResponse>({
    method: "GET",
    path: `/refunds/${refundId}`,
  });
};