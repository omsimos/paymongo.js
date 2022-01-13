import api from "../../utils/api-base";
import { CreatePaymentMethodProps, PaymentMethodResponse } from "./types";

/**
 * @module createPaymentMethod
 * @property {PaymentMethodDetails} details - The details of the payment method.
 * @property {string} type - The type of payment method. The possible values are card and paymaya for now.
 * @property {PaymentMethodBilling} billing - The billing details
 * @property {MetaData} metadata - A set of key-value pairs that you can attach to the resource. This can be useful for storing additional information about the object in a structured format. Only string values are accepted.
 * @returns {PaymentMethodResponse} - The payment method data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.method.create({
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
export const createMethod = async ({
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
    throw error.response.data;
  }
};
