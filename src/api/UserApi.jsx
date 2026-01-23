import useAxios from './useAxios';

export const showUserApi = async (search, page) => {
  const response = await useAxios.get('/users', {
    params: {
      search,
      page,
    },
  });
  return response.data;
};

export const detailUserApi = async (id_user) => {
  console.log('API received id:', id_user);

  const response = await useAxios.get(`/users/${id_user}`);
  return response.data;
};

export const updatePasswordApi = async (id_user, data) => {
  const response = await useAxios.put(`/users/${id_user}`, { data });
  return response.data;
};
