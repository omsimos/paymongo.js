import api from "../../utils/api-base";
import { PaymentType } from "../types";

export interface CreatePaymentIntentProps {
  amount: number;
  paymentMethodAllowed?: PaymentType[];
  paymentMethodOptions?: {
    request3DS: "any" | "automatic";
  };
  currency?: string;
  description?: string;
  statementDescriptor?: string;
  metadata?: {
    [key: string]: string;
  };
}

const defaultProps: CreatePaymentIntentProps = {
  amount: 0,
  paymentMethodAllowed: ["card", "paymaya"],
  currency: "PHP",
  paymentMethodOptions: {
    request3DS: "any",
  },
  description: "",
  statementDescriptor: "",
  metadata: {},
};

export const createPaymentIntent = async ({
  amount = defaultProps.amount,
  currency = defaultProps.currency,
  paymentMethodAllowed = defaultProps.paymentMethodAllowed,
  paymentMethodOptions = defaultProps.paymentMethodOptions,
  description = defaultProps.description,
  statementDescriptor = defaultProps.statementDescriptor,
  metadata = defaultProps.metadata,
}: CreatePaymentIntentProps) => {
  const data = {
    attributes: {
      amount,
      payment_method_allowed: paymentMethodAllowed,
      payment_method_options: {
        card: {
          request_three_d_secure: paymentMethodOptions?.request3DS,
        },
      },
      currency,
      description,
      statement_descriptor: statementDescriptor,
      metadata: {
        ...metadata,
      },
    },
  };

  try {
    const res = await api.post("/payment_intents", data);
    return res.data;
  } catch (err) {
    return err;
  }
};
