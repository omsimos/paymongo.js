import "dotenv/config";
import { it, expect, describe } from "vitest";
import { createPaymongoClient } from "../src";

const key = process.env.PM_SECRET_KEY as string;
const client = createPaymongoClient(key);

let pi = "";

describe("create payment intent", () => {
  it("can create payment intent", async () => {
    const res = await client.intent.create({
      amount: 10000,
      payment_method_allowed: ["card", "gcash"],
      currency: "PHP",
    });
    pi = res.data.id;
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

describe("retrieve payment intent", () => {
  it("can retrieve payment intent", async () => {
    const res = await client.intent.retrieve({
      intentId: pi,
    });
    expect(res.data.id).toEqual(pi);
  });

  it("rejects on not found", async () => {
    const intentId = "does-not-exist";
    const res = client.intent.retrieve({
      intentId,
    });
    await expect(res).rejects.toThrow();
  });
});
