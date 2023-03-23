import { z } from "zod";

import { PaymentMethodOutput, paymentMethodOutputSchema } from "./types";
import { api } from "../base";
import { handleError } from "../../utils/handle-error";

export const paymentMethodRetrieveInputSchema = z.object({
  methodId: z.string(),
});

export type PaymentMethodRetrieveInput = z.infer<
  typeof paymentMethodRetrieveInputSchema
>;

export const retrievePaymentMethod = async (
  input: PaymentMethodRetrieveInput
): Promise<PaymentMethodOutput> => {
  try {
    const parsedInput = paymentMethodRetrieveInputSchema.parse(input);
    const methodId = encodeURIComponent(parsedInput.methodId);
    const res = await api.get<PaymentMethodOutput>(
      `/payment_methods/${methodId}`
    );
    return paymentMethodOutputSchema.parse(res.data);
  } catch (e) {
    return handleError(e);
  }
};
