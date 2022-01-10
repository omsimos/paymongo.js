import { WebhookEvent } from "../types";

export interface CreateWebhookProps {
  url: string;
  events: WebhookEvent[];
}

export interface UpdateWebhookProps extends Partial<CreateWebhookProps> {
  webhookId: string;
}

export interface WHAttributes {
  livemode: boolean;
  secret_key: string;
  status: string;
  url: string;
  events: WebhookEvent[];
  created_at: number;
  updated_at: number;
}

export interface WHData {
  id: string;
  type: string;
  attributes: WHAttributes;
}

export interface PaymentWebhookResponse {
  data: WHData;
}
