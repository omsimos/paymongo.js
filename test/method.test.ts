import PaymongoClient, { PaymentMethodResponse } from "../src";

describe("PaymentMethod", () => {
  const OLD_ENV = process.env;
  let client: ReturnType<typeof PaymongoClient>;
  let method: PaymentMethodResponse;
  let SECRET_KEY = "";

  beforeAll(async () => {
    process.env = { ...OLD_ENV };
    SECRET_KEY = process.env.PM_SECRET_KEY as string;
    client = PaymongoClient(SECRET_KEY);
    method = await client.method.create({
      details: {
        cardNumber: "4343434343434345",
        expMonth: 3,
        expYear: 2023,
        cvc: "321",
      },
      type: "card",
    });
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("can create a payment method", () => {
    it("has correct details", () => {
      expect(method.data.attributes.details.last4).toBe("4345");
      expect(method.data.attributes.details.exp_month).toBe(3);
      expect(method.data.attributes.details.exp_year).toBe(2023);
    });

    it("has correct resource type", () => {
      expect(method.data.type).toBe("payment_method");
    });

    it("is a card method", () => {
      expect(method.data.attributes.type).toBe("card");
    });
  });

  describe("can retrieve a payment method", () => {
    let retrieved: PaymentMethodResponse;

    beforeAll(async () => {
      retrieved = await client.method.retrieve(method.data.id);
    });

    it("has correct details", () => {
      expect(retrieved.data.attributes.details.last4).toBe("4345");
      expect(retrieved.data.attributes.details.exp_month).toBe(3);
      expect(retrieved.data.attributes.details.exp_year).toBe(2023);
    });

    it("has correct resource type", () => {
      expect(retrieved.data.type).toBe("payment_method");
    });

    it("is a card method", () => {
      expect(retrieved.data.attributes.type).toBe("card");
    });
  });
});
