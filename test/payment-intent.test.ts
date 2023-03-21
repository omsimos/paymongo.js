import "dotenv/config";
import { createPaymongoClient } from "../src";
import { test, expect } from "vitest";

const key = process.env.PM_SECRET_KEY as string;
const client = createPaymongoClient(key);

test("can create payment intent", async () => {
  const res = await client.paymentIntent.create({
    amount: 10000,
    payment_method_allowed: ["card", "gcash"],
    currency: "PHP",
  });
  expect(res.data.type).toEqual("payment_intent");
  expect(res.data.attributes.amount).toEqual(10000);
});

test("rejects on zod error", async () => {
  const res = client.paymentIntent.create({
    amount: 10000,
    payment_method_allowed: ["card", "gcash"],
    // @ts-expect-error - test file
    currency: "USD",
  });

  await expect(res).rejects.toThrow();
});
