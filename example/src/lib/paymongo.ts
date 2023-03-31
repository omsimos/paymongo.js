import { createPaymongoClient } from "paymongo.js";
import { env } from "~/env.mjs";

export default createPaymongoClient(env.PAYMONGO_SECRET_KEY);
export * from "paymongo.js";
