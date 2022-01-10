import api from "../../utils/api-base";
import { RetrievePaymentMethodProps, PaymentMethodResponse } from "./types";

export const retrievePaymentMethod = async ({
  id,
}: RetrievePaymentMethodProps) => {
  try {
    const res = await api.get<PaymentMethodResponse>(`/payment_methods/${id}`);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
