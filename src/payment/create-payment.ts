import api from "../utils/api-base";
import { PaymentProps, PaymentResponse } from "./types";

const defaultProps: PaymentProps = {
  amount: 0,
  currency: "PHP",
};

/**
 * @module createPayment
 * @property {number} amount - amount of the payment intent in cents (PHP100 = 100000).
 * @property {string} currency - currency of the payment source, defaults to PHP.
 * @property {string} description - The description of the payment.
 * @property {string} statement_descriptor - The statement descriptor of the payment.
 * @property {object} source - The source of the payment.
 * @returns {CreatePaymentResponse} - The payment data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.createPayment({
 *    amount: 10000,
 *    currency: "PHP",
 *    source: {
 *      id: "src_utfBfBav5fzXuJiJMDs7J6ye",
 *      type: "source",
 *   },
 *    statement_descriptor: "Test Payment",
			description: "Test Payment"
 *  });
 *  return data
 * }
 * ```
 */
export const createPayment = async ({
  amount = defaultProps.amount,
  currency = defaultProps.currency,
  description,
  statement_descriptor,
  source,
}: PaymentProps): Promise<PaymentResponse> => {
  const data: any = {
    attributes: {
      amount,
      currency,
      source,
    },
  };

  if (description) data.attributes.description = description;
  if (statement_descriptor)
    data.attributes.statement_descriptor = statement_descriptor;

  try {
    const res = await api.post<PaymentResponse>("/payments", { data });
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
