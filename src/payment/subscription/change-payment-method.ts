import type { FetchClient } from "../../utils/fetch-client.js";
import type { ChangeSubscriptionPaymentMethodProps, SubscriptionResponse } from "./types.js";

export const changeSubscriptionPaymentMethod = async (
  api: FetchClient,
  subscriptionId: string,
  { paymentMethodId, redirectUrl }: ChangeSubscriptionPaymentMethodProps
): Promise<SubscriptionResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      payment_method_id: paymentMethodId,
      ...(redirectUrl && { redirect_url: redirectUrl }),
    },
  };

  return api<SubscriptionResponse>({
    method: "PUT",
    path: `/v1/subscriptions/${subscriptionId}/payment_method`,
    body: { data },
  });
};