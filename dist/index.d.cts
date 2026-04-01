//#region src/utils/fetch-client.d.ts
interface FetchClientOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  body?: unknown;
}
declare function createFetchClient(secretKey: string): <T>(options: FetchClientOptions) => Promise<T>;
type FetchClient = ReturnType<typeof createFetchClient>;
//#endregion
//#region src/payment/method/types.d.ts
interface PaymentMethodDetails {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}
interface PaymentMethodAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}
interface CreatePaymentMethodProps {
  details: PaymentMethodDetails;
  type: PaymentType;
  billing?: BillingType;
  metadata?: MetaData;
}
interface PaymentMethodDetailsResponse {
  exp_month: number;
  exp_year: number;
  last4: string;
}
interface PaymentMethodAttributesResponse {
  livemode: boolean;
  type: string;
  billing?: BillingType | null;
  created_at: number;
  updated_at: number;
  details: PaymentMethodDetailsResponse;
  metadata?: MetaData | null;
}
interface PaymentMethodDataResponse {
  id: string;
  type: string;
  attributes: PaymentMethodAttributesResponse;
}
interface PaymentMethodResponse {
  data: PaymentMethodDataResponse;
}
//#endregion
//#region src/payment/webhook/types.d.ts
interface CreateWebhookProps {
  url: string;
  events: WebhookEvent[];
}
interface UpdateWebhookProps extends Partial<CreateWebhookProps> {
  webhookId: string;
}
interface WebhookAttributes {
  livemode: boolean;
  secret_key: string;
  status: string;
  url: string;
  events: WebhookEvent[];
  created_at: number;
  updated_at: number;
}
interface WebhookData {
  id: string;
  type: string;
  attributes: WebhookAttributes;
}
interface PaymentWebhookResponse {
  data: WebhookData;
}
//#endregion
//#region src/payment/source/types.d.ts
interface CreateSourceProps {
  amount: number;
  redirect: RedirectType;
  type: SourceType;
  currency: CurrencyType;
  billing?: BillingType;
}
interface PaymentSourceResponse {
  data: {
    id: string;
    type: string;
    attributes: PaymentSourceAttributes;
  };
}
interface PaymentSourceAttributes {
  amount: number;
  billing?: BillingType;
  currency: CurrencyType;
  description?: string | null;
  livemode: boolean;
  redirect: RedirectType;
  statement_descriptor?: string | null;
  status: StatusType;
  type: SourceType;
  created_at: number;
  updated_at: number;
}
//#endregion
//#region src/payment/link/types.d.ts
interface CreatePaymentLinkProps {
  amount: number;
  description: string;
  remarks?: string;
}
interface PaymentLinkAttributes {
  amount: number;
  archived: boolean;
  currency: string;
  description: string;
  livemode: boolean;
  fee: number;
  remarks?: string;
  status: string;
  tax_amount?: number | null;
  taxes: unknown[];
  checkout_url: string;
  reference_number: string;
  created_at: number;
  updated_at: number;
  payments: unknown[];
}
interface PaymentLinkData {
  id: string;
  type: string;
  attributes: PaymentLinkAttributes;
}
interface PaymentLinkResponse {
  data: PaymentLinkData;
}
interface RetrieveFromRefResponse {
  has_more: boolean;
  data: PaymentLinkData[];
}
//#endregion
//#region src/payment/types.d.ts
interface PaymentProps {
  amount: number;
  source: {
    id: string;
    type: string;
  };
  currency?: CurrencyType;
  description?: string;
  statement_descriptor?: string;
}
interface PaymentResponse {
  data: PaymentData;
}
interface PaymentData {
  id: string;
  type: string;
  attributes: PaymentAttributes;
}
interface PaymentAttributes {
  access_url?: string | null;
  amount: number;
  balance_transaction_id: string;
  billing?: BillingType;
  currency: CurrencyType;
  description: string;
  disputed: boolean;
  external_reference_number?: string | null;
  fee: number;
  livemode: boolean;
  net_amount: number;
  origin: string;
  payment_intent_id?: string | null;
  payout?: string | null;
  source: PaymentSource;
  statement_descriptor: string;
  status: StatusType;
  tax_amount?: number | null;
  refunds: unknown[];
  taxes: unknown[];
  available_at: number;
  created_at: number;
  paid_at: number;
  updated_at: number;
}
interface PaymentSource {
  id: string;
  type: SourceType;
}
interface ListPaymentResponse {
  has_more: boolean;
  data: PaymentData[];
}
type MetaData = {
  [key: string]: string;
};
type PaymentType = "billease" | "card" | "dob" | "gcash" | "grab_pay" | "paymaya" | "brankas" | "qrph" | "shopee_pay" | (string & {});
type SourceType = "gcash" | "grab_pay" | (string & {});
type CurrencyType = "PHP";
type RedirectType = {
  success: string;
  failed: string;
  checkout_url?: string;
};
type StatusType = "pending" | "paid" | "failed" | "refunded" | (string & {});
type WebhookEvent = "checkout_session.payment.paid" | "source.chargeable" | "payment.paid" | "payment.failed" | "payment.refunded" | "payment.refund.updated" | "link.payment.paid" | "qrph.expired" | "subscription.past_due" | "subscription.unpaid" | "subscription.updated" | "subscription.invoice.created" | "subscription.invoice.finalized" | "subscription.invoice.paid" | "subscription.invoice.payment_failed" | (string & {});
/**
 * @property {string} name - Name of the billing information
 * @property {string} phone - Phone number of the billing information
 * @property {string} email - E-mail address of the billing information
 * @property {string} address - Address of the billing information
 */
