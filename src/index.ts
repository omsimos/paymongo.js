import { retrievePaymentIntent } from "./payment/intent";
import { store } from "./store";

export * from "./payment";

export interface PaymongoClient {
  retrievePaymentIntent: typeof retrievePaymentIntent;
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

const PaymongoClient: ClientFunction = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    retrievePaymentIntent,
  };
};

export default PaymongoClient;
