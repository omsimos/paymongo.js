import { createFetchClient, type FetchClient } from "./utils/fetch-client.js";
import { createIntent, retrieveIntent, attachIntent, captureIntent, cancelIntent } from "./payment/intent/index.js";
import { createMethod, retrieveMethod } from "./payment/method/index.js";
import {
  createWebhook,
  disableWebhook,
  enableWebhook,
  listWebhooks,
  retrieveWebhook,
  updateWebhook,
} from "./payment/webhook/index.js";
import { createSource, retrieveSource } from "./payment/source/index.js";
import {
  archiveLink,
  createLink,
  retrieveFromRefLink,
  retrieveLink,
  unarchiveLink,
} from "./payment/link/index.js";
import { createPayment, retrievePayment, listPayments } from "./payment/index.js";
import { createCheckout, retrieveCheckout } from "./payment/checkout/index.js";
import {
  createCustomer,
  listCustomers,
  retrieveCustomer,
  updateCustomer,
  deleteCustomer,
} from "./payment/customer/index.js";
import {
  createProduct,
  listProducts,
  retrieveProduct,
  updateProduct,
  deleteProduct,
} from "./payment/product/index.js";
import {
  createPlan,
  listPlans,
  retrievePlan,
  updatePlan,
} from "./payment/plan/index.js";
import {
  createSubscription,
  listSubscriptions,
  retrieveSubscription,
  cancelSubscription,
  changeSubscriptionPlan,
  changeSubscriptionPaymentMethod,
} from "./payment/subscription/index.js";
import { createRefund, listRefunds, retrieveRefund } from "./payment/refund/index.js";
import { listTransactions } from "./payment/transaction/index.js";
import { listFraudReviews } from "./payment/fraud/index.js";

export * from "./payment/types.js";

export interface PaymongoClient {
  intent: {
    attach: (props: Parameters<typeof attachIntent>[1]) => ReturnType<typeof attachIntent>;
    cancel: (intentId: string) => ReturnType<typeof cancelIntent>;
    capture: (intentId: string, props?: Parameters<typeof captureIntent>[2]) => ReturnType<typeof captureIntent>;
    create: (props: Parameters<typeof createIntent>[1]) => ReturnType<typeof createIntent>;
    retrieve: (props: Parameters<typeof retrieveIntent>[1]) => ReturnType<typeof retrieveIntent>;
  };
  method: {
    create: (props: Parameters<typeof createMethod>[1]) => ReturnType<typeof createMethod>;
    retrieve: (methodId: string) => ReturnType<typeof retrieveMethod>;
  };
  webhook: {
    create: (props: Parameters<typeof createWebhook>[1]) => ReturnType<typeof createWebhook>;
    disable: (webhookId: string) => ReturnType<typeof disableWebhook>;
    enable: (webhookId: string) => ReturnType<typeof enableWebhook>;
    list: () => ReturnType<typeof listWebhooks>;
    retrieve: (webhookId: string) => ReturnType<typeof retrieveWebhook>;
    update: (props: Parameters<typeof updateWebhook>[1]) => ReturnType<typeof updateWebhook>;
  };
  source: {
    create: (props: Parameters<typeof createSource>[1]) => ReturnType<typeof createSource>;
    retrieve: (sourceId: string) => ReturnType<typeof retrieveSource>;
  };
  link: {
    archive: (linkId: string) => ReturnType<typeof archiveLink>;
    create: (props: Parameters<typeof createLink>[1]) => ReturnType<typeof createLink>;
    retrieveFromRef: (refId: string) => ReturnType<typeof retrieveFromRefLink>;
    retrieve: (linkId: string) => ReturnType<typeof retrieveLink>;
    unarchive: (linkId: string) => ReturnType<typeof unarchiveLink>;
  };
  payment: {
    create: (props: Parameters<typeof createPayment>[1]) => ReturnType<typeof createPayment>;
    retrieve: (paymentId: string) => ReturnType<typeof retrievePayment>;
    list: () => ReturnType<typeof listPayments>;
  };
  checkout: {
    create: (props: Parameters<typeof createCheckout>[1]) => ReturnType<typeof createCheckout>;
    retrieve: (checkoutId: string) => ReturnType<typeof retrieveCheckout>;
  };
  customer: {
    create: (props: Parameters<typeof createCustomer>[1]) => ReturnType<typeof createCustomer>;
    list: (props?: Parameters<typeof listCustomers>[1]) => ReturnType<typeof listCustomers>;
    retrieve: (customerId: string) => ReturnType<typeof retrieveCustomer>;
    update: (customerId: string, props: Parameters<typeof updateCustomer>[2]) => ReturnType<typeof updateCustomer>;
    delete: (customerId: string) => ReturnType<typeof deleteCustomer>;
  };
  product: {
    create: (props: Parameters<typeof createProduct>[1]) => ReturnType<typeof createProduct>;
    list: (props?: Parameters<typeof listProducts>[1]) => ReturnType<typeof listProducts>;
    retrieve: (productId: string) => ReturnType<typeof retrieveProduct>;
    update: (productId: string, props: Parameters<typeof updateProduct>[2]) => ReturnType<typeof updateProduct>;
    delete: (productId: string) => ReturnType<typeof deleteProduct>;
  };
  plan: {
    create: (props: Parameters<typeof createPlan>[1]) => ReturnType<typeof createPlan>;
    list: (props?: Parameters<typeof listPlans>[1]) => ReturnType<typeof listPlans>;
    retrieve: (planId: string) => ReturnType<typeof retrievePlan>;
    update: (planId: string, props: Parameters<typeof updatePlan>[2]) => ReturnType<typeof updatePlan>;
  };
  subscription: {
    create: (props: Parameters<typeof createSubscription>[1]) => ReturnType<typeof createSubscription>;
    list: (props?: Parameters<typeof listSubscriptions>[1]) => ReturnType<typeof listSubscriptions>;
    retrieve: (subscriptionId: string) => ReturnType<typeof retrieveSubscription>;
    cancel: (subscriptionId: string, props: Parameters<typeof cancelSubscription>[2]) => ReturnType<typeof cancelSubscription>;
    changePlan: (subscriptionId: string, props: Parameters<typeof changeSubscriptionPlan>[2]) => ReturnType<typeof changeSubscriptionPlan>;
    changePaymentMethod: (subscriptionId: string, props: Parameters<typeof changeSubscriptionPaymentMethod>[2]) => ReturnType<typeof changeSubscriptionPaymentMethod>;
  };
  refund: {
    create: (props: Parameters<typeof createRefund>[1]) => ReturnType<typeof createRefund>;
    list: (props?: Parameters<typeof listRefunds>[1]) => ReturnType<typeof listRefunds>;
    retrieve: (refundId: string) => ReturnType<typeof retrieveRefund>;
  };
  transaction: {
    list: (props?: Parameters<typeof listTransactions>[1]) => ReturnType<typeof listTransactions>;
  };
  fraud: {
    listReviews: (props?: Parameters<typeof listFraudReviews>[1]) => ReturnType<typeof listFraudReviews>;
  };
}

