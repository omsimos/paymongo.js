import PaymongoClient from "../../dist";

const client = PaymongoClient("sk_test_23KHZ8zqFLdvSufpLjrHnko7");

export const intentSample = async () => {
  const payment = await client.createPaymentIntent({
    amount: 10000,
    metadata: {
      order_id: "abc123",
    },
  });
  console.log(payment.data);

  const paymentIntent = await client.retrievePaymentIntent({
    intentId: payment.data.id,
  });
  console.log(paymentIntent.data);
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
  console.log(payment.data);

  const paymentMethod = await client.retrievePaymentMethod({
    methodId: payment.data.id,
  });
  console.log(paymentMethod.data);
};

const main = async () => {
  // comment out the line you want to test
  // await intentSample();
  // await methodSample();
};

main().catch(console.error);
