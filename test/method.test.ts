import "dotenv/config";
import { it, expect, describe } from "vitest";
import { createPaymongoClient } from "../src";
import { testCards } from "./utils";

const key = process.env.PM_SECRET_KEY as string;
const client = createPaymongoClient(key);

let pm = "";

describe("create payment method", () => {
  it("can create gcash payment method", async () => {
    const res = await client.method.create({
      type: "gcash",
    });
    pm = res.data.id;
    expect(res.data.type).toEqual("payment_method");
    expect(res.data.attributes.type).toEqual("gcash");
  });

  it("can create card payment", async () => {
    const res = await client.method.create({
      type: "card",
      details: testCards.visa,
    });
    expect(res.data.type).toEqual("payment_method");
    expect(res.data.attributes.type).toEqual("card");
  });

  it("can create dob payment", async () => {
    const res = await client.method.create({
      type: "dob",
      details: { ...testCards.visa, bank_code: "bpi" },
    });
    expect(res.data.type).toEqual("payment_method");
    // @ts-expect-error - test file
    expect(res.data.attributes.details.provider).toEqual("bpi");
    expect(res.data.attributes.type).toEqual("dob");
  });

  it("can retrieve billing", async () => {
    const billing = {
      name: "John Doe",
      email: "john@email.com",
      phone: "+639999999999",
      address: {
        city: "Manila",
        line1: "line 1",
        line2: "line 2",
        state: "Metro Manila",
        country: "PH",
        postal_code: "1000",
      },
    };
    const res = await client.method.create({
      type: "gcash",
      billing,
    });
    expect(res.data.type).toEqual("payment_method");
    expect(res.data.attributes.type).toEqual("gcash");
    expect(res.data.attributes.billing).toEqual(billing);
  });

  it("rejects on zod error", async () => {
    const res = client.method.create({
      // @ts-expect-error - test file
      type: "invalid",
    });

    await expect(res).rejects.toThrow();
  });
});

describe("retrieve payment method", () => {
  it("can retrieve payment method", async () => {
    const res = await client.method.retrieve({
      methodId: pm,
    });
    expect(res.data.id).toEqual(pm);
  });

  it("rejects on not found", async () => {
    const methodId = "does-not-exist";
    const res = client.method.retrieve({
      methodId,
    });
    await expect(res).rejects.toThrow();
  });
});
