import useAxios from "./useAxios";

export const showODPApi = async () => {
    const response = await useAxios.get('/odp');
    return response.data;
};