type BillingType = {
  name?: string;
  phone?: string;
  email?: string;
  address?: AddressType;
};
type AddressType = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};
//#endregion
//#region src/payment/intent/types.d.ts
interface CreatePaymentIntentProps {
  amount: number;
  paymentMethodAllowed?: PaymentType[];
  request3DS?: "any" | "automatic";
  currency?: "PHP" | string;
  description?: string;
  statementDescriptor?: string;
  captureType?: "automatic" | "manual";
  metadata?: MetaData;
}
interface RetrievePaymentIntentProps {
  intentId: string;
  clientKey?: string;
}
interface AttachPaymentIntentProps {
  intentId: string;
  methodId: string;
  clientKey?: string;
  returnUrl?: string;
}
interface PaymentIntentNextAction {
  type: string;
  redirect: {
    url: string;
    return_url: string;
  };
}
interface PaymentIntentCardResponse {
  request_three_d_secure: string;
}
interface PaymentIntentPaymentMethodOptionsResponse {
  card: PaymentIntentCardResponse;
}
interface PaymentIntentAttributesResponse {
  amount: number;
  capture_type: string;
  currency: string;
  description?: string;
  statement_descriptor: string;
  status: string;
  livemode: boolean;
  client_key: string;
  created_at: number;
  updated_at: number;
  last_payment_error?: unknown;
  payment_method_allowed: PaymentType[];
  payments: unknown[];
  next_action?: PaymentIntentNextAction | null;
  payment_method_options?: PaymentIntentPaymentMethodOptionsResponse;
  metadata?: MetaData;
}
interface PaymentIntentData {
  id: string;
  type: string;
  attributes: PaymentIntentAttributesResponse;
}
interface PaymentIntentResponse {
  data: PaymentIntentData;
}
interface AttachSource {
  id: string;
  type: string;
  brand: string;
  country: string;
  last4: string;
}
interface AttachPaymentAttributes {
  access_url?: string;
  amount: number;
  balance_transaction_id: string;
  billing?: unknown;
  currency: string;
  description?: string;
  disputed: boolean;
  external_reference_number?: string | null;
  fee: number;
  foreign_fee: number;
  livemode: boolean;
  net_amount: number;
  origin: string;
  payment_intent_id: string;
  payout?: unknown;
  source: AttachSource;
  statement_descriptor: string;
  status: string;
  tax_amount?: number | null;
  refunds: unknown[];
  taxes: unknown[];
  available_at: number;
  created_at: number;
  paid_at: number;
  updated_at: number;
}
interface AttachPayment {
  id: string;
  type: string;
  attributes: AttachPaymentAttributes;
}
interface AttachCard {
  request_three_d_secure: string;
}
interface AttachPaymentMethodOptions {
  card: AttachCard;
}
interface AttachAttributes {
  amount: number;
  currency: string;
  description?: string;
  statement_descriptor: string;
  status: string;
  livemode: boolean;
  client_key: string;
  created_at: number;
  updated_at: number;
  last_payment_error?: unknown;
  payment_method_allowed: string[];
  payments: AttachPayment[];
  next_action?: PaymentIntentNextAction | null;
  payment_method_options: AttachPaymentMethodOptions;
  metadata?: MetaData;
}
interface AttachData {
  id: string;
  type: string;
  attributes: AttachAttributes;
}
interface AttachPaymentIntentResponse {
  data: AttachData;
}
//#endregion
//#region src/payment/intent/attach-intent.d.ts
/**
 * @module attachIntent
 * @property {string} intentId - Id of PaymentIntent.
 * @property {string} methodId - Id of PaymentMethod to attach to the PaymentIntent
 * @property {string} clientKey - Client key of the PaymentIntent if the key used is a public API key.
 * @property {string} returnUrl - An optional value for card payment method but required for paymaya. The URL to redirect your customer back to after they authenticate or cancel their payment. This parameter is only used for redirect-based payment methods.
 * @returns {AttachPaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.attach({
 *    intentId: intent.data.id,
 *    methodId: method.data.id,
 *  });
 *  return data
 * }
 * ```
 */
