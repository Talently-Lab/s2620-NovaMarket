import { createContext, useState } from "react";
import { authService } from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado leyendo directamente el usuario guardado en localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  // Como ya no necesitamos consultar un endpoint externo al iniciar, loading pasa a false de entrada
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    const token = data.token || data.access_token;
    if (token) localStorage.setItem("token", token);

    const userData = data.user || data.usuario || data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario localmente
  };

  const register = async (userDataReq) => {
    const data = await authService.register(userDataReq);

    const token = data.token || data.access_token;
    if (token) localStorage.setItem("token", token);

    const userData = data.user || data.usuario || data;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Guardamos el usuario localmente
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Limpiamos ambos al salir
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};