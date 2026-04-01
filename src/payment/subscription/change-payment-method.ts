import type { FetchClient } from "../../utils/fetch-client.js";
import type { ChangeSubscriptionPaymentMethodProps, SubscriptionResponse } from "./types.js";

export const changeSubscriptionPaymentMethod = async (
  api: FetchClient,
  subscriptionId: string,
  props: ChangeSubscriptionPaymentMethodProps
): Promise<SubscriptionResponse> => {
  return api<SubscriptionResponse>({
    method: "PUT",
    path: `/v1/subscriptions/${subscriptionId}/payment_method`,
    body: { data: { attributes: props } },
  });
};