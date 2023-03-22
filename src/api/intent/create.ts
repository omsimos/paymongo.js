import { z } from "zod";

import { PaymentIntentOutput, paymentIntentOutputSchema } from "./types";
import { api } from "../base";
import { withError } from "../../hoc/with-error";

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

/**
 * # Create a PaymentIntent
 * @link https://developers.paymongo.com/reference/create-a-paymentintent
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = createPaymongoClient("secret-key");
 *  const data = await client.intent.create({
 *    amount: 10000,
 *    payment_method_allowed: ["card", "gcash"],
 *    currency: "PHP",
 *  });
 *  return data;
 * }
 * ```
 */
export const createPaymentIntent = withError(
  async (input: PaymentIntentCreateInput): Promise<PaymentIntentOutput> => {
    const parsedInput = paymentIntentCreateInputSchema.parse(input);
    const res = await api.post<PaymentIntentOutput>("/payment_intents", {
      data: { attributes: parsedInput },
    });
    return paymentIntentOutputSchema.parse(res.data);
  }
);
