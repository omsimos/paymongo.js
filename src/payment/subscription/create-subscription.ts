import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateSubscriptionProps, SubscriptionResponse } from "./types.js";

export const createSubscription = async (
  api: FetchClient,
  { customerId, planId }: CreateSubscriptionProps
): Promise<SubscriptionResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      customer_id: customerId,
      plan_id: planId,
    },
  };

  return api<SubscriptionResponse>({
    method: "POST",
    path: "/v1/subscriptions",
    body: { data },
  });
};