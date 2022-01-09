import api from "../../utils/api-base";

/**
 * @typedef {Object} CreatePaymentIntentProps
 * @property {string} id - The id of the payment intent.
 * @property {string} clientKey - The client key of the payment intent.
 */
export interface RetrievePaymentIntentProps {
  id: string;
  clientKey?: string;
}

export const retrievePaymentIntent = async ({
  id,
  clientKey,
}: RetrievePaymentIntentProps) => {
  try {
    let url = `/payment_intents/${id}`;
    if (clientKey) url = `${url}?client_key=${clientKey}`;
    const res = await api.get(url);
    return res.data;
  } catch (err) {
    return err.response.data;
  }
};
