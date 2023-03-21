import { api } from "../base";

export const createPaymentIntent = async () => {
  const res = await api.post("/payment_intents", {
    data: {
      attributes: {
        amount: 10000,
        payment_method_allowed: [
          "atome",
          "card",
          "dob",
          "paymaya",
          "billease",
          "gcash",
          "grab_pay",
        ],
        payment_method_options: {
          card: {
            request_three_d_secure: "any",
          },
        },
        currency: "PHP",
        capture_type: "automatic",
      },
    },
  });
  console.log(res.data);
  return "hello world";
};
