# PayMongo API Reference - Complete

## Implemented Endpoints

### Payment Intents
- [x] POST /v1/payment_intents - Create Payment Intent
- [x] GET /v1/payment_intents/{id} - Retrieve Payment Intent
- [x] POST /v1/payment_intents/{id}/attach - Attach Payment Method
- [x] POST /v1/payment_intents/{id}/capture - Capture Payment
- [x] POST /v1/payment_intents/{id}/cancel - Cancel Payment Intent

### Payment Methods
- [x] POST /v1/payment_methods - Create Payment Method
- [x] GET /v1/payment_methods/{id} - Retrieve Payment Method

### Checkout Sessions
- [x] POST /v1/checkout_sessions - Create Checkout Session
- [x] GET /v1/checkout_sessions/{id} - Retrieve Checkout Session

### Payments
- [x] POST /payments - Create Payment (legacy)
- [x] GET /payments/{id} - Retrieve Payment
- [x] GET /payments - List Payments

### Sources
- [x] POST /v1/sources - Create Source
- [x] GET /v1/sources/{id} - Retrieve Source

### Webhooks
- [x] POST /v1/webhooks - Create Webhook
- [x] GET /v1/webhooks - List Webhooks
- [x] GET /v1/webhooks/{id} - Retrieve Webhook
- [x] POST /v1/webhooks/{id}/disable - Disable Webhook
- [x] POST /v1/webhooks/{id}/enable - Enable Webhook
- [x] PUT /v1/webhooks/{id} - Update Webhook

---

## Not Yet Implemented

### Customers (v2)
- [ ] POST /v2/customers - Create Customer
- [ ] GET /v2/customers - List Customers
- [ ] GET /v2/customers/{id} - Retrieve Customer
- [ ] PUT /v2/customers/{id} - Update Customer
- [ ] DELETE /v2/customers/{id} - Delete Customer

### Products
- [ ] POST /v1/products - Create Product
- [ ] GET /v1/products - List Products
- [ ] GET /v1/products/{id} - Retrieve Product
- [ ] PUT /v1/products/{id} - Update Product
- [ ] DELETE /v1/products/{id} - Delete Product

### Plans (Subscriptions)
- [ ] POST /v1/subscriptions/plans - Create Plan
- [ ] GET /v1/subscriptions/plans - List Plans
- [ ] GET /v1/subscriptions/plans/{id} - Retrieve Plan
- [ ] PUT /v1/subscriptions/plans/{id} - Update Plan

### Subscriptions
- [ ] POST /v1/subscriptions - Create Subscription
- [ ] GET /v1/subscriptions - List Subscriptions
- [ ] GET /v1/subscriptions/{id} - Retrieve Subscription
- [ ] POST /v1/subscriptions/{id}/cancel - Cancel Subscription
- [ ] PUT /v1/subscriptions/{id}/plan - Change Subscription Plan
- [ ] PUT /v1/subscriptions/{id}/payment_method - Change Payment Method

### Refunds
- [ ] POST /refunds - Create Refund
- [ ] GET /refunds - List Refunds
- [ ] GET /refunds/{id} - Retrieve Refund

### Transactions
- [ ] GET /transactions - List Transactions

### Fraud
- [ ] GET /v1/fraud/reviews - List Reviews

### Ledger/Resources
- [ ] GET /payments - List Payments with Ledger
- [ ] GET /v1/resources - List Resources

---

## Payment Types
- card, gcash, paymaya, grab_pay, qrph, dob, brankas, billease, shopee_pay

## Webhook Events
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