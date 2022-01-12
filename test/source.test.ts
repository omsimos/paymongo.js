import PaymongoClient, { PaymentSourceResponse } from "../src";

const successUrl = "http://localhost:3000/gcash/success";
const failedUrl = "http://localhost:3000/gcash/failed";

describe("PaymentSource", () => {
  const OLD_ENV = process.env;
  let client: ReturnType<typeof PaymongoClient>;
  let source: PaymentSourceResponse;
  let SECRET_KEY = "";

  beforeAll(async () => {
    process.env = { ...OLD_ENV };
    SECRET_KEY = process.env.PM_SECRET_KEY as string;
    client = PaymongoClient(SECRET_KEY);
    source = await client.source.create({
      amount: 10000,
      currency: "PHP",
      redirect: {
        failed: failedUrl,
        success: successUrl,
      },
      type: "gcash",
    });
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  describe("can create a payment source", () => {
    it("has correct amount", () => {
      expect(source.data.attributes.amount).toBe(10000);
    });

    it("has correct currency", () => {
      expect(source.data.attributes.currency).toBe("PHP");
    });

    it("has correct resource type", () => {
      expect(source.data.type).toBe("source");
    });

    it("has correct payment type", () => {
      expect(source.data.attributes.type).toBe("gcash");
    });

    it("is pending", () => {
      expect(source.data.attributes.status).toBe("pending");
    });

    it("has correct success redirect", () => {
      expect(source.data.attributes.redirect.success).toBe(successUrl);
    });

    it("has correct failed redirect", () => {
      expect(source.data.attributes.redirect.failed).toBe(failedUrl);
    });
  });

  describe("can retrieve a payment source", () => {
    let retrieved: PaymentSourceResponse;

    beforeAll(async () => {
      retrieved = await client.source.retrieve(source.data.id);
    });

    it("has correct amount", () => {
      expect(retrieved.data.attributes.amount).toBe(10000);
    });

    it("has correct currency", () => {
      expect(retrieved.data.attributes.currency).toBe("PHP");
    });

    it("has correct resource type", () => {
      expect(retrieved.data.type).toBe("source");
    });

    it("has correct payment type", () => {
      expect(retrieved.data.attributes.type).toBe("gcash");
    });

    it("is pending", () => {
      expect(retrieved.data.attributes.status).toBe("pending");
    });

    it("has correct success redirect", () => {
      expect(retrieved.data.attributes.redirect.success).toBe(successUrl);
    });

    it("has correct failed redirect", () => {
      expect(retrieved.data.attributes.redirect.failed).toBe(failedUrl);
    });
  });
});
