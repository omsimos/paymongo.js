import PaymongoClient from "../../dist";

const client = PaymongoClient("sk_test_23KHZ8zqFLdvSufpLjrHnko7");

const main = async () => {
  const payment = await client.createPaymentIntent({
    amount: 10000,
    metadata: {
      order_id: "abc123",
    },
  });

  const paymentIntent = await client.retrievePaymentIntent({
    id: payment.data.id,
  });
  console.log(paymentIntent.data.attributes);
};

main().catch(console.error);
