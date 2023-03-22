import { AxiosError } from "axios";
import { ZodError } from "zod";

export const withError = <T extends (...args: any[]) => any>(
  fn: T
): ((...funcArgs: Parameters<T>) => ReturnType<T>) => {
  return (...args: Parameters<T>) => {
    try {
      return fn(...args);
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.data);
      } else if (e instanceof ZodError) {
        throw new Error(e.message);
      }
      throw e;
    }
  };
};
