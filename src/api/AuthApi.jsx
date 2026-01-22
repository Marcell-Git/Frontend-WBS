import useAxios from './useAxios';

export const loginApi = async (data) => {
  const response = await useAxios.post('/login', data);
  return response.data;
};

export const logoutApi = async (token) => {
  const res = await useAxios.post(
    '/logout',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const registerApi = async (data) => {
  const response = await useAxios.post('/register', data);
  return response.data;
};
