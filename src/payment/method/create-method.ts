import api from "../../utils/api-base";
import { CreatePaymentMethodProps, PaymentMethodResponse } from "./types";

/**
 * @module createPaymentMethod
 * @property {Object} details - The payment method details
 * @property {string} type - The type of payment method. The possible values are card and paymaya for now.
 * @property {Object} billing - The billing details
 * @property {Object} metadata - The metadata of the payment intent.
 * @returns {PaymentMethodResponse} - The payment method data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.createPaymentMethod({
 *    details: {
 *      cardNumber: "4343434343434345",
 *      expMonth: 3,
 *      expYear: 2023,
 *      cvc: "321",
 *    },
 *    type: "card",
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
}: CreatePaymentMethodProps): Promise<PaymentMethodResponse> => {
  const data: any = {
    attributes: {
      details: {
        card_number: details.cardNumber,
        exp_month: details.expMonth,
        exp_year: details.expYear,
        cvc: details.cvc,
      },
      type,
    },
  };

  if (billing) data.attributes.billing = billing;
  if (metadata) data.attributes.metadata = metadata;

  try {
    const res = await api.post<PaymentMethodResponse>("/payment_methods", {
      data,
    });
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
