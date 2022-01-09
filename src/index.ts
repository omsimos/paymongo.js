import { retrievePaymentIntent, createPaymentIntent } from "./payment/intent";
import { store } from "./store";

export * from "./payment/types";

export interface PaymongoClient {
  retrievePaymentIntent: typeof retrievePaymentIntent;
  createPaymentIntent: typeof createPaymentIntent;
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

const PaymongoClient: ClientFunction = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    retrievePaymentIntent,
    createPaymentIntent,
  };
};

export default PaymongoClient;
