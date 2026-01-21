import { createContext, useContext, useEffect, useState } from 'react';
import { setAxiosToken } from '../api/useAxios';
import { logoutApi } from '../api/AuthApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setAxiosToken(token);
  }, [token]);

  const login = (newToken, UserData) => {
    setToken(newToken);
    setUser(UserData);
  };

  const logout = async () => {
    try {
      await logoutApi();
    } finally {
      setToken(null);
      setAxiosToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
