import { WebhookEvent } from "../types";
export interface CreateWebhookProps {
    url: string;
    events: WebhookEvent[];
}
export interface UpdateWebhookProps extends Partial<CreateWebhookProps> {
    webhookId: string;
}
export interface WebhookAttributes {
    livemode: boolean;
    secret_key: string;
    status: string;
    url: string;
    events: WebhookEvent[];
    created_at: number;
    updated_at: number;
}
export interface WebhookData {
    id: string;
    type: string;
    attributes: WebhookAttributes;
}
export interface PaymentWebhookResponse {
    data: WebhookData;
}
