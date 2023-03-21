import "dotenv/config";
import { createPaymongoClient } from "../src";
import { test, expect } from "vitest";

test("yeet", async () => {
  const key = process.env.PM_SECRET_KEY as string;
  const client = createPaymongoClient(key);
  const res = await client.paymentIntent.create();
  expect(res).toEqual("hello world");
});
