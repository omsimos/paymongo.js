import "dotenv/config";
import { createPaymongoClient } from "../src";
import { it, expect, describe } from "vitest";

const key = process.env.PM_SECRET_KEY as string;
const client = createPaymongoClient(key);

describe.skip("create payment intent", () => {
  it("can create payment intent", async () => {
    const res = await client.intent.create({
      amount: 10000,
      payment_method_allowed: ["card", "gcash"],
      currency: "PHP",
    });
    expect(res.data.type).toEqual("payment_intent");
    expect(res.data.attributes.amount).toEqual(10000);
  });

  it("rejects on zod error", async () => {
    const res = client.intent.create({
      amount: 10000,
      payment_method_allowed: ["card", "gcash"],
      // @ts-expect-error - test file
      currency: "USD",
    });

    await expect(res).rejects.toThrow();
  });
});

describe.skip("retrieve payment intent", () => {
  it("can retrieve payment intent", async () => {
    const intentId = "pi_uP9jFcxB916dPGrhFURfbfVX";
    const res = await client.intent.retrieve({
      paymentIntentId: intentId,
    });
    expect(res.data.id).toEqual(intentId);
  });

  it("rejects on not found", async () => {
    const intentId = "does-not-exist";
    const res = client.intent.retrieve({
      paymentIntentId: intentId,
    });
    await expect(res).rejects.toThrow();
  });
});
