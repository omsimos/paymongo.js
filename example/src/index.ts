import PaymongoClient from "../../dist";

const client = PaymongoClient("sk_test_23KHZ8zqFLdvSufpLjrHnko7");

export const intentSample = async () => {
  const payment = await client.intent.create({
    amount: 10000,
    metadata: {
      order_id: "abc123",
    },
  });

  const paymentIntent = await client.intent.retrieve({
    intentId: payment.data.id,
  });

  console.log("paymentIntent:", paymentIntent.data.id);
  return paymentIntent;
};

export const methodSample = async () => {
  const payment = await client.method.create({
    details: {
      card_number: "4343434343434345",
      exp_month: 3,
      exp_year: 2023,
      cvc: "321",
    },
    type: "card",
  });

  const paymentMethod = await client.method.retrieve({
    methodId: payment.data.id,
  });

  console.log("paymentMethod:", paymentMethod.data.id);
  return paymentMethod;
};

export const attachSample = async () => {
  const intent = await intentSample();
  const method = await methodSample();

  const attachResponse = await client.intent.attach({
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
  const webhook = await client.webhook.retrieve(webhookId);
  console.log("retrieve:", webhook.data);

  const newData = await client.webhook.update({
    webhookId,
    events: ["payment.failed"],
  });
  console.log("update:", newData.data);

  console.log("disable", (await client.webhook.disable(webhookId)).data);
  console.log("enable", (await client.webhook.enable(webhookId)).data);
  console.log("all", await client.webhook.list());
};

export const createSourceSample = async () => {
  const source = await client.source.create({
    type: "gcash",
    currency: "PHP",
    amount: 10000,
    redirect: {
      success: "http://localhost:3000/payments/success",
      failed: "http://localhost:3000/payments/error",
    },
  });

  console.log("source:", source);
  console.log("redirect:", source.data.attributes.redirect);
  console.log("source_id: ", source.data.id);
};

const main = async () => {
  // comment out the line you want to test
  // await webhookSample();
  await createSourceSample();
};

main().catch(console.error);
