import useAxios from "./useAxios";

export const showKategoriAduanApi = async () => {
    const response = await useAxios.get('/kategori-aduan');
    return response.data;
};