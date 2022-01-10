import { MetaData } from "../types";

export interface PMDetails {
  card_number: string;
  exp_month: number;
  exp_year: number;
  cvc: string;
}

export interface PMAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface PMBilling {
  address: PMAddress;
  name: string;
  email: string;
  phone: string;
}

export interface PMAttributes {
  details: PMDetails;
  type: string;
  billing?: PMBilling;
  metadata?: MetaData;
}

export interface PMData {
  attributes: PMAttributes;
}

export interface PMCreatePaymentMethodProps {
  data: PMData;
}
