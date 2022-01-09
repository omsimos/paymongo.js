import { retrievePaymentIntent } from "./payment/intent";
import { store } from "./store";

export * from "./payment";

const PaymongoClient = (secretKey: string) => {
  store.setState((state) => ({ ...state, secretKey }));

  return {
    retrievePaymentIntent,
  };
};

export default PaymongoClient;
