import PaymongoClient from "../../dist";

const client = PaymongoClient("sk_test_23KHZ8zqFLdvSufpLjrHnko7");

export const intentSample = async () => {
  const payment = await client.createPaymentIntent({
    amount: 10000,
    metadata: {
      order_id: "abc123",
    },
  });

  const paymentIntent = await client.retrievePaymentIntent({
    intentId: payment.data.id,
  });

  console.log("paymentIntent:", paymentIntent.data.id);
  return paymentIntent;
};

export const methodSample = async () => {
  const payment = await client.createPaymentMethod({
    details: {
      card_number: "4343434343434345",
      exp_month: 3,
      exp_year: 2023,
      cvc: "321",
    },
    type: "card",
  });

  const paymentMethod = await client.retrievePaymentMethod({
    methodId: payment.data.id,
  });

  console.log("paymentMethod:", paymentMethod.data.id);
  return paymentMethod;
};

export const attachSample = async () => {
  const intent = await intentSample();
  const method = await methodSample();

  const attachResponse = await client.attachPaymentIntent({
    intentId: intent.data.id,
    methodId: method.data.id,
  });

  console.log(attachResponse.data.id, attachResponse.data.type);
  console.log(attachResponse.data.attributes);
};

export const webhookSample = async () => {
  // const webhook = await client.createWebhook({
  //   events: ["payment.failed", "payment.paid", "source.chargeable"],
  //   url: "https://example.com/webhook",
  // });
  // console.log(webhook.data);

  const webhookId = "hook_dqj7oTfHNxkQ6BBHsPTmnrxr";
  const webhook = await client.retrieveWebhook(webhookId);
  console.log("retrieve:", webhook.data);

  const newData = await client.updateWebhook({
    webhookId,
    events: ["payment.failed"],
  });
  console.log("update:", newData.data);

  console.log("disable", (await client.disableWebhook(webhookId)).data);
  console.log("enable", (await client.enableWebhook(webhookId)).data);
  console.log("all", await client.listWebhooks());
};

const main = async () => {
  // comment out the line you want to test
  await webhookSample();
};

main().catch(console.error);
