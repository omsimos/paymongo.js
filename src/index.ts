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
import { store } from "./store";

export * from "./payment/types";

export interface PaymongoClient {
  // intent
  attachPaymentIntent: typeof attachPaymentIntent;
  createPaymentIntent: typeof createPaymentIntent;
  retrievePaymentIntent: typeof retrievePaymentIntent;
  // method
  createPaymentMethod: typeof createPaymentMethod;
  retrievePaymentMethod: typeof retrievePaymentMethod;
  // webhook
  createWebhook: typeof createWebhook;
  disableWebhook: typeof disableWebhook;
  enableWebhook: typeof enableWebhook;
  listWebhooks: typeof listWebhooks;
  retrieveWebhook: typeof retrieveWebhook;
  updateWebhook: typeof updateWebhook;
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

const PaymongoClient: ClientFunction = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    attachPaymentIntent,
    createPaymentIntent,
    retrievePaymentIntent,
    createPaymentMethod,
    retrievePaymentMethod,
    createWebhook,
    disableWebhook,
    enableWebhook,
    listWebhooks,
    retrieveWebhook,
    updateWebhook,
    createSource,
    retrieveSource,
  };
};

export default PaymongoClient;
