const now = new Date();

const exp_month = now.getMonth();
const exp_year = now.getFullYear() + 2;
const rest = { exp_month, exp_year, cvc: "123" };

export const testCards = {
  visa: {
    card_number: "4343434343434345",
    ...rest,
  },
  expired: {
    card_number: "4200000000000018",
    ...rest,
  },
  cvc_invalid: {
    card_number: "4300000000000017",
    ...rest,
  },
};
