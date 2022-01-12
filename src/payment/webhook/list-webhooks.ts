import api from "../../utils/api-base";
import { PaymentWebhookResponse } from "./types";

export const listWebhooks = async (): Promise<PaymentWebhookResponse[]> => {
  try {
    const response = await api.get<PaymentWebhookResponse[]>("/webhooks");
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
