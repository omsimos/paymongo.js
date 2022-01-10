import PaymongoClient, { PaymentWebhookResponse } from "../src";
import { SECRET_KEY, WEBHOOK_ID } from "./keys";

describe("PaymentWebhook", () => {
  let client: ReturnType<typeof PaymongoClient>;
  let webhook: PaymentWebhookResponse;

  beforeAll(async () => {
    client = PaymongoClient(SECRET_KEY);
    webhook = await client.retrieveWebhook(WEBHOOK_ID);
    await client.enableWebhook(WEBHOOK_ID);
    await client.updateWebhook({
      webhookId: WEBHOOK_ID,
      events: ["payment.failed", "payment.paid", "source.chargeable"],
    });
  });

  afterAll(async () => {
    await client.updateWebhook({
      webhookId: WEBHOOK_ID,
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
      const hook = await client.disableWebhook(WEBHOOK_ID);
      expect(hook.data.attributes.status).toBe("disabled");
    });

    it("can enable", async () => {
      const hook = await client.enableWebhook(WEBHOOK_ID);
      expect(hook.data.attributes.status).toBe("enabled");
    });
  });

  describe("can update webhook", () => {
    it("can update events", async () => {
      const hook = await client.updateWebhook({
        webhookId: WEBHOOK_ID,
        events: ["payment.failed"],
      });
      expect(hook.data.attributes.events).toHaveLength(1);
      expect(hook.data.attributes.events).toContain("payment.failed");
    });
  });
});