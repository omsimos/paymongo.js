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

/**
 * # Retrieve a PaymentMethod
 * @link https://developers.paymongo.com/reference/retrieve-a-paymentmethod
 *
 * @example
 * ```js
 *  const method = await client.method.retrieve({
 *    methodId: "some_method_id",
 *  });
 * }
 * ```
 */
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