declare const attachIntent: (api: FetchClient, {
  intentId,
  methodId,
  clientKey,
  returnUrl
}: AttachPaymentIntentProps) => Promise<AttachPaymentIntentResponse>;
//#endregion
//#region src/payment/intent/create-intent.d.ts
/**
 * @module createIntent
 * @property {number} amount - Amount to be collected by the PaymentIntent. A positive integer with minimum amount of 10000. 10000 is the smallest unit in cents. If you want to receive an amount of 100.00, the value that you should pass is 10000. If you want to receive an amount of 1500.50, the value that you should pass is 150050.
 * @property {PaymentType} paymentMethodAllowed - The list of payment method types that the PaymentIntent is allowed to use. Possible values are card and paymaya for now.
 * @property {string} request3DS - This is the only current option for card payment method. Depending on the value, this option decides whether the card must require 3DS authentication or adjust depending on the default 3D Secure configuration of the card. Possible values are either any or automatic. any requires 3D Secure authentication if supported while automatic uses the default 3D Secure configuration of the card.
 * @property {string} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
 * @property {string} description - Description of the payment intent. The value saved here will also be saved to the Payments resource that will be generated on attach PaymentMethod to PaymentIntent endpoint.
 * @property {string} statementDescriptor - You can use this value as the complete description that appears on your customers' statements. Your account's business name is the default value if not passed. The characters accepted are alphanumeric, , . - ) ( @ + &, and space.
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
declare const createIntent: (api: FetchClient, {
  amount,
  currency,
  paymentMethodAllowed,
  request3DS,
  description,
  statementDescriptor,
  captureType,
  metadata
}: CreatePaymentIntentProps) => Promise<PaymentIntentResponse>;
//#endregion
//#region src/payment/intent/retrieve-intent.d.ts
/**
 * @module retrieveIntent
 * @property {string} id - Id of the PaymentIntent.
 * @property {string} clientKey - Client key of the PaymentIntent if the key used is a public key.
 * @returns {PaymentIntentResponse} - The payment intent data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.intent.retrieve({
 *    id: "pi_key",
 *  });
 *  return data
 * }
 * ```
 */
declare const retrieveIntent: (api: FetchClient, {
  intentId,
  clientKey
}: RetrievePaymentIntentProps) => Promise<PaymentIntentResponse>;
//#endregion
//#region src/payment/method/create-method.d.ts
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
declare const createMethod: (api: FetchClient, {
  details,
  type,
  billing,
  metadata
}: CreatePaymentMethodProps) => Promise<PaymentMethodResponse>;
//#endregion
//#region src/payment/method/retrieve-method.d.ts
/**
 * @module retrievePaymentMethod
 * @property {string} id - The id of the payment method.
 * @returns {PaymentMethodResponse} - The payment method data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.method.retrieve("pm_key");
 *  return data
 * }
 * ```
 */
