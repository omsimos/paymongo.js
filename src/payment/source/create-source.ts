import type { FetchClient } from "../../utils/fetch-client.js";
import type { CurrencyType } from "../types.js";
import type { PaymentSourceResponse, CreateSourceProps } from "./types.js";

const defaultProps = {
  amount: 0,
  type: "gcash",
  currency: "PHP",
};

/**
 * @module createSource
 * @property {number} amount - Amount to be authorized by the source. A positive integer with minimum amount of 10000. 10000 is the smallest unit in cents. If you want to receive an amount of 100.00, the value that you should pass is 10000. If you want to receive an amount of 1500.50, the value that you should pass is 150050. Take note that whenever you create a payment from a chargeable source, the source amount should match the Payment that you will create.
 * @property {RedirectType} redirect - redirect url for success and failed payment.
 * @property {SourceType} type - The type of source. Possible values are gcash and grab_pay.
 * @property {CurrencyType} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
 * @property {BillingProps} billing - billing information of the payment source.
 * @returns {CreateSourceResponse} - The response of the create source request.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.source.create({
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
export const createSource = async (
  api: FetchClient,
  {
    amount = defaultProps.amount,
    type = defaultProps.type,
    currency = defaultProps.currency as CurrencyType,
    redirect,
    billing,
  }: CreateSourceProps
): Promise<PaymentSourceResponse> => {
  const data: Record<string, unknown> = {
    attributes: {
      amount,
      redirect,
      type,
      currency,
      ...(billing && { billing }),
    },
  };

  return api<PaymentSourceResponse>({
    method: "POST",
    path: "/sources",
    body: { data },
  });
};
