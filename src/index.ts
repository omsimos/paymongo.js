import {
  attachPaymentIntent,
  createPaymentIntent,
  retrievePaymentIntent,
} from "./payment/intent";
import { createPaymentMethod, retrievePaymentMethod } from "./payment/method";
import { createWebhook } from "./payment/webhook";
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
  };
};

export default PaymongoClient;