declare const retrieveMethod: (api: FetchClient, methodId: string) => Promise<PaymentMethodResponse>;
//#endregion
//#region src/payment/webhook/create-webhook.d.ts
/**
 * @module createWebhook
 * @property {string} url - The destination URL of the events that happened from your account. Please make sure that the URL is publicly accessible in order for you to receive the event.
 * @property {string[]} events - The list of events to be sent to this webhook. Possible values in the meantime are source.chargeable, payment.paid and payment.failed.
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.create({
 *    events: ["payment.failed", "payment.paid", "source.chargeable"],
 *    url: "https://example.com/webhook",
 *  });
 *  return webhook;
 * }
 * ```
 */
declare const createWebhook: (api: FetchClient, {
  url,
  events
}: CreateWebhookProps) => Promise<PaymentWebhookResponse>;
//#endregion
//#region src/payment/webhook/disable-webhook.d.ts
/**
 * @module disableWebhook
 * @property {string} webhookId - The webhook id
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.disable("webhook_id");
 *  return webhook;
 * }
 * ```
 */
declare const disableWebhook: (api: FetchClient, webhookId: string) => Promise<PaymentWebhookResponse>;
//#endregion
//#region src/payment/webhook/enable-webhook.d.ts
/**
 * @module enableWebhook
 * @property {string} webhookId - The webhook id
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.enable("webhook_id");
 *  return webhook;
 * }
 * ```
 */
declare const enableWebhook: (api: FetchClient, webhookId: string) => Promise<PaymentWebhookResponse>;
//#endregion
//#region src/payment/webhook/list-webhooks.d.ts
/**
 * @module listWebhook
 * @returns {PaymentWebhookResponse[]} - The list of payment webhooks.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhooks = await client.webhook.list();
 *  return webhooks;
 * }
 * ```
 */
declare const listWebhooks: (api: FetchClient) => Promise<PaymentWebhookResponse[]>;
//#endregion
//#region src/payment/webhook/retrieve-webhook.d.ts
/**
 * @module retrieveWebhook
 * @property {string} webhookId - The webhook id
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.retrieve("webhook_id");
 *  return webhook;
 * }
 * ```
 */
declare const retrieveWebhook: (api: FetchClient, webhookId: string) => Promise<PaymentWebhookResponse>;
//#endregion
//#region src/payment/webhook/update-webhook.d.ts
/**
 * @module updateWebhook
 * @property {string} webhookId - The ID of the webhook to update.
 * @property {string} url - The webhook url
 * @property {string[]} events - The webhook events
 * @returns {PaymentWebhookResponse} - The payment webhook data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const webhook = await client.webhook.update({
 *    webhookId: "webhook_id",
 *    events: ["payment.failed", "payment.paid", "source.chargeable"],
 *    url: "https://example.com/webhook",
 *  });
 *  return webhook;
 * }
 * ```
 */
declare const updateWebhook: (api: FetchClient, {
  webhookId,
  url,
  events
}: UpdateWebhookProps) => Promise<PaymentWebhookResponse>;
//#endregion
//#region src/payment/source/create-source.d.ts
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
declare const createSource: (api: FetchClient, {
  amount,
  type,
  currency,
  redirect,
  billing
}: CreateSourceProps) => Promise<PaymentSourceResponse>;
//#endregion
//#region src/payment/source/retrieve-source.d.ts
/**
 * @module retrieveSource
 * @property {string} sourceId - The id of the payment source.
 * @returns {RetrieveSourceResponse} - The payment source data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  data = await client.source.retrieve("source_id");
 *  return data
 * }
 * ```
 */
declare const retrieveSource: (api: FetchClient, sourceId: string) => Promise<PaymentSourceResponse>;
//#endregion
//#region src/payment/link/archive-link.d.ts
/**
 * @module archiveLink
 * @property {string} linkId - ID of the link to archive.
 * @returns {PaymentLinkResponse} - The payment link data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.archive("link_id");
 *  return data
 * }
 * ```
 */
