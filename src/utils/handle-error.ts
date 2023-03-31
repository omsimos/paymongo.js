import { AxiosError } from "axios";
import { ZodError } from "zod";

export const handleError = (e: unknown) => {
  if (e instanceof AxiosError) {
    const errs = e.response?.data.errors;
    if (Array.isArray(errs) && errs.length > 0) {
      console.error(errs[0].detail);
      throw new Error(errs[0].detail);
    }

    console.error(JSON.stringify(e.response?.data, null, 2));
    throw new Error(e.response?.data);
  } else if (e instanceof ZodError) {
    if (e.errors.length > 0) {
      const msg = `${e.errors[0].message} for ${e.errors[0].path.join(", ")}`;
      console.error(msg);
      throw new Error(msg);
    }

    console.error(e.message);
    throw new Error(e.message);
  }

  const err = e as any;
  if (err.message) {
    console.error(err.message);
    throw new Error(err.message);
  }

  console.error(e);
  throw e;
};
