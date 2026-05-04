import axios from "axios";

export const THREE_MINUTES = 3 * 60 * 1000;

export const httpClient = axios.create({
  timeout: THREE_MINUTES,
});
