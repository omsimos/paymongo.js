import { retrievePaymentIntent, createPaymentIntent } from "./payment/intent";
import { retrievePaymentMethod, createPaymentMethod } from "./payment/method";
import { store } from "./store";

export * from "./payment/types";

export interface PaymongoClient {
  // intent
  createPaymentIntent: typeof createPaymentIntent;
  retrievePaymentIntent: typeof retrievePaymentIntent;
  // method
  createPaymentMethod: typeof createPaymentMethod;
  retrievePaymentMethod: typeof retrievePaymentMethod;
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

const PaymongoClient: ClientFunction = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    createPaymentIntent,
    retrievePaymentIntent,
    createPaymentMethod,
    retrievePaymentMethod,
  };
};

export default PaymongoClient;
