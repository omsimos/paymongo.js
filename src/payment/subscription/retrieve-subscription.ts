import type { FetchClient } from "../../utils/fetch-client.js";
import type { SubscriptionResponse } from "./types.js";

export const retrieveSubscription = async (
  api: FetchClient,
  subscriptionId: string
): Promise<SubscriptionResponse> => {
  return api<SubscriptionResponse>({
    method: "GET",
    path: `/v1/subscriptions/${subscriptionId}`,
  });
};