import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateSubscriptionProps, SubscriptionResponse } from "./types.js";

export const createSubscription = async (
  api: FetchClient,
  props: CreateSubscriptionProps
): Promise<SubscriptionResponse> => {
  return api<SubscriptionResponse>({
    method: "POST",
    path: "/v1/subscriptions",
    body: { data: { attributes: props } },
  });
};