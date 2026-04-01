import type { FetchClient } from "../../utils/fetch-client.js";
import type { CancelSubscriptionProps, SubscriptionResponse } from "./types.js";

export const cancelSubscription = async (
  api: FetchClient,
  subscriptionId: string,
  { cancellationReason }: CancelSubscriptionProps
): Promise<SubscriptionResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      cancellation_reason: cancellationReason,
    },
  };

  return api<SubscriptionResponse>({
    method: "POST",
    path: `/v1/subscriptions/${subscriptionId}/cancel`,
    body: { data },
  });
};