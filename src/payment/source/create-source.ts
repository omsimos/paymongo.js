import type { FetchClient } from "../../utils/fetch-client.js";
import type { CurrencyType } from "../types.js";
import type { PaymentSourceResponse, CreateSourceProps } from "./types.js";

const defaultProps = {
  amount: 0,
  type: "gcash",
  currency: "PHP",
};

/**
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
