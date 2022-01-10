# paymongo.js

![CI](https://github.com/princejoogie/paymongo.js/actions/workflows/main.yml/badge.svg)
![CJS](https://img.badgesize.io/princejoogie/paymongo.js/main/dist/paymongo.js.cjs.production.min.js?label=CJS)
![ESM](https://img.badgesize.io/princejoogie/paymongo.js/main/dist/paymongo.js.esm.js?label=ESM)
![License](https://img.shields.io/github/license/princejoogie/paymongo.js.svg)

A lightweight, fully-featured, modular, typescript-compatible javascript library for Paymongo.

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

### Payment Methods

See [PaymentMethod Resource](https://developers.paymongo.com/reference/the-payment-method-object) reference.

- [**Create a Method**](https://developers.paymongo.com/reference/create-a-paymentmethod)

  ```js
  const createResponse = await client.createPaymentMethod({
    details: {
      card_number: "4343434343434345",
      exp_month: 3,
      exp_year: 2023,
      cvc: "321",
    },
    type: "card",
  });
  ```

- [**Retrieve a Method**](https://developers.paymongo.com/reference/create-a-paymentmethod)

  ```js
  const retrieveResponse = await client.retrievePaymentMethod({
    methodId: "some_method_id",
  });
  ```

### Payment Intents

See [PaymentIntent Resource](https://developers.paymongo.com/reference/the-payment-intent-object) reference.

- [**Create a Intent**](https://developers.paymongo.com/reference/create-a-paymentintent)

  ```js
  const createResponse = await client.createPaymentIntent({
    amount: 10000,
    metadata: {
      order_id: "some_order_id",
    },
  });
  ```

- [**Retrieve a PaymentIntent**](https://developers.paymongo.com/reference/retrieve-a-paymentintent)

  ```js
  const retrieveResponse = await client.retrievePaymentIntent({
    intentId: "some_intent_id",
  });
  ```

- [**Attach to PaymentIntent**](https://developers.paymongo.com/reference/attach-to-paymentintent)

  ```js
  const attachResponse = await client.attachPaymentIntent({
    intentId: "some_intent_id",
    methodId: "some_method_id",
  });
  ```

### Payment Webhooks

See [Webhook Resource](https://developers.paymongo.com/reference/webhook-resource)

- [**Create a Webhook**](https://developers.paymongo.com/reference/create-a-webhook)

  ```js
  const webhook = await client.createWebhook({
    events: ["payment.failed", "payment.paid", "source.chargeable"],
    url: "https://example.com/webhook",
  });
  ```

- [**Update a Webhook**](https://developers.paymongo.com/reference/update-a-webhook)

  ```js
  const webhook = await client.updateWebhook({
    webhookId: "some_webhook_id",
    events: ["payment.failed"],
  });
  ```

- [**List all Webhooks**](https://developers.paymongo.com/reference/list-all-webhooks)

  ```js
  const webhooks = await client.listWebhooks();
  ```

- [**Retrieve a Webhook**](https://developers.paymongo.com/reference/retrieve-a-webhook)

  ```js
  const webhook = await client.retrieveWebhook("some_webhook_id");
  ```

- [**Enable a Webhook**](https://developers.paymongo.com/reference/enable-a-webhook)

  ```js
  const webhook = await client.enableWebhook("some_webhook_id");
  ```

- [**Disable a Webhook**](https://developers.paymongo.com/reference/disable-a-webhook)

  ```js
  const webhook = await client.disableWebhook("some_webhook_id");
  ```

---

## Contributing

todo

---

## Running your own instance

Clone the repository

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

Prince Carlo Juguilon
