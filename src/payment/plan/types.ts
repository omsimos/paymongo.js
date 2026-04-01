import type { MetaData } from "../types.js";

export type PlanType = "scheduled" | "on_demand";
export type PlanInterval = "weekly" | "monthly" | "yearly";

export interface CreatePlanProps {
  name: string;
  amount: number;
  currency?: string;
  description?: string;
  interval: PlanInterval;
  intervalCount: number;
  type?: PlanType;
  cycleCount?: number;
  metadata?: MetaData;
}

export interface PlanAttributes {
  id: string;
  name: string;
  amount: number;
  currency: string;
  description?: string;
  type: PlanType;
  interval: PlanInterval;
  interval_count: number;
  cycle_count?: number;
  metadata?: MetaData;
  created_at: number;
  updated_at: number;
}

export interface PlanData {
  id: string;
  type: string;
  attributes: PlanAttributes;
}

export interface PlanResponse {
  data: PlanData;
}

export interface ListPlanProps {
  limit?: number;
  page?: number;
}

export interface ListPlanResponse {
  has_more: boolean;
  limit: number;
  page: number;
  data: PlanData[];
}

export interface UpdatePlanProps {
  name?: string;
  amount?: number;
  description?: string;
  metadata?: MetaData;
}