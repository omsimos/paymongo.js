import type { MetaData } from "../types.js";

export interface CustomerAddress {
  city?: string;
  country?: string;
  line1?: string;
  line2?: string;
  postal_code?: string;
  state?: string;
}

export interface CustomerShipping {
  first_name?: string;
  last_name?: string;
  phone?: string;
  address?: CustomerAddress;
}

export interface CreateCustomerProps {
  name: string;
  mobilePhone?: string;
  email?: string;
  address?: CustomerAddress;
  shipping?: CustomerShipping;
  metadata?: MetaData;
}

export interface CustomerAttributes {
  customer_id: string;
  name: string;
  mobile_phone?: string;
  email?: string;
  address?: CustomerAddress;
  live_mode: boolean;
  primary_shipping_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerData {
  id: string;
  type: string;
  attributes: CustomerAttributes;
}

export interface CustomerResponse {
  data: CustomerData;
}

export interface ListCustomerProps {
  limit?: number;
  page?: number;
}

export interface ListCustomerResponse {
  has_more: boolean;
  limit: number;
  page: number;
  total_count: number;
  data: CustomerData[];
}

export interface UpdateCustomerProps {
  name?: string;
  mobilePhone?: string;
  email?: string;
  address?: CustomerAddress;
  shipping?: CustomerShipping;
  metadata?: MetaData;
}