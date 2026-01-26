import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8000";

let accessToken = null;

export const setAxiosToken = (token) => {
  if (token) {
    useAxios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete useAxios.defaults.headers.common.Authorization;
  }
};

const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const getFileUrl = (filePath) => {
  if (!filePath) return "";
  return `${BASE_URL}/storage/${filePath}`;
};


useAxios.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);

export default useAxios;
