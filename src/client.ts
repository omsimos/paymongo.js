import { api } from "./api/base";
import { createPaymentIntent } from "./api/payment-intent/create";
import { retrievePaymentIntent } from "./api/payment-intent/retrieve";

export const createPaymongoClient = (key: string) => {
  api.defaults.auth = {
    username: key,
    password: "",
  };

  return {
    /**
     * # PaymentIntent Resource
     * @link https://developers.paymongo.com/reference/the-payment-intent-object
     */
    paymentIntent: {
      create: createPaymentIntent,
      retrieve: retrievePaymentIntent,
    },
  };
};
