import { api } from "./api/base";

import { createPaymentIntent } from "./api/intent/create";
import { retrievePaymentIntent } from "./api/intent/retrieve";
import { attachToPaymentIntent } from "./api/intent/attach";

import { createPaymentMethod } from "./api/method/create";
import { retrievePaymentMethod } from "./api/method/retrieve";

import { createLink } from "./api/links/create";

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
      /**
       * # Create a PaymentIntent
       * @link https://developers.paymongo.com/reference/create-a-paymentintent
       *
       * @example
       * ```js
       *  const intent = await client.intent.create({
       *    amount: 10000,
       *    payment_method_allowed: ["card", "gcash"],
       *    currency: "PHP",
       *  });
       * ```
       */
      create: createPaymentIntent,
      /**
       * # Retrieve a PaymentIntent
       * @link https://developers.paymongo.com/reference/retrieve-a-paymentintent
       *
       * @example
       * ```js
       *  const intent = await client.intent.retrieve({
       *    intentId: "some_intent_id",
       *  });
       * }
       * ```
       */
      retrieve: retrievePaymentIntent,
      /**
       * # Attach to PaymentIntent
       * @link https://developers.paymongo.com/reference/attach-to-paymentintent
       *
       * @example
       * ```js
       * const intent = await client.intent.attach({
       *   intentId: "some_intent_id",
       *   methodId: "some_method_id"",
       *   return_url: "https://example.com/success",
       * });
       * ```
       */
      attach: attachToPaymentIntent,
    },
    /**
     * # PaymentMethod Resource
     * @link https://developers.paymongo.com/reference/the-payment-method-object
     */
    method: {
      /**
       * # Create a PaymentMethod
       * @link https://developers.paymongo.com/reference/create-a-paymentmethod
       *
       * @example-gcash
       *
       * ```js
       *  const method = await client.method.create({
       *    type: "gcash",
       *  });
       * ```
       *
       * @example-card
       *
       * ```js
       *  const res = await client.method.create({
       *    type: "card",
       *    details: {
       *      card_number: "4242424242424242",
       *      exp_month: 12,
       *      exp_year: 2025,
       *    }
       *  });
       * ```
       *
       * @example-with-billing
       *
       * ```js
       *  const res = await client.method.create({
       *    type: "gcash",
       *    billing: {
       *      name: "John Doe",
       *      email: "john@email.com",
       *      phone: "+639999999999",
       *      address: {
       *        city: "Manila",
       *        line1: "line 1",
       *        line2: "line 2",
       *        state: "Metro Manila",
       *        country: "PH",
       *        postal_code: "1000",
       *      },
       *    }
       * });
       * ```
       */
      create: createPaymentMethod,
      /**
       * # Retrieve a PaymentMethod
       * @link https://developers.paymongo.com/reference/retrieve-a-paymentmethod
       *
       * @example
       * ```js
       *  const method = await client.method.retrieve({
       *    methodId: "some_method_id",
       *  });
       * }
       * ```
       */
      retrieve: retrievePaymentMethod,
    },
    /**
     * # Links Resource
     * @link https://developers.paymongo.com/reference/links-resource
     */
    links: {
      /**
       * # Create a Link
       * @link https://developers.paymongo.com/reference/create-a-link
       *
       * @example
       * ```js
       *  const intent = await client.intent.create({
       *    amount: 10000,
       *    payment_method_allowed: ["card", "gcash"],
       *    currency: "PHP",
       *  });
       * ```
       */
      create: createLink,
    },
  };
};
