import api from "../../utils/api-base";
import { CreatePaymentMethodProps, PaymentMethodResponse } from "./types";

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
export const createPaymentMethod = async ({
  details,
  type,
  billing,
  metadata,
}: CreatePaymentMethodProps) => {
  const data: any = {
    attributes: {
      details,
      type,
    },
  };

  if (billing) data.attributes.billing = billing;
  if (metadata) data.attributes.metadata = metadata;

  try {
    const res = await api.post<PaymentMethodResponse>("/payment_methods", data);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
