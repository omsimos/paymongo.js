import PaymongoClient, { PaymentIntentResponse } from "../src";

const SECRET_KEY = process.env.PM_SECRET_KEY as string;

describe("PaymentIntent", () => {
  let client: ReturnType<typeof PaymongoClient>;
  let intent: PaymentIntentResponse;

  beforeAll(async () => {
    client = PaymongoClient(SECRET_KEY);
    intent = await client.intent.create({
      amount: 100000,
    });
  });

  describe("can create a payment intent", () => {
    it("has correct amount", () => {
      expect(intent.data.attributes.amount).toBe(100000);
    });

    it("has correct resource type", () => {
      expect(intent.data.type).toBe("payment_intent");
    });

    it("is awaiting payment method", () => {
      expect(intent.data.attributes.status).toBe("awaiting_payment_method");
    });
  });

  describe("can retrieve a payment intent", () => {
    let retrieved: PaymentIntentResponse;

    beforeAll(async () => {
      retrieved = await client.intent.retrieve({
        intentId: intent.data.id,
      });
    });

    it("has correct amount", () => {
      expect(retrieved.data.attributes.amount).toBe(100000);
    });

    it("has correct resource type", () => {
      expect(retrieved.data.type).toBe("payment_intent");
    });

    it("is awaiting payment method", () => {
      expect(retrieved.data.attributes.status).toBe("awaiting_payment_method");
    });
  });
});
