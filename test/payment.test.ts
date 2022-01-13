import PaymongoClient, { ListPaymentResponse } from "../src";

describe("PaymentIntent", () => {
  const OLD_ENV = process.env;
  let client: ReturnType<typeof PaymongoClient>;
  let SECRET_KEY = "";

  beforeAll(async () => {
    process.env = { ...OLD_ENV };
    SECRET_KEY = process.env.PM_SECRET_KEY as string;
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
});
