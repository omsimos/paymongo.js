# PayMongo API Reference

## All Available Endpoints

### Payment Intents
- POST /v1/payment_intents - Create Payment Intent
- GET /v1/payment_intents/{id} - Retrieve Payment Intent
- POST /v1/payment_intents/{id}/attach - Attach Payment Method
- POST /v1/payment_intents/{id}/capture - Capture Payment
- POST /v1/payment_intents/{id}/cancel - Cancel Payment Intent

### Payment Methods
- POST /v1/payment_methods - Create Payment Method
- GET /v1/payment_methods/{id} - Retrieve Payment Method

### Checkout Sessions
- POST /v1/checkout_sessions - Create Checkout Session
- GET /v1/checkout_sessions/{id} - Retrieve Checkout Session

### Payments
- POST /payments - Create Payment (legacy)
- GET /payments/{id} - Retrieve Payment

### Sources
- POST /v1/sources - Create Source
- GET /v1/sources/{id} - Retrieve Source

### Webhooks
- POST /v1/webhooks - Create Webhook
- GET /v1/webhooks - List Webhooks
- GET /v1/webhooks/{id} - Retrieve Webhook
- POST /v1/webhooks/{id}/disable - Disable Webhook
- POST /v1/webhooks/{id}/enable - Enable Webhook (implied)

### Payment Types
- card, gcash, paymaya, grab_pay, qrph, dob, brankas, billease, shopee_pay

### Webhook Events
- checkout_session.payment.paid
- source.chargeable
- payment.paid
- payment.failed
- payment.refunded
- payment.refund.updated
- link.payment.paid
- qrph.expired
- subscription.past_due
- subscription.unpaid
- subscription.updated
- subscription.invoice.created
- subscription.invoice.finalized
- subscription.invoice.paid
- subscription.invoice.payment_failed