import { z } from "zod";

import { PaymentIntentOutput, paymentIntentOutputSchema } from "./types";
import { api } from "../base";
import { handleError } from "../../utils/handle-error";

export const paymentIntentAttachInputSchema = z.object({
  intentId: z.string(),
  methodId: z.string(),
  client_key: z.string().optional(),
  return_url: z.string().optional(),
});

export type PaymentIntentAttachInput = z.infer<
  typeof paymentIntentAttachInputSchema
>;

/**
 * # Attach to PaymentIntent
 * @link https://developers.paymongo.com/reference/attach-to-paymentintent
 *
 * @example
 * ```js
 * const intent = await client.intent.attach({
 *   intentId: "some_intent_id",
 *   methodId: "some_method_id"",
 *   return_url: "https://example.com/success",
 * });
 * ```
 */
export const attachToPaymentIntent = async (
  input: PaymentIntentAttachInput
): Promise<PaymentIntentOutput> => {
  try {
    const { intentId, ...rest } = paymentIntentAttachInputSchema.parse(input);
    const id = encodeURIComponent(intentId);
    const res = await api.post<PaymentIntentOutput>(
      `/payment_intents/${id}/attach`,
      { data: { attributes: { payment_method: rest.methodId, ...rest } } }
    );
    return paymentIntentOutputSchema.parse(res.data);
  } catch (e) {
    return handleError(e);
  }
};
