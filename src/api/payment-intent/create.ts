import { AxiosError } from "axios";
import { api } from "../base";
import { ZodError, z } from "zod";

export const paymentIntentCreateInputSchema = z.object({
  amount: z.number().min(0),
  payment_method_allowed: z.array(
    z.enum(["atome", "card", "dob", "paymaya", "billease", "gcash", "grab_pay"])
  ),
  payment_method_options: z
    .object({
      card: z.object({
        request_three_d_secure: z.enum(["any", "automatic"]),
      }),
    })
    .optional(),
  description: z.string().optional(),
  statement_descriptor: z.string().optional(),
  currency: z.enum(["PHP"]),
  capture_type: z.enum(["manual", "automatic"]).optional(),
  setup_future_usage: z
    .object({
      session_type: z.enum(["on_session"]),
      customer_id: z.string(),
    })
    .optional(),
  metadata: z.any().optional(),
});

export type PaymentIntentCreateInput = z.infer<
  typeof paymentIntentCreateInputSchema
>;

export const paymentIntentCreateOutputSchema = z.object({
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

export type PaymentIntentCreateOutput = z.infer<
  typeof paymentIntentCreateOutputSchema
>;

/**
 * # paymentIntent.create
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = createPaymongoClient("secret-key");
 *  const data = await client.paymentIntent.create({
 *    amount: 10000,
 *    payment_method_allowed: ["card", "gcash"],
 *    currency: "PHP",
 *  });
 *  return data;
 * }
 * ```
 */
export const createPaymentIntent = async (
  input: PaymentIntentCreateInput
): Promise<PaymentIntentCreateOutput> => {
  try {
    const parsedInput = paymentIntentCreateInputSchema.parse(input);
    const res = await api.post<PaymentIntentCreateOutput>("/payment_intents", {
      data: { attributes: parsedInput },
    });
    return paymentIntentCreateOutputSchema.parse(res.data);
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data);
    } else if (e instanceof ZodError) {
      throw new Error(e.message);
    }
    throw e;
  }
};
