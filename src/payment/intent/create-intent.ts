import type { FetchClient } from "../../utils/fetch-client.js";
import type { PaymentIntentResponse, CreatePaymentIntentProps } from "./types.js";

const defaultProps: CreatePaymentIntentProps = {
  amount: 0,
  paymentMethodAllowed: ["card", "paymaya"],
  paymentMethodOptions: {},
  currency: "PHP",
};

/**
 * @module createIntent
 * @property {number} amount - Amount to be collected by the PaymentIntent. A positive integer with minimum amount of 10000. 10000 is the smallest unit in cents. If you want to receive an amount of 100.00, the value that you should pass is 10000. If you want to receive an amount of 1500.50, the value that you should pass is 150050.
 * @property {PaymentType[]} paymentMethodAllowed - The list of payment method types that the PaymentIntent is allowed to use. Possible values: card, gcash, paymaya, grab_pay, qrph, dob, brankas, billease, shopee_pay.
 * @property {PaymentMethodOptions} paymentMethodOptions - Specific configurations for payment methods (e.g., card installments, 3DS).
 * @property {string} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
 * @property {string} description - Description of the payment intent. The value saved here will also be saved to the Payments resource that will be generated on attach PaymentMethod to PaymentIntent endpoint.
 * @property {string} statementDescriptor - You can use this value as the complete description that appears on your customers' statements. Your account's business name is the default value if not passed. The characters accepted are alphanumeric, , . - ) ( @ + &, and space.
 * @property {string} captureType - Specifies when the payment should be captured. Possible values: automatic, manual (for pre-authorization).
 * @property {SetupFutureUsage} setupFutureUsage - Configuration for card vaulting.
 * @property {SplitPayment} splitPayment - Configuration for splitting payments (PayMongo Seeds only).
 * @property {MetaData} metadata - A set of key-value pairs that you can attach to the resource. This can be useful for storing additional information about the object in a structured format. Only string values are accepted
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
  {
    amount = defaultProps.amount,
    currency = defaultProps.currency,
    paymentMethodAllowed = defaultProps.paymentMethodAllowed,
    paymentMethodOptions = defaultProps.paymentMethodOptions,
    description,
    statementDescriptor,
    captureType,
    setupFutureUsage,
    splitPayment,
    metadata,
  }: CreatePaymentIntentProps
): Promise<PaymentIntentResponse> => {
  const buildCardOptions = () => {
    const card = paymentMethodOptions?.card;
    if (!card) return undefined;
    return {
      request_three_d_secure: card.requestThreeDSecure,
      ...(card.installments && { installments: card.installments }),
    };
  };

  const cardOptions = buildCardOptions();
  const hasPaymentMethodOptions = cardOptions || Object.keys(paymentMethodOptions ?? {}).length > 0;

  const data: Record<string, unknown> = {
    attributes: {
      amount,
      payment_method_allowed: paymentMethodAllowed,
      ...(hasPaymentMethodOptions && { payment_method_options: { ...paymentMethodOptions, card: cardOptions } }),
      currency,
      ...(description && { description }),
      ...(statementDescriptor && { statement_descriptor: statementDescriptor }),
      ...(captureType && { capture_type: captureType }),
      ...(setupFutureUsage && { setup_future_usage: setupFutureUsage }),
      ...(splitPayment && { split_payment: splitPayment }),
      ...(metadata && { metadata }),
    },
  };

  return api<PaymentIntentResponse>({
    method: "POST",
    path: "/payment_intents",
    body: { data },
  });
};
