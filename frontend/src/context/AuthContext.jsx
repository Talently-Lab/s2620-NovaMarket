import { createContext, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    const token = data.token || data.access_token;
    if (token) localStorage.setItem("token", token);

    const userData = data.user || data.usuario || data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  const register = async (userDataReq) => {
    const data = await authService.register(userDataReq);

    const token = data.token || data.access_token;
    if (token) localStorage.setItem("token", token);

    const userData = data.user || data.usuario || data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};