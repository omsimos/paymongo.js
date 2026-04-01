import { createFetchClient, type FetchClient } from "./utils/fetch-client.js";
import { createIntent, retrieveIntent, attachIntent, captureIntent, cancelIntent } from "./payment/intent/index.js";
import { createMethod, retrieveMethod } from "./payment/method/index.js";
import {
  createWebhook,
  disableWebhook,
  enableWebhook,
  listWebhooks,
  retrieveWebhook,
  updateWebhook,
} from "./payment/webhook/index.js";
import { createSource, retrieveSource } from "./payment/source/index.js";
import {
  archiveLink,
  createLink,
  retrieveFromRefLink,
  retrieveLink,
  unarchiveLink,
} from "./payment/link/index.js";
import { createPayment, retrievePayment, listPayments } from "./payment/index.js";
import { createCheckout, retrieveCheckout } from "./payment/checkout/index.js";

export * from "./payment/types.js";

export interface PaymongoClient {
  intent: {
    attach: (props: Parameters<typeof attachIntent>[1]) => ReturnType<typeof attachIntent>;
    cancel: (intentId: string) => ReturnType<typeof cancelIntent>;
    capture: (intentId: string, props?: Parameters<typeof captureIntent>[2]) => ReturnType<typeof captureIntent>;
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
  checkout: {
    create: (props: Parameters<typeof createCheckout>[1]) => ReturnType<typeof createCheckout>;
    retrieve: (checkoutId: string) => ReturnType<typeof retrieveCheckout>;
  };
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

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
const PaymongoClient: ClientFunction = (secretKey: string) => {
  const api: FetchClient = createFetchClient(secretKey);

  return {
    intent: {
      attach: (props) => attachIntent(api, props),
      cancel: (intentId) => cancelIntent(api, intentId),
      capture: (intentId, props) => captureIntent(api, intentId, props),
      create: (props) => createIntent(api, props),
      retrieve: (props) => retrieveIntent(api, props),
    },
    method: {
      create: (props) => createMethod(api, props),
      retrieve: (methodId) => retrieveMethod(api, methodId),
    },
    webhook: {
      create: (props) => createWebhook(api, props),
      disable: (webhookId) => disableWebhook(api, webhookId),
      enable: (webhookId) => enableWebhook(api, webhookId),
      list: () => listWebhooks(api),
      retrieve: (webhookId) => retrieveWebhook(api, webhookId),
      update: (props) => updateWebhook(api, props),
    },
    source: {
      create: (props) => createSource(api, props),
      retrieve: (sourceId) => retrieveSource(api, sourceId),
    },
    link: {
      archive: (linkId) => archiveLink(api, linkId),
      create: (props) => createLink(api, props),
      retrieveFromRef: (refId) => retrieveFromRefLink(api, refId),
      retrieve: (linkId) => retrieveLink(api, linkId),
      unarchive: (linkId) => unarchiveLink(api, linkId),
    },
    payment: {
      create: (props) => createPayment(api, props),
      retrieve: (paymentId) => retrievePayment(api, paymentId),
      list: () => listPayments(api),
    },
    checkout: {
      create: (props) => createCheckout(api, props),
      retrieve: (checkoutId) => retrieveCheckout(api, checkoutId),
    },
  };
};

export default PaymongoClient;
