import PaymongoClient, { PaymentWebhookResponse } from "../src";

describe("PaymentWebhook", () => {
  let client: ReturnType<typeof PaymongoClient>;
  let webhook: PaymentWebhookResponse;

  beforeAll(async () => {
    client = PaymongoClient(process.env.SECRET_KEY as string);
    webhook = await client.retrieveWebhook(process.env.WEBHOOK_ID as string);
    await client.enableWebhook(process.env.WEBHOOK_ID as string);
    await client.updateWebhook({
      webhookId: process.env.WEBHOOK_ID as string,
      events: ["payment.failed", "payment.paid", "source.chargeable"],
    });
  });

  afterAll(async () => {
    await client.updateWebhook({
      webhookId: process.env.WEBHOOK_ID as string,
      events: ["payment.failed", "payment.paid", "source.chargeable"],
    });
  });

  describe("can retrieve a payment webhook", () => {
    it("has correct url", () => {
      expect(webhook.data.attributes.url).toBe("http://example.com/webhook");
    });

    it("has correct events", () => {
      expect(webhook.data.attributes.events).toHaveLength(3);
      expect(webhook.data.attributes.events).toContain("payment.failed");
      expect(webhook.data.attributes.events).toContain("payment.paid");
      expect(webhook.data.attributes.events).toContain("source.chargeable");
    });
  });

  describe("can disable then enable webhook", () => {
    it("can disabled", async () => {
      const hook = await client.disableWebhook(
        process.env.WEBHOOK_ID as string
      );
      expect(hook.data.attributes.status).toBe("disabled");
    });

    it("can enable", async () => {
      const hook = await client.enableWebhook(process.env.WEBHOOK_ID as string);
      expect(hook.data.attributes.status).toBe("enabled");
    });
  });

  describe("can update webhook", () => {
    it("can update events", async () => {
      const hook = await client.updateWebhook({
        webhookId: process.env.WEBHOOK_ID as string,
        events: ["payment.failed"],
      });
      expect(hook.data.attributes.events).toHaveLength(1);
      expect(hook.data.attributes.events).toContain("payment.failed");
    });
  });
});
