import { z } from "zod";

import { PaymentIntentOutput, paymentIntentOutputSchema } from "./types";
import { api } from "../base";
import { handleError } from "../../utils/handle-error";

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
 *  const intent = await client.intent.retrieve({
 *    intentId: "some_intent_id",
 *  });
 * }
 * ```
 */
export const retrievePaymentIntent = async (
  input: PaymentIntentRetrieveInput
): Promise<PaymentIntentOutput> => {
  try {
    const parsedInput = paymentIntentRetrieveInputSchema.parse(input);
    const intentId = encodeURIComponent(parsedInput.intentId);
    const res = await api.get<PaymentIntentOutput>(
      `/payment_intents/${intentId}`
    );
    return paymentIntentOutputSchema.parse(res.data);
  } catch (e) {
    return handleError(e);
  }
};
