// intent
export * from "./intent/types";

// method
export * from "./method/types";

// general types
export type MetaData = {
  [key: string]: string;
};

export type PaymentType = "card" | "paymaya" | string;
export type SourceType = "gcash" | "grab_pay" | string;
export type CurrencyType = "PHP";
export type RedirectType = {
  success: string;
  failed: string;
  checkout_url?: string;
};
export type StatusType = "pending" | "paid" | string; // remove string later
