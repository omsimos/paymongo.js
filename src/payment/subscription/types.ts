import type { MetaData } from "../types.js";

export interface SubscriptionCustomer {
  id: string;
  name: string;
  email: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  amount: number;
  currency: string;
  interval: number;
  interval_unit: string;
}

export interface SubscriptionAttributes {
  amount: number;
  currency: string;
  interval: number;
  interval_unit: string;
  start_at: number;
  end_at: number | null;
  customer: SubscriptionCustomer;
  plan: SubscriptionPlan;
  status: string;
  metadata?: MetaData;
  created_at: number;
  updated_at: number;
}

export interface SubscriptionData {
  id: string;
  type: string;
  attributes: SubscriptionAttributes;
}

export interface SubscriptionResponse {
  data: SubscriptionData;
}

export interface CreateSubscriptionProps {
  customerId: string;
  planId: string;
}

export interface ListSubscriptionProps {
  limit?: number;
  after?: string;
  before?: string;
  customerId?: string;
  planId?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface ListSubscriptionResponse {
  has_more: boolean;
  limit: number;
  data: SubscriptionData[];
}

export interface CancelSubscriptionProps {
  cancellationReason: "too_expensive" | "missing_features" | "switched_service" | "unused" | "other";
}

export interface ChangeSubscriptionPlanProps {
  planId: string;
}

export interface ChangeSubscriptionPaymentMethodProps {
  paymentMethodId: string;
  redirectUrl?: string;
}