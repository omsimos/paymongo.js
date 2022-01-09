import axios from "axios";
import config from "../config";
import { store } from "../store";

export const baseUrl = config.BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  responseType: "json",
});

store.subscribe((state) => {
  axiosInstance.defaults.auth = {
    username: state.secretKey,
    password: "",
  };
});

export default axiosInstance;