export type ClientFunction = (secretKey: string) => PaymongoClient;

/**
 * @module PaymongoClient
 * @param secretKey - The secret key of your Paymongo account.
 * @returns {PaymongoClient} - The Paymongo client.
 *
 * @example
 * ```js
 * import PaymongoClient from "paymongo.js";
 *
 * const main = async () => {
 *  const client = PaymongoClient("sk_test_key");
 *  return client;
 * }
 * ```
 */
const PaymongoClient: ClientFunction = (secretKey: string) => {
  const api: FetchClient = createFetchClient(secretKey);

  return {
    intent: {
      attach: (props) => attachIntent(api, props),
      cancel: (intentId) => cancelIntent(api, intentId),
      capture: (intentId, props) => captureIntent(api, intentId, props),
      create: (props) => createIntent(api, props),
      retrieve: (props) => retrieveIntent(api, props),
    },
    method: {
      create: (props) => createMethod(api, props),
      retrieve: (methodId) => retrieveMethod(api, methodId),
    },
    webhook: {
      create: (props) => createWebhook(api, props),
      disable: (webhookId) => disableWebhook(api, webhookId),
      enable: (webhookId) => enableWebhook(api, webhookId),
      list: () => listWebhooks(api),
      retrieve: (webhookId) => retrieveWebhook(api, webhookId),
      update: (props) => updateWebhook(api, props),
    },
    source: {
      create: (props) => createSource(api, props),
      retrieve: (sourceId) => retrieveSource(api, sourceId),
    },
    link: {
      archive: (linkId) => archiveLink(api, linkId),
      create: (props) => createLink(api, props),
      retrieveFromRef: (refId) => retrieveFromRefLink(api, refId),
      retrieve: (linkId) => retrieveLink(api, linkId),
      unarchive: (linkId) => unarchiveLink(api, linkId),
    },
    payment: {
      create: (props) => createPayment(api, props),
      retrieve: (paymentId) => retrievePayment(api, paymentId),
      list: () => listPayments(api),
    },
    checkout: {
      create: (props) => createCheckout(api, props),
      retrieve: (checkoutId) => retrieveCheckout(api, checkoutId),
    },
    customer: {
      create: (props) => createCustomer(api, props),
      list: (props) => listCustomers(api, props),
      retrieve: (customerId) => retrieveCustomer(api, customerId),
      update: (customerId, props) => updateCustomer(api, customerId, props),
      delete: (customerId) => deleteCustomer(api, customerId),
    },
    product: {
      create: (props) => createProduct(api, props),
      list: (props) => listProducts(api, props),
      retrieve: (productId) => retrieveProduct(api, productId),
      update: (productId, props) => updateProduct(api, productId, props),
      delete: (productId) => deleteProduct(api, productId),
    },
    plan: {
      create: (props) => createPlan(api, props),
      list: (props) => listPlans(api, props),
      retrieve: (planId) => retrievePlan(api, planId),
      update: (planId, props) => updatePlan(api, planId, props),
    },
    subscription: {
      create: (props) => createSubscription(api, props),
      list: (props) => listSubscriptions(api, props),
      retrieve: (subscriptionId) => retrieveSubscription(api, subscriptionId),
      cancel: (subscriptionId, props) => cancelSubscription(api, subscriptionId, props),
      changePlan: (subscriptionId, props) => changeSubscriptionPlan(api, subscriptionId, props),
      changePaymentMethod: (subscriptionId, props) => changeSubscriptionPaymentMethod(api, subscriptionId, props),
    },
    refund: {
      create: (props) => createRefund(api, props),
      list: (props) => listRefunds(api, props),
      retrieve: (refundId) => retrieveRefund(api, refundId),
    },
    transaction: {
      list: (props) => listTransactions(api, props),
    },
    fraud: {
      listReviews: (props) => listFraudReviews(api, props),
    },
  };
};

export default PaymongoClient;