declare const archiveLink: (api: FetchClient, linkId: string) => Promise<PaymentLinkResponse>;
//#endregion
//#region src/payment/link/create-link.d.ts
/**
 * @module createLink
 * @property {number} amount - The expected amount that the link should receive. A positive integer with a minimum amount of 100. 100 is the smallest unit in cents. If you want the link to receive an amount of 1.00, the value that you should pass is 100. If you want the link to receive an amount of 1500.50, the value that you should pass is 150050.
 * @property {string} description - Describes the purpose of the link. The value is also displayed when you access the link from a browser.
 * @property {string} remarks - (optional) Additional information about the link but for internal use. The value is not displayed if a customer accessed the PayMongo link from the browser.
 * @returns {PaymentLinkResponse} - The payment link data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const data = await client.link.create({
 *    amount: 10000,
 *    description: "Payment for order 123",
 *  });
 *  return data
 * }
 * ```
 */
declare const createLink: (api: FetchClient, {
  amount,
  description,
  remarks
}: CreatePaymentLinkProps) => Promise<PaymentLinkResponse>;
//#endregion
//#region src/payment/link/retrieve-from-ref-link.d.ts
/**
 * @module retrieveFromRefLink
 * @property {string} refId - The unique identifier of the PayMongo link checkout URL.
 * @returns {RetrieveFromRefResponse} - The payment link data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.retrieveFromRef("ref_id");
 *  return data
 * }
 * ```
 */
declare const retrieveFromRefLink: (api: FetchClient, refId: string) => Promise<RetrieveFromRefResponse>;
//#endregion
//#region src/payment/link/retrieve-link.d.ts
/**
 * @module retrieveLink
 * @property {string} linkId - The id of the payment link.
 * @returns {PaymentLinkResponse} - The payment link data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.retrieve("link_id");
 *  return data
 * }
 * ```
 */
declare const retrieveLink: (api: FetchClient, linkId: string) => Promise<PaymentLinkResponse>;
//#endregion
//#region src/payment/link/unarchive-link.d.ts
/**
 * @module unarchiveLink
 * @property {string} linkId - ID of the link to unarchive.
 * @returns {PaymentLinkResponse} - The payment link data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  data = await client.link.unarchive("link_id");
 *  return data
 * }
 * ```
 */
declare const unarchiveLink: (api: FetchClient, linkId: string) => Promise<PaymentLinkResponse>;
//#endregion
//#region src/payment/create-payment.d.ts
/**
 * @module createPayment
 * @property {number} amount - Amount of the Payment. A positive integer with minimum amount of 10000. 10000 is the smallest unit in cents. If you want to receive an amount of 100.00, the value that you should pass is 10000. If you want to receive an amount of 1500.50, the value that you should pass is 150050. The amount is also considered as the gross amount.
 * @property {string} currency - Three-letter ISO currency code, in uppercase. PHP is the only supported currency as of the moment.
 * @property {string} description - The description of the payment.
 * @property {string} statement_descriptor - You can use this value as the complete description that appears on your customers' statements. Your account's business name is the default value if not passed. The characters accepted are alphanumeric, , . - ) ( @ + &, and space.
 * @property {object} source - The source of the payment.
 * @property {string} source.id - The id of the source.
 * @property {string} source.type - Type of a Source resource. Possible value is source
 * @returns {CreatePaymentResponse} - The payment data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  const data = await client.payment.create({
 *    amount: 10000,
 *    currency: "PHP",
 *    source: {
 *      id: "src_utfBfBav5fzXuJiJMDs7J6ye",
 *      type: "source",
 *    },
 *    statement_descriptor: "Test Payment",
 *    description: "Test Payment"
 *  });
 *  return data
 * }
 * ```
 */
declare const createPayment: (api: FetchClient, {
  amount,
  currency,
  source,
  description,
  statement_descriptor
}: PaymentProps) => Promise<PaymentResponse>;
//#endregion
//#region src/payment/retrieve-payment.d.ts
/**
 * @module retrievePayment
 * @property {string} paymentId - The id of the payment.
 * @returns {PaymentResponse} - The payment data.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("pk_test_key");
 *  data = await client.payment.retrieve("payment_id");
 *  return data
 * }
 * ```
 */
