import PaymongoClient, { PaymentWebhookResponse } from "../src";

const SECRET_KEY = process.env.PM_SECRET_KEY as string;
const WEBHOOK_ID = process.env.PM_WEBHOOK_ID as string;

describe("PaymentWebhook", () => {
  let client: ReturnType<typeof PaymongoClient>;
  let webhook: PaymentWebhookResponse;

  beforeAll(async () => {
    client = PaymongoClient(SECRET_KEY);
    webhook = await client.webhook.retrieve(WEBHOOK_ID);
    await client.webhook.enable(WEBHOOK_ID);
    await client.webhook.update({
      webhookId: WEBHOOK_ID,
      events: ["payment.failed", "payment.paid", "source.chargeable"],
    });
  });

  afterAll(async () => {
    await client.webhook.update({
      webhookId: WEBHOOK_ID,
      events: ["payment.failed", "payment.paid", "source.chargeable"],
    });
  });

  describe("can retrieve a payment webhook", () => {
    it("has correct url", () => {
      expect(webhook.data.attributes.url).toBe(
        "http://localhost:3000/payments/webhook"
      );
    });

    it("has correct events", () => {
      expect(webhook.data.attributes.events).toHaveLength(3);
      expect(webhook.data.attributes.events).toContain("payment.failed");
      expect(webhook.data.attributes.events).toContain("payment.paid");
      expect(webhook.data.attributes.events).toContain("source.chargeable");
    });
  });

  // Paymongo issue stuck on: "Webhook with id hook<WEBHOOK_ID> is still being processed."
  // describe("can disable then enable webhook", () => {
  //   it("can disabled", async () => {
  //     const hook = await client.disableWebhook(WEBHOOK_ID);
  //     expect(hook.data.attributes.status).toBe("disabled");
  //   });
  //   it("can enable", async () => {
  //     const hook = await client.enableWebhook(WEBHOOK_ID);
  //     expect(hook.data.attributes.status).toBe("enabled");
  //   });
  // });
  // describe("can update webhook", () => {
  //   it("can update events", async () => {
  //     const hook = await client.updateWebhook({
  //       webhookId: WEBHOOK_ID,
  //       events: ["payment.failed"],
  //     });
  //     console.log(hook);
  //     expect(hook.data.attributes.events).toHaveLength(1);
  //     expect(hook.data.attributes.events).toContain("payment.failed");
  //   });
  // });
});
