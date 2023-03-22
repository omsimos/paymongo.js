import { api } from "./api/base";

import { createPaymentIntent } from "./api/intent/create";
import { retrievePaymentIntent } from "./api/intent/retrieve";

import { createPaymentMethod } from "./api/method/create";
import { retrievePaymentMethod } from "./api/method/retrieve";

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
    intent: {
      create: createPaymentIntent,
      retrieve: retrievePaymentIntent,
    },
    /**
     * # PaymentMethod Resource
     * @link https://developers.paymongo.com/reference/the-payment-method-object
     */
    method: {
      create: createPaymentMethod,
      retrieve: retrievePaymentMethod,
    },
  };
};
