import "dotenv/config";
import { it, expect, describe } from "vitest";
import { createPaymongoClient } from "../src";
import { testCards } from "./utils";

const key = process.env.PM_SECRET_KEY as string;
const client = createPaymongoClient(key);

describe("create payment method", () => {
  it("can create gcash payment method", async () => {
    const res = await client.method.create({
      type: "gcash",
    });
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

  it("rejects on zod error", async () => {
    const res = client.method.create({
      // @ts-expect-error - test file
      type: "invalid",
    });

    await expect(res).rejects.toThrow();
  });
});

/* describe.skip("retrieve payment method", () => { */
/*   it("can retrieve payment intent", async () => { */
/*     const intentId = "pi_uP9jFcxB916dPGrhFURfbfVX"; */
/*     const res = await client.intent.retrieve({ */
/*       intentId: intentId, */
/*     }); */
/*     expect(res.data.id).toEqual(intentId); */
/*   }); */
/**/
/*   it("rejects on not found", async () => { */
/*     const intentId = "does-not-exist"; */
/*     const res = client.intent.retrieve({ */
/*       intentId: intentId, */
/*     }); */
/*     await expect(res).rejects.toThrow(); */
/*   }); */
/* }); */
