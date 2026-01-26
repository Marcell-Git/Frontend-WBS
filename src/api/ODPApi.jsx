import useAxios from "./useAxios";

export const showODPApi = async (search, page) => {
    const response = await useAxios.get('/odp', {
        params: {
            search,
            page,
        },
    });
    return response.data;
};

export const createODPApi = async (data) => {
    const response = await useAxios.post('/odp', data);
    return response.data;
};

export const deleteODPApi = async (id) => {
    const response = await useAxios.delete(`/odp/${id}`);
    return response.data;
};