import { AxiosError } from "axios";
import { ZodError, z } from "zod";

import { PaymentIntentOutput, paymentIntentOutputSchema } from "./types";
import { api } from "../base";

export const paymentIntentRetrieveInputSchema = z.object({
  paymentIntentId: z.string(),
});

export type PaymentIntentRetrieveInput = z.infer<
  typeof paymentIntentRetrieveInputSchema
>;

/**
 * # Retrieve a PaymentIntent
 * @link https://developers.paymongo.com/reference/retrieve-a-paymentintent
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = createPaymongoClient("secret-key");
 *  const data = await client.intent.retrieve({
 *    paymentIntentId: "pi_uP9jFcxB916dPGrhFURfbfVX",
 *  });
 *  return data;
 * }
 * ```
 */
export const retrievePaymentIntent = async (
  input: PaymentIntentRetrieveInput
): Promise<PaymentIntentOutput> => {
  try {
    const parsedInput = paymentIntentRetrieveInputSchema.parse(input);
    const intentId = encodeURIComponent(parsedInput.paymentIntentId);
    const res = await api.get<PaymentIntentOutput>(
      `/payment_intents/${intentId}`
    );
    return paymentIntentOutputSchema.parse(res.data);
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data);
    } else if (e instanceof ZodError) {
      throw new Error(e.message);
    }
    throw e;
  }
};
