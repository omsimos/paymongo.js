import {
  attachPaymentIntent,
  createPaymentIntent,
  retrievePaymentIntent,
} from "./payment/intent";
import { createPaymentMethod, retrievePaymentMethod } from "./payment/method";
import {
  createWebhook,
  disableWebhook,
  enableWebhook,
  listWebhooks,
  retrieveWebhook,
  updateWebhook,
} from "./payment/webhook";
import { createSource, retrieveSource } from "./payment/source";
import { createPayment, retrievePayment, listPayments } from "./payment";
import { store } from "./store";

export * from "./payment/types";

export interface PaymongoClient {
  // intent
  intent: {
    attach: typeof attachPaymentIntent;
    create: typeof createPaymentIntent;
    retrieve: typeof retrievePaymentIntent;
  };
  // method
  method: {
    create: typeof createPaymentMethod;
    retrieve: typeof retrievePaymentMethod;
  };
  // webhook
  webhook: {
    create: typeof createWebhook;
    disable: typeof disableWebhook;
    enable: typeof enableWebhook;
    list: typeof listWebhooks;
    retrieve: typeof retrieveWebhook;
    update: typeof updateWebhook;
  };
  // source
  source: {
    create: typeof createSource;
    retrieve: typeof retrieveSource;
  };
  // payment
  payment: {
    create: typeof createPayment;
    retrieve: typeof retrievePayment;
    list: typeof listPayments;
  };
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

const PaymongoClient: ClientFunction = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    intent: {
      attach: attachPaymentIntent,
      create: createPaymentIntent,
      retrieve: retrievePaymentIntent,
    },
    method: {
      create: createPaymentMethod,
      retrieve: retrievePaymentMethod,
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
    payment: {
      create: createPayment,
      retrieve: retrievePayment,
      list: listPayments,
    },
  };
};

export default PaymongoClient;
