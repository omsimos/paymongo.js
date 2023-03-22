# paymongo.js

![CI](https://github.com/princejoogie/paymongo.js/actions/workflows/main.yml/badge.svg)
![License](https://img.shields.io/badge/license-MIT-brightgreen?style=flat)
![Version](https://img.shields.io/github/v/release/princejoogie/paymongo.js?color=%2349C31B&include_prereleases&label=version)

An end-to-end typesafe library for [PayMongo.](https://www.paymongo.com/)

## Installation

[![NPM](https://nodei.co/npm/paymongo.js.png)](https://npmjs.org/package/paymongo.js)

```bash
npm install paymongo.js # or yarn add paymongo.js
```

## Usage

```js
import { createPaymongoClient } from "paymongo.js";
const client = createPaymongoClient("sk_key");
```

### Payment Intent

See [PaymentIntent Resource](https://developers.paymongo.com/reference/the-payment-intent-object) reference.

- [**Create a Intent**](https://developers.paymongo.com/reference/create-a-paymentintent)

  ```js
  const res = await client.intent.create({
    amount: 10000,
    payment_method_allowed: ["card", "gcash"],
    currency: "PHP",
  });
  ```

- [**Retrieve a PaymentIntent**](https://developers.paymongo.com/reference/retrieve-a-paymentintent)

  ```js
  const res = client.intent.retrieve({
    intentId: "some_intent_id",
  });
  ```

- [**Attach to PaymentIntent**](https://developers.paymongo.com/reference/attach-to-paymentintent)

  ```js
  const res = await client.intent.attach({
    intentId: "some_intent_id",
    intentId: "some_method_id",
  });
  ```

### Payment Method

See [PaymentMethod Resource](https://developers.paymongo.com/reference/the-payment-method-object) reference.

- [**Create a Method**](https://developers.paymongo.com/reference/create-a-paymentmethod)

  ```js
  const res = await client.method.create({
    type: "gcash",
    billing: {
      name: "John Doe",
      email: "john@email.com",
      phone: "+639999999999",
      address: {
        city: "Manila",
        line1: "line 1",
        line2: "line 2",
        state: "Metro Manila",
        country: "PH",
        postal_code: "1000",
      },
    },
  });
  ```

  ```js
  const res = await client.method.create({
    type: "card",
    details: {
      card_number: "4242424242424242",
      exp_month: 12,
      exp_year: 2025,
    },
  });
  ```

- [**Retrieve a Method**](https://developers.paymongo.com/reference/create-a-paymentmethod)

  ```js
  const retrieveResponse = await client.method.retrieve("some_method_id");
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

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

Like the project? would appreciate a coffee ☕

[![Buy Me A Coffee](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/princejoogie)

### Contributor list

[![Contributors](https://contrib.rocks/image?repo=princejoogie/paymongo.js)](https://github.com/princejoogie/paymongo.js/graphs/contributors)

---

Made by [**Prince Carlo Juguilon**](https://princecaarlo.tech/) together with these awesome [**Contributors**](https://github.com/princejoogie/paymongo.js/graphs/contributors).
