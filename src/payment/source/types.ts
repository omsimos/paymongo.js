import { CurrencyType, RedirectType, SourceType } from "../types";

export interface CreateSourceProps {
  amount: number;
  redirect: RedirectType;
  type: SourceType;
  currency: CurrencyType;
  billing?: BillingProps;
}
export interface CreateSourceResponse {
  data: {
    id: string;
    type: string;
    attributes: {
      amount: number;
      billing?: any;
      currency: CurrencyType;
      description?: any;
      livemode: boolean;
      redirect: RedirectType;
      statement_descriptor?: any;
      status: string;
      type: SourceType;
      created_at: number;
      updated_at: number;
    };
  };
}

export interface BillingProps {
  name?: string;
  phone?: string;
  email?: string;
  address?: AddressType;
}

export type AddressType = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
};
