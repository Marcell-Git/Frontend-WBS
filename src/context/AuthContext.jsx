import { createContext, useContext, useEffect, useState } from "react";
import { setAxiosToken } from "../api/useAxios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");
    const expiredAt = localStorage.getItem("expiredAt");

    if (
      savedToken &&
      expiredAt &&
      Date.now() < Number(expiredAt)
    ) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
      setAxiosToken(savedToken);
    }

    setLoading(false);
  }, []);

  const login = (newToken, userData) => {
    const expiredAt = Date.now() + 2 * 60 * 60 * 1000;

    setToken(newToken);
    setUser(userData);
    setAxiosToken(newToken);

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("expiredAt", expiredAt);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setAxiosToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
