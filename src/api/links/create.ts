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
