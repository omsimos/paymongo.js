import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateRefundProps, RefundResponse } from "./types.js";

export const createRefund = async (
  api: FetchClient,
  { paymentId, amount, reason, notes, metadata }: CreateRefundProps
): Promise<RefundResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      payment_id: paymentId,
      reason,
      ...(amount && { amount }),
      ...(notes && { notes }),
      ...(metadata && { metadata }),
    },
  };

  return api<RefundResponse>({
    method: "POST",
    path: "/refunds",
    body: { data },
  });
};