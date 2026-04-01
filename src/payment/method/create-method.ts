import type { FetchClient } from "../../utils/fetch-client.js";
import type { CreatePaymentMethodProps, PaymentMethodResponse } from "./types.js";

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
export const createMethod = async (
  api: FetchClient,
  { details, type, billing, metadata }: CreatePaymentMethodProps
): Promise<PaymentMethodResponse> => {
  const mapDetails = (d: typeof details): Record<string, unknown> => {
    if ("cardNumber" in d) {
      return {
        card_number: d.cardNumber,
        exp_month: d.expMonth,
        exp_year: d.expYear,
        cvc: d.cvc,
      };
    }
    if ("phoneNumber" in d) {
      return { phone_number: d.phoneNumber };
    }
    if ("bankCode" in d) {
      return { bank_code: d.bankCode };
    }
    if ("details" in d) {
      return d.details ?? {};
    }
    return {};
  };

  const data: Record<string, unknown> = {
    attributes: {
      details: mapDetails(details),
      type,
      ...(billing && { billing }),
      ...(metadata && { metadata }),
    },
  };

  return api<PaymentMethodResponse>({
    method: "POST",
    path: "/payment_methods",
    body: { data },
  });
};
