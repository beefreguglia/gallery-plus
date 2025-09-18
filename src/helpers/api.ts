import axios, { type AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const imagesApi = axios.create({
  baseURL: import.meta.env.VITE_IMAGES_URL,
});

export const fetcher = async (
  url: string,
  options: AxiosRequestConfig = {},
) => {
  return api.get(url, options).then((response) => response.data);
};
