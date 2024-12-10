import axios, { CancelTokenSource } from "axios";

const defaultOptions = {
  baseURL: import.meta.env.VITE_API_URL || "https://localhost:7061",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const api = axios.create(defaultOptions);

api.interceptors.request.use((config) => {
  // auth token can be added here

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;

export const createCancelToken = (): CancelTokenSource =>
  axios.CancelToken.source();
