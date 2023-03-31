import { z } from "zod";

export const methodTypeSchema = z.enum([
  "atome",
  "card",
  "dob",
  "paymaya",
  "billease",
  "gcash",
  "grab_pay",
]);
