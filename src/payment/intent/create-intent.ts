import api from "../../utils/api-base";
import { PaymentIntentResponse, CreatePaymentIntentProps } from "./types";

const defaultProps: CreatePaymentIntentProps = {
  amount: 0,
  paymentMethodAllowed: ["card", "paymaya"],
  currency: "PHP",
  request3DS: "any",
};

/**
 * @module createPaymentIntent
 * @property {number} amount - amount of the payment intent in cents (PHP100 = 100000).
 * @property {PaymentType} paymentMethodAllowed - The payment method allowed.
 * @property {string} request3DS - any | automatic
 * @property {string} currency - The currency of the payment intent defaults to PHP.
 * @property {string} description - The description of the payment intent.
 * @property {string} statementDescriptor - The statement descriptor of the payment intent.
 * @property {object} metadata - The metadata of the payment intent.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.createPaymentIntent({
 *    amount: 10000,
 *    metadata: {
 *      order_id: "abc123",
 *    },
 *  });
 *  return data
 * }
 * ```
 */
export const createPaymentIntent = async ({
  amount = defaultProps.amount,
  currency = defaultProps.currency,
  paymentMethodAllowed = defaultProps.paymentMethodAllowed,
  request3DS = defaultProps.request3DS,
  description,
  statementDescriptor,
  metadata,
}: CreatePaymentIntentProps): Promise<PaymentIntentResponse> => {
  const data: any = {
    attributes: {
      amount,
      payment_method_allowed: paymentMethodAllowed,
      payment_method_options: {
        card: {
          request_three_d_secure: request3DS,
        },
      },
      currency,
    },
  };

  if (description) data.attributes.description = description;
  if (statementDescriptor)
    data.attributes.statement_descriptor = statementDescriptor;
  if (metadata) data.attributes.metadata = metadata;

  try {
    const res = await api.post<PaymentIntentResponse>("/payment_intents", {
      data,
    });
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
