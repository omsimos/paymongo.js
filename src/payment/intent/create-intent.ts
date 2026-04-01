import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentIntentResponse, CreatePaymentIntentProps } from "./types.js";

/**
 * @module createIntent
 * @property {number} amount - Amount to be collected by the PaymentIntent. A positive integer with minimum amount of 2000.
 * @property {PaymentType[]} payment_method_allowed - The list of payment method types that the PaymentIntent is allowed to use. Possible values: card, gcash, paymaya, grab_pay, qrph, dob, brankas, billease, shopee_pay.
 * @property {PaymentMethodOptions} payment_method_options - Specific configurations for payment methods (e.g., card installments, 3DS).
 * @property {string} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency.
 * @property {string} description - Description of the payment intent. The value saved here will also be saved to the Payments resource that will be generated on attach PaymentMethod to PaymentIntent endpoint.
 * @property {string} statement_descriptor - You can use this value as the complete description that appears on your customers' statements. Your account's business name is the default value if not passed.
 * @property {string} capture_type - Specifies when the payment should be captured. Possible values: automatic, manual (for pre-authorization).
 * @property {SetupFutureUsage} setup_future_usage - Configuration for card vaulting.
 * @property {SplitPayment} split_payment - Configuration for splitting payments (PayMongo Seeds only).
 * @property {MetaData} metadata - A set of key-value pairs for additional information.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.intent.create({
 *    amount: 10000,
 *    metadata: {
 *      order_id: "abc123",
 *    },
 *  });
 *  return data
 * }
 * ```
 */
export const createIntent = async (
  api: FetchClient,
  props: CreatePaymentIntentProps
): Promise<PaymentIntentResponse> => {
  return api<PaymentIntentResponse>({
    method: "POST",
    path: "/payment_intents",
    body: { data: { attributes: props } },
  });
};
