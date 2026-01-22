import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

let accessToken = null;

export const setAxiosToken = (token) => {
  accessToken = token;
};

const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const getFileUrl = (filePath) => {
  if (!filePath) return "";
  return `${BASE_URL}/storage/${filePath}`;
};


useAxios.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default useAxios;
