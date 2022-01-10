import { CurrencyType, RedirectType, SourceType, StatusType } from "../types";
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
        attributes: CreateSourceAttributes;
    };
}
export interface CreateSourceAttributes {
    amount: number;
    billing?: BillingProps;
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
export interface BillingProps {
    name?: string;
    phone?: string;
    email?: string;
    address?: AddressType;
}
export declare type AddressType = {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    country?: string;
};
export interface RetrieveSourceProps {
    sourceId: string;
}
export interface RetrieveSourceResponse {
    data: {
        id: string;
        type: string;
        attributes: RetrieveSourceAttributes;
    };
}
export interface RetrieveSourceAttributes {
    amount: number;
    billing?: BillingProps;
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
