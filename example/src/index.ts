import PaymongoClient from "../../dist";

const client = PaymongoClient("sk_test_23KHZ8zqFLdvSufpLjrHnko7");

const main = async () => {
  const paymentIntent = await client.retrievePaymentIntent({
    id: "pi_qocS57N9DSz3UvDa9Fjj4fYY",
  });
  console.log(paymentIntent);
};

main().catch(console.error);
