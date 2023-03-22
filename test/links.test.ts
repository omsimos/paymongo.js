import "dotenv/config";
import { it, expect, describe } from "vitest";
import { createPaymongoClient } from "../src";

const key = process.env.PM_SECRET_KEY as string;
const client = createPaymongoClient(key);

describe("create payment link", () => {
  it("can create a payment link", async () => {
    const res = await client.links.create({
      amount: 10000,
      description: "vitest - link create",
    });
    console.log(JSON.stringify(res, null, 2));
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
  /* it("can retrieve payment link", async () => {}); */
  /* it("rejects on not found", async () => {}); */
});
