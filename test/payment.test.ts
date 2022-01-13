import PaymongoClient, { ListPaymentResponse, PaymentResponse } from "../src";

describe("Payment", () => {
  const OLD_ENV = process.env;
  let client: ReturnType<typeof PaymongoClient>;
  let SECRET_KEY = "";
  let PAYMENT_ID = "";

  beforeAll(async () => {
    process.env = { ...OLD_ENV };
    SECRET_KEY = process.env.PM_SECRET_KEY as string;
    PAYMENT_ID = process.env.PM_PAYMENT_ID as string;
    client = PaymongoClient(SECRET_KEY);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("can list payments", () => {
    let retrieved: ListPaymentResponse;

    beforeAll(async () => {
      retrieved = await client.payment.list();
    });

    it("has more", () => {
      expect(retrieved.has_more).toBe(true);
    });

    it("is not null", () => {
      expect(retrieved.data).not.toBeNull();
    });
  });

  describe("can retrieve a payment", () => {
    let retrieved: PaymentResponse;

    beforeAll(async () => {
      retrieved = await client.payment.retrieve(PAYMENT_ID);
    });

    it("has correct amount", () => {
      expect(retrieved.data.attributes.amount).toBe(10000);
    });

    it("has correct resource type", () => {
      expect(retrieved.data.type).toBe("payment");
    });

    it("has correct source type", () => {
      expect(retrieved.data.attributes.source.type).toBe("card");
    });

    it("is paid", () => {
      expect(retrieved.data.attributes.status).toBe("paid");
    });
  });
});
