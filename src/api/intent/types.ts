import { z } from "zod";

export const paymentIntentOutputSchema = z.object({
  data: z.object({
    id: z.string(),
    type: z.enum(["payment_intent"]),
    attributes: z.object({
      amount: z.number().min(10000),
      currency: z.enum(["PHP"]),
      description: z.string().nullable(),
      statement_descriptor: z.string(),
      status: z.enum([
        "awaiting_payment_method",
        "awaiting_next_action",
        "processing",
        "succeeded",
      ]),
      livemode: z.boolean(),
      client_key: z.string(),
      capture_type: z.enum(["manual", "automatic"]),
      last_payment_error: z.object({}).nullable(),
      payment_method_allowed: z.array(z.string()),
      // TODO: Replace with paymentOutputSchema
      payments: z.array(z.any()),
      next_action: z
        .object({
          type: z.string(),
          redirect: z.object({
            url: z.string(),
            return_url: z.string(),
          }),
        })
        .nullable(),
      payment_method_options: z.object({
        card: z.object({
          request_three_d_secure: z.enum(["any", "automatic"]),
        }),
      }).nullable(),
      setup_future_usage: z
        .object({
          session_type: z.enum(["on_session"]),
          customer_id: z.string(),
        })
        .nullable(),
      metadata: z.any().nullable(),
      created_at: z.number(),
      updated_at: z.number(),
    }),
  }),
});

export type PaymentIntentOutput = z.infer<typeof paymentIntentOutputSchema>;
