import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateRefundProps, RefundResponse } from "./types.js";

export const createRefund = async (
  api: FetchClient,
  props: CreateRefundProps
): Promise<RefundResponse> => {
  return api<RefundResponse>({
    method: "POST",
    path: "/refunds",
    body: { data: { attributes: props } },
  });
};