import { attachIntent, createIntent, retrieveIntent } from "./payment/intent";
import { createMethod, retrieveMethod } from "./payment/method";
import {
  createWebhook,
  disableWebhook,
  enableWebhook,
  listWebhooks,
  retrieveWebhook,
  updateWebhook,
} from "./payment/webhook";
import { createSource, retrieveSource } from "./payment/source";
import {
  archiveLink,
  createLink,
  retrieveFromRefLink,
  retrieveLink,
  unarchiveLink,
} from "./payment/link";
import { createPayment, retrievePayment, listPayments } from "./payment";
import { store } from "./store";

export * from "./payment/types";

export interface PaymongoClient {
  intent: {
    attach: typeof attachIntent;
    create: typeof createIntent;
    retrieve: typeof retrieveIntent;
  };
  method: {
    create: typeof createMethod;
    retrieve: typeof retrieveMethod;
  };
  webhook: {
    create: typeof createWebhook;
    disable: typeof disableWebhook;
    enable: typeof enableWebhook;
    list: typeof listWebhooks;
    retrieve: typeof retrieveWebhook;
    update: typeof updateWebhook;
  };
  source: {
    create: typeof createSource;
    retrieve: typeof retrieveSource;
  };
  link: {
    archive: typeof archiveLink;
    create: typeof createLink;
    retrieveFromRef: typeof retrieveFromRefLink;
    retrieve: typeof retrieveLink;
    unarchive: typeof unarchiveLink;
  };
  payment: {
    create: typeof createPayment;
    retrieve: typeof retrievePayment;
    list: typeof listPayments;
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
 * @returns
 */
const PaymongoClient: ClientFunction = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    intent: {
      attach: attachIntent,
      create: createIntent,
      retrieve: retrieveIntent,
    },
    method: {
      create: createMethod,
      retrieve: retrieveMethod,
    },
    webhook: {
      create: createWebhook,
      disable: disableWebhook,
      enable: enableWebhook,
      list: listWebhooks,
      retrieve: retrieveWebhook,
      update: updateWebhook,
    },
    source: {
      create: createSource,
      retrieve: retrieveSource,
    },
    link: {
      archive: archiveLink,
      create: createLink,
      retrieveFromRef: retrieveFromRefLink,
      retrieve: retrieveLink,
      unarchive: unarchiveLink,
    },
    payment: {
      create: createPayment,
      retrieve: retrievePayment,
      list: listPayments,
    },
  };
};

export default PaymongoClient;
