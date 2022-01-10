import { CurrencyType, RedirectType, SourceType, StatusType, BillingType } from "../types";
export interface CreateSourceProps {
    amount: number;
    redirect: RedirectType;
    type: SourceType;
    currency: CurrencyType;
    billing?: BillingType;
}
export interface PaymentSourceResponse {
    data: {
        id: string;
        type: string;
        attributes: PaymentSourceAttributes;
    };
}
export interface PaymentSourceAttributes {
    amount: number;
    billing?: BillingType;
    currency: CurrencyType;
    description?: any;
    livemode: boolean;
    redirect: RedirectType;
    statement_descriptor?: any;
    status: StatusType;
    type: SourceType;
    created_at: number;
    updated_at: number;
}
export interface RetrieveSourceProps {
    sourceId: string;
}