declare const retrievePayment: (api: FetchClient, paymentId: string) => Promise<PaymentResponse>;
//#endregion
//#region src/payment/list-payments.d.ts
/**
 * @module listPayments
 * @returns {ListPaymentResponse} - The list of payments.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  const payments = await client.payment.list();
 *  return payments;
 * }
 * ```
 */
declare const listPayments: (api: FetchClient) => Promise<ListPaymentResponse>;
//#endregion
//#region src/index.d.ts
interface PaymongoClient {
  intent: {
    attach: (props: Parameters<typeof attachIntent>[1]) => ReturnType<typeof attachIntent>;
    create: (props: Parameters<typeof createIntent>[1]) => ReturnType<typeof createIntent>;
    retrieve: (props: Parameters<typeof retrieveIntent>[1]) => ReturnType<typeof retrieveIntent>;
  };
  method: {
    create: (props: Parameters<typeof createMethod>[1]) => ReturnType<typeof createMethod>;
    retrieve: (methodId: string) => ReturnType<typeof retrieveMethod>;
  };
  webhook: {
    create: (props: Parameters<typeof createWebhook>[1]) => ReturnType<typeof createWebhook>;
    disable: (webhookId: string) => ReturnType<typeof disableWebhook>;
    enable: (webhookId: string) => ReturnType<typeof enableWebhook>;
    list: () => ReturnType<typeof listWebhooks>;
    retrieve: (webhookId: string) => ReturnType<typeof retrieveWebhook>;
    update: (props: Parameters<typeof updateWebhook>[1]) => ReturnType<typeof updateWebhook>;
  };
  source: {
    create: (props: Parameters<typeof createSource>[1]) => ReturnType<typeof createSource>;
    retrieve: (sourceId: string) => ReturnType<typeof retrieveSource>;
  };
  link: {
    archive: (linkId: string) => ReturnType<typeof archiveLink>;
    create: (props: Parameters<typeof createLink>[1]) => ReturnType<typeof createLink>;
    retrieveFromRef: (refId: string) => ReturnType<typeof retrieveFromRefLink>;
    retrieve: (linkId: string) => ReturnType<typeof retrieveLink>;
    unarchive: (linkId: string) => ReturnType<typeof unarchiveLink>;
  };
  payment: {
    create: (props: Parameters<typeof createPayment>[1]) => ReturnType<typeof createPayment>;
    retrieve: (paymentId: string) => ReturnType<typeof retrievePayment>;
    list: () => ReturnType<typeof listPayments>;
  };
}
type ClientFunction = (secretKey: string) => PaymongoClient;
/**
 * @module PaymongoClient
 * @param secretKey - The secret key of your Paymongo account.
 * @returns {PaymongoClient} - The Paymongo client.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  return client;
 * }
 * ```
 */
declare const PaymongoClient: ClientFunction;
//#endregion
export { AddressType, AttachAttributes, AttachCard, AttachData, AttachPayment, AttachPaymentAttributes, AttachPaymentIntentProps, AttachPaymentIntentResponse, AttachPaymentMethodOptions, AttachSource, BillingType, ClientFunction, CreatePaymentIntentProps, CreatePaymentLinkProps, CreatePaymentMethodProps, CreateSourceProps, CreateWebhookProps, CurrencyType, ListPaymentResponse, MetaData, PaymentAttributes, PaymentData, PaymentIntentAttributesResponse, PaymentIntentCardResponse, PaymentIntentData, PaymentIntentNextAction, PaymentIntentPaymentMethodOptionsResponse, PaymentIntentResponse, PaymentLinkAttributes, PaymentLinkData, PaymentLinkResponse, PaymentMethodAddress, PaymentMethodAttributesResponse, PaymentMethodDataResponse, PaymentMethodDetails, PaymentMethodDetailsResponse, PaymentMethodResponse, PaymentProps, PaymentResponse, PaymentSource, PaymentSourceAttributes, PaymentSourceResponse, PaymentType, PaymentWebhookResponse, PaymongoClient, PaymongoClient as default, RedirectType, RetrieveFromRefResponse, RetrievePaymentIntentProps, SourceType, StatusType, UpdateWebhookProps, WebhookAttributes, WebhookData, WebhookEvent };
//# sourceMappingURL=index.d.cts.map