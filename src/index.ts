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
    cancel: (intent_id: string) => ReturnType<typeof cancelIntent>;
    capture: (intent_id: string, props?: Parameters<typeof captureIntent>[2]) => ReturnType<typeof captureIntent>;
    create: (props: Parameters<typeof createIntent>[1]) => ReturnType<typeof createIntent>;
    retrieve: (props: Parameters<typeof retrieveIntent>[1]) => ReturnType<typeof retrieveIntent>;
  };
  method: {
    create: (props: Parameters<typeof createMethod>[1]) => ReturnType<typeof createMethod>;
    retrieve: (method_id: string) => ReturnType<typeof retrieveMethod>;
  };
  webhook: {
    create: (props: Parameters<typeof createWebhook>[1]) => ReturnType<typeof createWebhook>;
    disable: (webhook_id: string) => ReturnType<typeof disableWebhook>;
    enable: (webhook_id: string) => ReturnType<typeof enableWebhook>;
    list: () => ReturnType<typeof listWebhooks>;
    retrieve: (webhook_id: string) => ReturnType<typeof retrieveWebhook>;
    update: (props: Parameters<typeof updateWebhook>[1]) => ReturnType<typeof updateWebhook>;
  };
  source: {
    create: (props: Parameters<typeof createSource>[1]) => ReturnType<typeof createSource>;
    retrieve: (source_id: string) => ReturnType<typeof retrieveSource>;
  };
  link: {
    archive: (link_id: string) => ReturnType<typeof archiveLink>;
    create: (props: Parameters<typeof createLink>[1]) => ReturnType<typeof createLink>;
    retrieveFromRef: (ref_id: string) => ReturnType<typeof retrieveFromRefLink>;
    retrieve: (link_id: string) => ReturnType<typeof retrieveLink>;
    unarchive: (link_id: string) => ReturnType<typeof unarchiveLink>;
  };
  payment: {
    create: (props: Parameters<typeof createPayment>[1]) => ReturnType<typeof createPayment>;
    retrieve: (payment_id: string) => ReturnType<typeof retrievePayment>;
    list: () => ReturnType<typeof listPayments>;
  };
  checkout: {
    create: (props: Parameters<typeof createCheckout>[1]) => ReturnType<typeof createCheckout>;
    retrieve: (checkout_id: string) => ReturnType<typeof retrieveCheckout>;
  };
  customer: {
    create: (props: Parameters<typeof createCustomer>[1]) => ReturnType<typeof createCustomer>;
    list: (props?: Parameters<typeof listCustomers>[1]) => ReturnType<typeof listCustomers>;
    retrieve: (customer_id: string) => ReturnType<typeof retrieveCustomer>;
    update: (customer_id: string, props: Parameters<typeof updateCustomer>[2]) => ReturnType<typeof updateCustomer>;
    delete: (customer_id: string) => ReturnType<typeof deleteCustomer>;
  };
  product: {
    create: (props: Parameters<typeof createProduct>[1]) => ReturnType<typeof createProduct>;
    list: (props?: Parameters<typeof listProducts>[1]) => ReturnType<typeof listProducts>;
    retrieve: (product_id: string) => ReturnType<typeof retrieveProduct>;
    update: (product_id: string, props: Parameters<typeof updateProduct>[2]) => ReturnType<typeof updateProduct>;
    delete: (product_id: string) => ReturnType<typeof deleteProduct>;
  };
  plan: {
    create: (props: Parameters<typeof createPlan>[1]) => ReturnType<typeof createPlan>;
    list: (props?: Parameters<typeof listPlans>[1]) => ReturnType<typeof listPlans>;
    retrieve: (plan_id: string) => ReturnType<typeof retrievePlan>;
    update: (plan_id: string, props: Parameters<typeof updatePlan>[2]) => ReturnType<typeof updatePlan>;
  };
  subscription: {
    create: (props: Parameters<typeof createSubscription>[1]) => ReturnType<typeof createSubscription>;
    list: (props?: Parameters<typeof listSubscriptions>[1]) => ReturnType<typeof listSubscriptions>;
    retrieve: (subscription_id: string) => ReturnType<typeof retrieveSubscription>;
    cancel: (subscription_id: string, props: Parameters<typeof cancelSubscription>[2]) => ReturnType<typeof cancelSubscription>;
    changePlan: (subscription_id: string, props: Parameters<typeof changeSubscriptionPlan>[2]) => ReturnType<typeof changeSubscriptionPlan>;
    changePaymentMethod: (subscription_id: string, props: Parameters<typeof changeSubscriptionPaymentMethod>[2]) => ReturnType<typeof changeSubscriptionPaymentMethod>;
  };
  refund: {
    create: (props: Parameters<typeof createRefund>[1]) => ReturnType<typeof createRefund>;
    list: (props?: Parameters<typeof listRefunds>[1]) => ReturnType<typeof listRefunds>;
    retrieve: (refund_id: string) => ReturnType<typeof retrieveRefund>;
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
      cancel: (intent_id) => cancelIntent(api, intent_id),
      capture: (intent_id, props) => captureIntent(api, intent_id, props),
      create: (props) => createIntent(api, props),
      retrieve: (props) => retrieveIntent(api, props),
    },
    method: {
      create: (props) => createMethod(api, props),
      retrieve: (method_id) => retrieveMethod(api, method_id),
    },
    webhook: {
      create: (props) => createWebhook(api, props),
      disable: (webhook_id) => disableWebhook(api, webhook_id),
      enable: (webhook_id) => enableWebhook(api, webhook_id),
      list: () => listWebhooks(api),
      retrieve: (webhook_id) => retrieveWebhook(api, webhook_id),
      update: (props) => updateWebhook(api, props),
    },
    source: {
      create: (props) => createSource(api, props),
      retrieve: (source_id) => retrieveSource(api, source_id),
    },
    link: {
      archive: (link_id) => archiveLink(api, link_id),
      create: (props) => createLink(api, props),
      retrieveFromRef: (ref_id) => retrieveFromRefLink(api, ref_id),
      retrieve: (link_id) => retrieveLink(api, link_id),
      unarchive: (link_id) => unarchiveLink(api, link_id),
    },
    payment: {
      create: (props) => createPayment(api, props),
      retrieve: (payment_id) => retrievePayment(api, payment_id),
      list: () => listPayments(api),
    },
    checkout: {
      create: (props) => createCheckout(api, props),
      retrieve: (checkout_id) => retrieveCheckout(api, checkout_id),
    },
    customer: {
      create: (props) => createCustomer(api, props),
      list: (props) => listCustomers(api, props),
      retrieve: (customer_id) => retrieveCustomer(api, customer_id),
      update: (customer_id, props) => updateCustomer(api, customer_id, props),
      delete: (customer_id) => deleteCustomer(api, customer_id),
    },
    product: {
      create: (props) => createProduct(api, props),
      list: (props) => listProducts(api, props),
      retrieve: (product_id) => retrieveProduct(api, product_id),
      update: (product_id, props) => updateProduct(api, product_id, props),
      delete: (product_id) => deleteProduct(api, product_id),
    },
    plan: {
      create: (props) => createPlan(api, props),
      list: (props) => listPlans(api, props),
      retrieve: (plan_id) => retrievePlan(api, plan_id),
      update: (plan_id, props) => updatePlan(api, plan_id, props),
    },
    subscription: {
      create: (props) => createSubscription(api, props),
      list: (props) => listSubscriptions(api, props),
      retrieve: (subscription_id) => retrieveSubscription(api, subscription_id),
      cancel: (subscription_id, props) => cancelSubscription(api, subscription_id, props),
      changePlan: (subscription_id, props) => changeSubscriptionPlan(api, subscription_id, props),
      changePaymentMethod: (subscription_id, props) => changeSubscriptionPaymentMethod(api, subscription_id, props),
    },
    refund: {
      create: (props) => createRefund(api, props),
      list: (props) => listRefunds(api, props),
      retrieve: (refund_id) => retrieveRefund(api, refund_id),
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