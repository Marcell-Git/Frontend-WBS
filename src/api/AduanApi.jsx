import useAxios from "./useAxios";

export const showAduanApi = async (page = 1) => {
  const response = await useAxios.get(`/aduan?page=${page}`);
  return response.data;
};

export const getsummaryAduanApi = async () => {
  const response = await useAxios.get('/aduan/summary');
  return response.data;
}

export const submitAduanApi = async (data) => {
  const response = await useAxios.post('/aduan', data);
  return response.data;
};