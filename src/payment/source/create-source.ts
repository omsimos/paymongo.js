import api from "../../utils/api-base";
import { CreateSourceResponse, CreateSourceProps } from "./types";

const WEB_URL = "http://localhost:3000";

const defaultProps: CreateSourceProps = {
  amount: 0,
  redirect: {
    success: `${WEB_URL}/payments/success`,
    failed: `${WEB_URL}/payments/error`,
  },
  type: "gcash",
  currency: "PHP",
};

/**
 * @module createSource
 * @property {number} amount - amount of the payment source in cents (PHP100 = 100000).
 * @property {RedirectType} redirect - redirect url for success and failed payment.
 * @property {SourceType} type - type of the payment source, it's either gcash | grab_pay.
 * @property {CurrencyType} currency - currency of the payment source, defaults to PHP.
 * @property {BillingProps} billing - billing information of the payment source.
 * @returns {CreateSourceResponse} - The response of the create source request.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.createSource({
 *    amount: 10000,
 *    redirect: {
 *      success: `http://localhost:3000/payments/success`,
 *      failed: `http://localhost:3000/payments/error`,
 *    },
 *    type: "gcash",
 *    currency: "PHP",
 *  });
 *
 *  return data
 * }
 * ```
 */
export const createSource = async ({
  amount = defaultProps.amount,
  redirect = defaultProps.redirect,
  type = defaultProps.type,
  currency = defaultProps.currency,
  billing,
}: CreateSourceProps): Promise<CreateSourceResponse> => {
  const data: any = {
    attributes: {
      amount,
      redirect,
      type,
      currency,
    },
  };

  if (billing) data.attributes.billing = billing;

  try {
    const response = await api.post<CreateSourceResponse>("/sources", data);
    return response.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
