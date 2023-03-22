import { AxiosError } from "axios";
import { ZodError } from "zod";

export const handleError = (e: unknown) => {
  if (e instanceof AxiosError) {
    throw new Error(e.response?.data);
  } else if (e instanceof ZodError) {
    throw new Error(e.message);
  }
  throw e;
};
