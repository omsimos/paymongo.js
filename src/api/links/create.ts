import { z } from "zod";

/* import { PaymentIntentOutput, } from "./types"; */
import { api } from "../base";
import { handleError } from "../../utils/handle-error";

export const linkCreateInputSchema = z.object({
  amount: z.number().min(0),
  description: z.string(),
  remarks: z.string().optional(),
});

export type LinkCreateInput = z.infer<typeof linkCreateInputSchema>;

/**
 * # Create a Link
 * @link https://developers.paymongo.com/reference/create-a-link
 *
 * @example
 * ```js
 *  const intent = await client.intent.create({
 *    amount: 10000,
 *    payment_method_allowed: ["card", "gcash"],
 *    currency: "PHP",
 *  });
 * ```
 */
export const createLink = async (input: LinkCreateInput) => {
  try {
    const parsedInput = linkCreateInputSchema.parse(input);
    const res = await api.post("/links", {
      data: { attributes: parsedInput },
    });
    return res.data;
    /* return paymentIntentOutputSchema.parse(res.data); */
  } catch (e) {
    return handleError(e);
  }
};
