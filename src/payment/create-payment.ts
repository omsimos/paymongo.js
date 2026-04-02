import type { FetchClient } from "../utils/fetch-client.js";
import type { PaymentProps, PaymentResponse, CurrencyType } from "./types.js";

const defaultProps = {
  amount: 0,
  currency: "PHP" as CurrencyType,
};

/**
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.payment.create({
 *    amount: 10000,
 *    currency: "PHP",
 *    source: {
 *      id: "src_utfBfBav5fzXuJiJMDs7J6ye",
 *      type: "source",
 *    },
 *    statement_descriptor: "Test Payment",
 *    description: "Test Payment"
 *  });
 *  return data
 * }
 * ```
 */
export const createPayment = async (
  api: FetchClient,
  {
    amount = defaultProps.amount,
    currency = defaultProps.currency,
    source,
    description,
    statement_descriptor,
  }: PaymentProps
): Promise<PaymentResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      amount,
      currency,
      source,
      ...(description && { description }),
      ...(statement_descriptor && { statement_descriptor }),
    },
  };

  return api<PaymentResponse>({
    method: "POST",
    path: "/payments",
    body: { data },
  });
};
