import axios from "axios";

const BASE_URL = "https://api.paymongo.com/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});
