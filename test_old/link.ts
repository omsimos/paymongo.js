import PaymongoClient, { PaymentLinkData, PaymentLinkResponse } from "../src";

describe("PaymentLink", () => {
  const OLD_ENV = process.env;
  let client: ReturnType<typeof PaymongoClient>;
  let SECRET_KEY = "";
  let LINK_ID = "";
  let LINK_REF = "";

  beforeAll(async () => {
    process.env = { ...OLD_ENV };
    SECRET_KEY = process.env.PM_SECRET_KEY as string;
    LINK_ID = process.env.PM_LINK_ID as string;
    LINK_REF = process.env.PM_LINK_REF as string;
    client = PaymongoClient(SECRET_KEY);
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  // it("can create a payment method", async () => {
  //   const link = await client.link.create({
  //     amount: 10000,
  //     description: "Test payment link",
  //   });

  //   expect(link.data.attributes.amount).toBe(10000);
  //   expect(link.data.attributes.description).toBe("Test payment link");
  // });

  describe("can retrieve a payment link", () => {
    let retrieved: PaymentLinkResponse;

    beforeAll(async () => {
      retrieved = await client.link.retrieve(LINK_ID);
    });

    it("has correct resource type", () => {
      expect(retrieved.data.type).toBe("link");
    });

    it("has correct attributes", () => {
      expect(retrieved.data.attributes.amount).toBe(12000);
      expect(retrieved.data.attributes.currency).toBe("PHP");
      expect(retrieved.data.attributes.description).toBe("test description");
      expect(retrieved.data.attributes.livemode).toBe(false);
      expect(retrieved.data.attributes.reference_number).toBe("D5f52ak");
    });
  });

  describe("can retrieve from reference number", () => {
    let retrieved: PaymentLinkData;

    beforeAll(async () => {
      retrieved = (await client.link.retrieveFromRef(LINK_REF)).data[0];
    });

    it("has correct resource type", () => {
      expect(retrieved.type).toBe("link");
    });

    it("has correct attributes", () => {
      expect(retrieved.attributes.amount).toBe(12000);
      expect(retrieved.attributes.currency).toBe("PHP");
      expect(retrieved.attributes.description).toBe("test description");
      expect(retrieved.attributes.livemode).toBe(false);
      expect(retrieved.attributes.reference_number).toBe("D5f52ak");
    });
  });
});
