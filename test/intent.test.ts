import "dotenv/config";
import { it, expect, describe } from "vitest";
import { createPaymongoClient } from "../src";
import { testCards } from "./utils";

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

describe("attach payment intent", () => {
  it("can attach to gcash payment intent", async () => {
    const intent = await client.intent.create({
      amount: 10000,
      payment_method_allowed: ["gcash"],
      currency: "PHP",
      description: "vitest - gcash",
    });

    const method = await client.method.create({
      type: "gcash",
    });

    const res = await client.intent.attach({
      intentId: intent.data.id,
      methodId: method.data.id,
      return_url: "https://example.com/success",
    });

    expect(res.data.id).toEqual(intent.data.id);
    expect(res.data.attributes.next_action?.type).toEqual("redirect");
    expect(res.data.attributes.next_action?.redirect).toBeDefined();
  });

  it("can attach to card payment intent", async () => {
    const intent = await client.intent.create({
      amount: 10000,
      payment_method_allowed: ["card"],
      currency: "PHP",
      description: "vitest - card",
    });

    const method = await client.method.create({
      type: "card",
      details: testCards.visa,
    });

    const res = await client.intent.attach({
      intentId: intent.data.id,
      methodId: method.data.id,
    });

    expect(res.data.id).toEqual(intent.data.id);
    expect(res.data.attributes.payments).toBeDefined();
  });

  it("can attach to dob payment intent", async () => {
    const intent = await client.intent.create({
      amount: 10000,
      payment_method_allowed: ["dob"],
      currency: "PHP",
      description: "vitest - dob",
    });

    const method = await client.method.create({
      type: "dob",
      details: { ...testCards.visa, bank_code: "bpi" },
    });

    const res = await client.intent.attach({
      intentId: intent.data.id,
      methodId: method.data.id,
      return_url: "https://example.com/success",
    });

    expect(res.data.id).toEqual(intent.data.id);
    expect(res.data.attributes.next_action?.type).toEqual("redirect");
    expect(res.data.attributes.next_action?.redirect).toBeDefined();
  });

  it("rejects on zod error", async () => {
    const res = client.intent.attach({
      intentId: pi,
      // @ts-expect-error - test file
      methodId: 123,
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
