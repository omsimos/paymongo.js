import api from "../../utils/api-base";
import { PaymentLinkResponse, CreatePaymentLinkProps } from "./types";

export const createPaymentLink = async ({
  amount,
  description,
  remarks,
}: CreatePaymentLinkProps): Promise<PaymentLinkResponse> => {
  const data: any = {
    attributes: {
      amount,
      description,
    },
  };

  if (remarks) data.attributes.remarks = remarks;

  try {
    const res = await api.post("/links", data);
    return res.data;
  } catch (err) {
    const error: any = err;
    return error.response.data;
  }
};
