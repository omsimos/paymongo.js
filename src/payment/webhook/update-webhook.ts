import type { FetchClient } from "../../utils/fetch-client.js";
import type { UpdateWebhookProps, PaymentWebhookResponse } from "./types.js";

export const updateWebhook = async (
  api: FetchClient,
  { webhook_id, ...attributes }: UpdateWebhookProps
): Promise<PaymentWebhookResponse> => {
  return api<PaymentWebhookResponse>({
    method: "PUT",
    path: `/webhooks/${webhook_id}`,
    body: { data: { attributes } },
  });
};