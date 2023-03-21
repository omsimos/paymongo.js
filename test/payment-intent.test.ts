import "dotenv/config";
import { createPaymongoClient } from "../src";
import { test, expect } from "vitest";

test("can create payment intent", async () => {
  const key = process.env.PM_SECRET_KEY as string;
  const client = createPaymongoClient(key);
  const res = await client.paymentIntent.create({
    amount: 10000,
    payment_method_allowed: ["card", "gcash"],
    currency: "PHP",
  });
  expect(res.data.type).toEqual("payment_intent");
  expect(res.data.attributes.amount).toEqual(10000);
});
