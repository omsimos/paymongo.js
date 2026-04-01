# paymongo.js

![CI](https://github.com/princejoogie/paymongo.js/actions/workflows/main.yml/badge.svg)
![CJS](https://img.badgesize.io/princejoogie/paymongo.js/main/dist/paymongo.js.cjs.production.min.js?label=CJS)
![ESM](https://img.badgesize.io/princejoogie/paymongo.js/main/dist/paymongo.js.esm.js?label=ESM)
![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat)
![Version](https://img.shields.io/github/v/release/princejoogie/paymongo.js?color=%2349C31B&include_prereleases&label=version)

A lightweight, fully-featured, modular, typescript-compatible javascript library for [PayMongo.](https://www.paymongo.com/)

## Installation

[![NPM](https://nodei.co/npm/paymongo.js.png)](https://npmjs.org/package/paymongo.js)

```bash
npm install paymongo.js # or yarn add paymongo.js
```

## Usage

```js
import PaymongoClient from "paymongo.js";
export const client = PaymongoClient("sk_key");
```

### (**_BETA_**) Links

To use this feature, install with

```bash
npm install paymongo.js@next # or yarn add paymongo.js@next
```

- **Create a Link**

  ```js
  const link = await client.link.create({
    amount: 10000,
    description: "Test payment link",
  });
  ```

- **Retrieve a Link**

  ```js
  const link = await client.link.retrieve("some_link_id");
  ```

- **Retrieve from Reference number**

  ```js
  const link = await client.link.retrieveFromRef("some_ref_id");
  ```

- **Archive a Link**

  ```js
  const link = await client.link.archive("some_link_id");
  ```

- **Unarchive a Link**

  ```js
  const link = await client.link.unarchive("some_link_id");
  ```

### Payment Method

See [PaymentMethod Resource](https://developers.paymongo.com/reference/the-payment-method-object) reference.

- [**Create a Method**](https://developers.paymongo.com/reference/create-a-paymentmethod)

  ```js
  // Card
  const createResponse = await client.method.create({
    details: {
      cardNumber: "4343434343434345",
      expMonth: 3,
      expYear: 2023,
      cvc: "321",
    },
    type: "card",
  });

  // GCash / PayMaya
  const createResponse = await client.method.create({
    details: {
      phoneNumber: "09171234567",
    },
    type: "gcash",
  });

  // DOB / Brankas
  const createResponse = await client.method.create({
    details: {
      bankCode: "bpi",
    },
    type: "dob",
  });
  ```

- [**Retrieve a Method**](https://developers.paymongo.com/reference/create-a-paymentmethod)

  ```js
  const retrieveResponse = await client.method.retrieve("some_method_id");
  ```

### Payment Intent

See [PaymentIntent Resource](https://developers.paymongo.com/reference/the-payment-intent-object) reference.

- [**Create a Intent**](https://developers.paymongo.com/reference/create-a-paymentintent)

  ```js
  const createResponse = await client.intent.create({
    amount: 10000,
    metadata: {
      order_id: "some_order_id",
    },
  });
  ```

- [**Retrieve a PaymentIntent**](https://developers.paymongo.com/reference/retrieve-a-paymentintent)

  ```js
  const retrieveResponse = await client.intent.retrieve({
    intentId: "some_intent_id",
  });
  ```

- [**Attach to PaymentIntent**](https://developers.paymongo.com/reference/attach-to-paymentintent)

  ```js
  const attachResponse = await client.intent.attach({
    intentId: "some_intent_id",
    methodId: "some_method_id",
  });
  ```

- [**Capture a PaymentIntent**](https://developers.paymongo.com/reference/capture-a-payment)

  ```js
  const captureResponse = await client.intent.capture("some_intent_id", {
    amount: 10000,
  });
  ```

- [**Cancel a PaymentIntent**](https://developers.paymongo.com/reference/cancel-a-paymentintent)

  ```js
  const cancelResponse = await client.intent.cancel("some_intent_id");
  ```

### Checkout Session

- [**Create a Checkout Session**](https://developers.paymongo.com/reference/create-a-checkout)

  ```js
  const checkout = await client.checkout.create({
    lineItems: [{ name: "Item", amount: 10000, quantity: 1 }],
    paymentMethodTypes: ["card", "gcash"],
    successUrl: "https://example.com/success",
  });
  ```

- [**Retrieve a Checkout Session**](https://developers.paymongo.com/reference/checkout-session-resource)

  ```js
  const checkout = await client.checkout.retrieve("cs_test_123");
  ```

### Sources

See [Source Resource](https://developers.paymongo.com/reference/the-sources-object) reference.

- [**Create a Source**](https://developers.paymongo.com/reference/create-a-source)

  ```js
  const createResponse = await client.source.create({
    type: "gcash", // gcash | grab_pay
    currency: "PHP",
    amount: 10000,
    redirect: {
      success: "https://example.com/payments/success",
      failed: "https://example.com/payments/error",
    },
  });
  ```

- [**Retrieve a Source**](https://developers.paymongo.com/reference/retrieve-a-source)

  ```js
  const retrieveResponse = await client.source.retrieve("some_source_id");
  ```

### Payments

See [Payment Resource](https://developers.paymongo.com/reference/payment-source) reference.

- [**Create a Payment**](https://developers.paymongo.com/reference/create-a-payment)

  ```js
  const p = await client.payment.create({
    amount: 10000,
    source: {
      id: "some_source_id",
      type: "source",
    },
  });
  ```

- [**List all Payments**](https://developers.paymongo.com/reference/list-all-payments)

  ```js
  const p = await client.payment.list();
  ```

- [**Retrieve a Payment**](https://developers.paymongo.com/reference/retrieve-a-payment)

  ```js
  const p = await client.payment.retrieve("some_payment_id");
  ```

### Webhooks

See [Webhook Resource](https://developers.paymongo.com/reference/webhook-resource) reference.

- [**Create a Webhook**](https://developers.paymongo.com/reference/create-a-webhook)

  ```js
  const webhook = await client.webhook.create({
    events: ["payment.failed", "payment.paid", "source.chargeable"],
    url: "https://example.com/webhook",
  });
  ```

- [**Update a Webhook**](https://developers.paymongo.com/reference/update-a-webhook)

  ```js
  const webhook = await client.webhook.update({
    webhookId: "some_webhook_id",
    events: ["payment.failed"],
  });
  ```

- [**List all Webhooks**](https://developers.paymongo.com/reference/list-all-webhooks)

  ```js
  const webhooks = await client.webhook.list();
  ```

- [**Retrieve a Webhook**](https://developers.paymongo.com/reference/retrieve-a-webhook)

  ```js
  const webhook = await client.webhook.retrieve("some_webhook_id");
  ```

- [**Enable a Webhook**](https://developers.paymongo.com/reference/enable-a-webhook)

  ```js
  const webhook = await client.webhook.enable("some_webhook_id");
  ```

- [**Disable a Webhook**](https://developers.paymongo.com/reference/disable-a-webhook)

  ```js
  const webhook = await client.webhook.disable("some_webhook_id");
  ```

### Customers

- **Create a Customer**

  ```js
  const customer = await client.customer.create({
    name: "John Doe",
    email: "john@example.com",
    mobilePhone: "+631234567890",
  });
  ```

- **List Customers**

  ```js
  const customers = await client.customer.list({ limit: 10, page: 1 });
  ```

- **Retrieve a Customer**

  ```js
  const customer = await client.customer.retrieve("cus_123");
  ```

- **Update a Customer**

  ```js
  const customer = await client.customer.update("cus_123", { name: "Updated Name" });
  ```

- **Delete a Customer**

  ```js
  const customer = await client.customer.delete("cus_123");
  ```

### Products

- **Create a Product**

  ```js
  const product = await client.product.create({
    name: "Test Product",
    price: 10000,
    currency: "PHP",
  });
  ```

- **List Products**

  ```js
  const products = await client.product.list({ limit: 10, page: 1 });
  ```

- **Retrieve a Product**

  ```js
  const product = await client.product.retrieve("prod_123");
  ```

- **Update a Product**

  ```js
  const product = await client.product.update("prod_123", { name: "Updated Name" });
  ```

- **Delete a Product**

  ```js
  const product = await client.product.delete("prod_123");
  ```

### Plans

- **Create a Plan**

  ```js
  const plan = await client.plan.create({
    name: "Monthly Plan",
    amount: 1000,
    currency: "PHP",
    interval: "monthly",
    intervalCount: 1,
  });
  ```

- **List Plans**

  ```js
  const plans = await client.plan.list({ limit: 10, page: 1 });
  ```

- **Retrieve a Plan**

  ```js
  const plan = await client.plan.retrieve("plan_123");
  ```

- **Update a Plan**

  ```js
  const plan = await client.plan.update("plan_123", { name: "Updated Plan" });
  ```

### Subscriptions

- **Create a Subscription**

  ```js
  const subscription = await client.subscription.create({
    customerId: "cus_123",
    planId: "plan_123",
  });
  ```

- **List Subscriptions**

  ```js
  const subscriptions = await client.subscription.list({ limit: 10 });
  ```

- **Retrieve a Subscription**

  ```js
  const subscription = await client.subscription.retrieve("sub_123");
  ```

- **Cancel a Subscription**

  ```js
  const subscription = await client.subscription.cancel("sub_123", {
    cancellationReason: "too_expensive",
  });
  ```

- **Change Subscription Plan**

  ```js
  const subscription = await client.subscription.changePlan("sub_123", {
    planId: "plan_456",
  });
  ```

- **Change Payment Method**

  ```js
  const subscription = await client.subscription.changePaymentMethod("sub_123", {
    paymentMethodId: "pm_123",
    redirectUrl: "https://example.com/success",
  });
  ```

### Refunds

- **Create a Refund**

  ```js
  const refund = await client.refund.create({
    paymentId: "pay_123",
    amount: 5000,
    reason: "requested_by_customer",
  });
  ```

- **List Refunds**

  ```js
  const refunds = await client.refund.list({ limit: 10 });
  ```

- **Retrieve a Refund**

  ```js
  const refund = await client.refund.retrieve("ref_123");
  ```

### Transactions

- **List Transactions**

  ```js
  const transactions = await client.transaction.list({ limit: 10, type: "payment" });
  ```

### Fraud

- **List Fraud Reviews**

  ```js
  const reviews = await client.fraud.listReviews({ limit: 10 });
  ```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

Like the project? would appreciate a coffee ☕

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/princejoogie)

### Contributor list

[![Contributors](https://contrib.rocks/image?repo=princejoogie/paymongo.js)](https://github.com/princejoogie/paymongo.js/graphs/contributors)

---

## Running your own instance

Clone the repository:

```bash
git clone https://github.com/princejoogie/paymongo.js.git
cd paymongo.js
```

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Configuration

Code quality is set up for you with `prettier`, `husky`, and `lint-staged`. Adjust the respective fields in `package.json` accordingly.

### Jest

Jest tests are set up to run with `npm test` or `yarn test`.

### Bundle Analysis

[`size-limit`](https://github.com/ai/size-limit) is set up to calculate the real cost of your library with `npm run size` and visualize the bundle with `npm run analyze`.

### Rollup

This library uses [Rollup](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log("foo");
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

## Publishing to NPM

We recommend using [np](https://github.com/sindresorhus/np).

---

Made by [**Prince Carlo Juguilon**](https://princecaarlo.tech/) together with these awesome [**Contributors**](https://github.com/princejoogie/paymongo.js/graphs/contributors).
