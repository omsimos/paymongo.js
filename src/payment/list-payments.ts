import api from "../utils/api-base";
import { ListPaymentResponse } from "./types";

export const listPayments = async (): Promise<ListPaymentResponse> => {
  try {
    const response = await api.get<ListPaymentResponse>("/payments");
    return response.data;
  } catch (err) {
    const error: any = err;
    throw error.response.data;
  }
};
