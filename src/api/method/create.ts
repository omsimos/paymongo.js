import { z } from "zod";

import {
  PaymentMethodOutput,
  paymentMethodOutputSchema,
  billingSchema,
} from "./types";
import { api } from "../base";
import { methodTypeSchema } from "../types";
import { handleError } from "../../utils/handle-error";

export const paymentMethodCreateInputSchema = z.object({
  type: methodTypeSchema,
  details: z
    .object({
      card_number: z.string(),
      exp_month: z.number(),
      exp_year: z.number(),
      cvc: z.string(),
      bank_code: z.string(z.enum(["bpi", "ubp"])).optional(),
    })
    .optional(),
  billing: billingSchema.optional(),
  payment_method_options: z
    .object({
      card: z.object({
        installments: z.object({
          plan: z.object({
            issuer_id: z.string(),
            tenure: z.string(),
          }),
        }),
      }),
    })
    .optional(),
  metadata: z.any().optional(),
});

export type PaymentMethodCreateInput = z.infer<
  typeof paymentMethodCreateInputSchema
>;

export const createPaymentMethod = async (
  input: PaymentMethodCreateInput
): Promise<PaymentMethodOutput> => {
  try {
    const parsedInput = paymentMethodCreateInputSchema.parse(input);
    const res = await api.post<PaymentMethodOutput>("/payment_methods", {
      data: { attributes: parsedInput },
    });
    return paymentMethodOutputSchema.parse(res.data);
  } catch (e) {
    return handleError(e);
  }
};
