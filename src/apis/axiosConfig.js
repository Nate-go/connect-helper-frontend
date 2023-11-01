import axios from "axios";
import { errorHandler, successHandler } from "./axiosHandler";
import { getAuthentication } from "@/helpers/authenHelpers";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "content-type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getAuthentication()?.access_token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return successHandler(response);
  },
  (error) => {
    return errorHandler(error);
  }
);

export default api;
