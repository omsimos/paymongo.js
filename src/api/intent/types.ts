import { z } from "zod";

export const paymentIntentOutputSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.string(),
    attributes: z.object({
      amount: z.number(),
      capture_type: z.string(),
      client_key: z.string(),
      currency: z.string(),
      description: z.string().nullable(),
      livemode: z.boolean(),
      statement_descriptor: z.string(),
      status: z.string(),
      last_payment_error: z.any().nullable(),
      payment_method_allowed: z.array(z.string()),
      payments: z.array(z.any()),
      next_action: z.any().nullable(),
      payment_method_options: z.object({
        card: z.object({
          request_three_d_secure: z.string(),
        }),
      }),
      metadata: z.any().nullable(),
      setup_future_usage: z.any().nullable(),
      created_at: z.number(),
      updated_at: z.number(),
    }),
  }),
});

export type PaymentIntentOutput = z.infer<typeof paymentIntentOutputSchema>;
