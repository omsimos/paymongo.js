import type { FetchClient } from "../../utils/fetch-client.js";
import type { ChangeSubscriptionPlanProps, SubscriptionResponse } from "./types.js";

export const changeSubscriptionPlan = async (
  api: FetchClient,
  subscriptionId: string,
  props: ChangeSubscriptionPlanProps
): Promise<SubscriptionResponse> => {
  return api<SubscriptionResponse>({
    method: "PUT",
    path: `/v1/subscriptions/${subscriptionId}/plan`,
    body: { data: { attributes: props } },
  });
};