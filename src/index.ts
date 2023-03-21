import { api } from "./api/base";
import { createPaymentIntent } from "./api/payment-intent/create";

export const createPaymongoClient = (key: string) => {
  api.defaults.auth = {
    username: key,
    password: "",
  };

  return {
    paymentIntent: {
      create: createPaymentIntent,
    },
  };
};
