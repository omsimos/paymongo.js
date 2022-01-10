import api from "../../utils/api-base";
import { PaymentWebhookResponse } from "./types";

export const listWebhooks = async (): Promise<PaymentWebhookResponse[]> => {
  try {
    const response = await api.post<PaymentWebhookResponse[]>("/webhooks");
    return response.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
