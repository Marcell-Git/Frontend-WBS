import useAxios from "./useAxios";

export const showAduanApi = async (search, page) => {
  const response = await useAxios.get('/aduan', {
    params: {
      search,
      page,
    },
  });
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

export const detailAduanApi = async (id) => {
  const response = await useAxios.get(`/aduan/detail/${id}`);
  return response.data;
};

export const updateStatusAduanApi = async (id, status_aduan) => {
  const response = await useAxios.put(`/aduan/${id}/status`, { status_aduan });
  return response.data;
};

export const lacakAduanApi = async (kode_laporan) => {
  const response = await useAxios.get(`/aduan/search/${kode_laporan}`);
  return response.data;
}