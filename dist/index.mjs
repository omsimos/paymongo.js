//#endregion
//#region src/utils/fetch-client.ts
const BASE_URL = { BASE_URL: "https://api.paymongo.com/v1" }.BASE_URL;
function createFetchClient(secretKey) {
	const auth = btoa(`${secretKey}:`);
	return async (options) => {
		const { method, path, body } = options;
		const res = await fetch(`${BASE_URL}${path}`, {
			method,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Basic ${auth}`
			},
			body: body ? JSON.stringify(body) : void 0
		});
		const data = await res.json();
		if (!res.ok) throw data;
		return data;
	};
}
//#endregion
//#region src/payment/intent/attach-intent.ts
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
const attachIntent = async (api, { intentId, methodId, clientKey, returnUrl }) => {
	const data = { attributes: {
		payment_method: methodId,
		...clientKey && { client_key: clientKey },
		...returnUrl && { return_url: returnUrl }
	} };
	return api({
		method: "POST",
		path: `/payment_intents/${intentId}/attach`,
		body: { data }
	});
};
//#endregion
//#region src/payment/intent/create-intent.ts
const defaultProps$2 = {
	amount: 0,
	paymentMethodAllowed: ["card", "paymaya"],
	currency: "PHP",
	request3DS: "any"
};
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
const createIntent = async (api, { amount = defaultProps$2.amount, currency = defaultProps$2.currency, paymentMethodAllowed = defaultProps$2.paymentMethodAllowed, request3DS = defaultProps$2.request3DS, description, statementDescriptor, captureType, metadata }) => {
	return api({
		method: "POST",
		path: "/payment_intents",
		body: { data: { attributes: {
			amount,
			payment_method_allowed: paymentMethodAllowed,
			payment_method_options: { card: { request_three_d_secure: request3DS } },
			currency,
			...description && { description },
			...statementDescriptor && { statement_descriptor: statementDescriptor },
			...captureType && { capture_type: captureType },
			...metadata && { metadata }
		} } }
	});
};
//#endregion
//#region src/payment/intent/retrieve-intent.ts
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
const retrieveIntent = async (api, { intentId, clientKey }) => {
	let path = `/payment_intents/${intentId}`;
	if (clientKey) path = `${path}?client_key=${clientKey}`;
	return api({
		method: "GET",
		path
	});
};
//#endregion
//#region src/payment/method/create-method.ts
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
const createMethod = async (api, { details, type, billing, metadata }) => {
	return api({
		method: "POST",
		path: "/payment_methods",
		body: { data: { attributes: {
			details: {
				card_number: details.cardNumber,
				exp_month: details.expMonth,
				exp_year: details.expYear,
				cvc: details.cvc
			},
			type,
			...billing && { billing },
			...metadata && { metadata }
		} } }
	});
};
//#endregion
//#region src/payment/method/retrieve-method.ts
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
const retrieveMethod = async (api, methodId) => {
	return api({
		method: "GET",
		path: `/payment_methods/${methodId}`
	});
};
//#endregion
//#region src/payment/webhook/create-webhook.ts
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
const createWebhook = async (api, { url, events }) => {
	return api({
		method: "POST",
		path: "/webhooks",
		body: { data: { attributes: {
			url,
			events
		} } }
	});
};
//#endregion
//#region src/payment/webhook/disable-webhook.ts
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
const disableWebhook = async (api, webhookId) => {
	return api({
		method: "POST",
		path: `/webhooks/${webhookId}/disable`
	});
};
//#endregion
//#region src/payment/webhook/enable-webhook.ts
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
const enableWebhook = async (api, webhookId) => {
	return api({
		method: "POST",
		path: `/webhooks/${webhookId}/enable`
	});
};
//#endregion
//#region src/payment/webhook/list-webhooks.ts
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
const listWebhooks = async (api) => {
	return api({
		method: "GET",
		path: "/webhooks"
	});
};
//#endregion
//#region src/payment/webhook/retrieve-webhook.ts
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
const retrieveWebhook = async (api, webhookId) => {
	return api({
		method: "GET",
		path: `/webhooks/${webhookId}`
	});
};
//#endregion
//#region src/payment/webhook/update-webhook.ts
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
const updateWebhook = async (api, { webhookId, url, events }) => {
	const data = { attributes: {
		...url && { url },
		...events && { events }
	} };
	return api({
		method: "PUT",
		path: `/webhooks/${webhookId}`,
		body: { data }
	});
};
//#endregion
//#region src/payment/source/create-source.ts
const defaultProps$1 = {
	amount: 0,
	type: "gcash",
	currency: "PHP"
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
const createSource = async (api, { amount = defaultProps$1.amount, type = defaultProps$1.type, currency = defaultProps$1.currency, redirect, billing }) => {
	return api({
		method: "POST",
		path: "/sources",
		body: { data: { attributes: {
			amount,
			redirect,
			type,
			currency,
			...billing && { billing }
		} } }
	});
};
//#endregion
//#region src/payment/source/retrieve-source.ts
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
const retrieveSource = async (api, sourceId) => {
	return api({
		method: "GET",
		path: `/sources/${sourceId}`
	});
};
//#endregion
//#region src/payment/link/archive-link.ts
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
const archiveLink = async (api, linkId) => {
	return api({
		method: "POST",
		path: `/links/${linkId}/archive`
	});
};
//#endregion
//#region src/payment/link/create-link.ts
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
const createLink = async (api, { amount, description, remarks }) => {
	return api({
		method: "POST",
		path: "/links",
		body: { data: { attributes: {
			amount,
			description,
			...remarks && { remarks }
		} } }
	});
};
//#endregion
//#region src/payment/link/retrieve-from-ref-link.ts
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
const retrieveFromRefLink = async (api, refId) => {
	return api({
		method: "GET",
		path: `/links?reference_number=${refId}`
	});
};
//#endregion
//#region src/payment/link/retrieve-link.ts
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
const retrieveLink = async (api, linkId) => {
	return api({
		method: "GET",
		path: `/links/${linkId}`
	});
};
//#endregion
//#region src/payment/link/unarchive-link.ts
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
const unarchiveLink = async (api, linkId) => {
	return api({
		method: "POST",
		path: `/links/${linkId}/unarchive`
	});
};
//#endregion
//#region src/payment/create-payment.ts
const defaultProps = {
	amount: 0,
	currency: "PHP"
};
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
const createPayment = async (api, { amount = defaultProps.amount, currency = defaultProps.currency, source, description, statement_descriptor }) => {
	return api({
		method: "POST",
		path: "/payments",
		body: { data: { attributes: {
			amount,
			currency,
			source,
			...description && { description },
			...statement_descriptor && { statement_descriptor }
		} } }
	});
};
//#endregion
//#region src/payment/retrieve-payment.ts
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
const retrievePayment = async (api, paymentId) => {
	return api({
		method: "GET",
		path: `/payments/${paymentId}`
	});
};
//#endregion
//#region src/payment/list-payments.ts
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
const listPayments = async (api) => {
	return api({
		method: "GET",
		path: "/payments"
	});
};
//#endregion
//#region src/index.ts
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
const PaymongoClient = (secretKey) => {
	const api = createFetchClient(secretKey);
	return {
		intent: {
			attach: (props) => attachIntent(api, props),
			create: (props) => createIntent(api, props),
			retrieve: (props) => retrieveIntent(api, props)
		},
		method: {
			create: (props) => createMethod(api, props),
			retrieve: (methodId) => retrieveMethod(api, methodId)
		},
		webhook: {
			create: (props) => createWebhook(api, props),
			disable: (webhookId) => disableWebhook(api, webhookId),
			enable: (webhookId) => enableWebhook(api, webhookId),
			list: () => listWebhooks(api),
			retrieve: (webhookId) => retrieveWebhook(api, webhookId),
			update: (props) => updateWebhook(api, props)
		},
		source: {
			create: (props) => createSource(api, props),
			retrieve: (sourceId) => retrieveSource(api, sourceId)
		},
		link: {
			archive: (linkId) => archiveLink(api, linkId),
			create: (props) => createLink(api, props),
			retrieveFromRef: (refId) => retrieveFromRefLink(api, refId),
			retrieve: (linkId) => retrieveLink(api, linkId),
			unarchive: (linkId) => unarchiveLink(api, linkId)
		},
		payment: {
			create: (props) => createPayment(api, props),
			retrieve: (paymentId) => retrievePayment(api, paymentId),
			list: () => listPayments(api)
		}
	};
};
//#endregion
export { PaymongoClient as default };

//# sourceMappingURL=index.mjs.map