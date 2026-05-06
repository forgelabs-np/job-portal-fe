import axios from "axios";

const THREE_MINUTES = 3 * 60 * 1000;
export const baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT;

const httpClient = axios.create({
  baseURL,
  timeout: THREE_MINUTES,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export { httpClient };
