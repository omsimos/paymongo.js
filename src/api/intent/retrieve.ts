import { z } from "zod";

import { PaymentIntentOutput, paymentIntentOutputSchema } from "./types";
import { api } from "../base";
import { withError } from "../../hoc/with-error";

export const paymentIntentRetrieveInputSchema = z.object({
  intentId: z.string(),
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
 *    intentId: "pi_uP9jFcxB916dPGrhFURfbfVX",
 *  });
 *  return data;
 * }
 * ```
 */
export const retrievePaymentIntent = withError(
  async (input: PaymentIntentRetrieveInput): Promise<PaymentIntentOutput> => {
    const parsedInput = paymentIntentRetrieveInputSchema.parse(input);
    const intentId = encodeURIComponent(parsedInput.intentId);
    const res = await api.get<PaymentIntentOutput>(
      `/payment_intents/${intentId}`
    );
    return paymentIntentOutputSchema.parse(res.data);
  }
);
