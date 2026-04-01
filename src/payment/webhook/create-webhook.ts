import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreateWebhookProps, PaymentWebhookResponse } from "./types.js";

export const createWebhook = async (
  api: FetchClient,
  props: CreateWebhookProps
): Promise<PaymentWebhookResponse> => {
  return api<PaymentWebhookResponse>({
    method: "POST",
    path: "/webhooks",
    body: { data: { attributes: props } },
  });
};