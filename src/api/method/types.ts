import { z } from "zod";
import { methodTypeSchema } from "../types";

export const billingSchema = z.object({
  address: z.object({
    city: z.string(),
    country: z.string(),
    line1: z.string(),
    line2: z.string(),
    postal_code: z.string(),
    state: z.string(),
  }),
  email: z.string(),
  name: z.string(),
  phone: z.string(),
});

export const paymentMethodOutputSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.enum(["payment_method"]),
    attributes: z.object({
      billing: billingSchema.nullable(),
      details: z
        .union([
          z.object({
            last4: z.string(),
            exp_month: z.number(),
            exp_year: z.number(),
          }),
          z.object({
            provider: z.string().optional(),
          }),
        ])
        .nullable(),
      livemode: z.boolean(),
      type: methodTypeSchema,
      metadata: z.any().nullable(),
      created_at: z.number(),
      updated_at: z.number(),
    }),
  }),
});

export type PaymentMethodOutput = z.infer<typeof paymentMethodOutputSchema>;
