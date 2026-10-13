import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Mensajes de error según lo que pasó (ver notas en el Figma, fila «S4 · Estados»)
const MENSAJES = {
  credenciales: "No pudimos iniciar sesión. Revisá tu email y tu contraseña e intentá de nuevo.",
  inactivo: "Tu cuenta está inactiva. Escribinos para reactivarla.",
  conexion: "No pudimos conectarnos. Intentá de nuevo en unos minutos.",
  servidor: "Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos.",
};

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  // error = { message, camposInvalidos } | null
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      const status = err?.response?.status;

      if (!err?.response) {
        setError({ message: MENSAJES.conexion, camposInvalidos: false });
      } else if (status === 400 || status === 401) {
        // El servidor responde igual para email o contraseña incorrectos: no se marca cuál es.
        setError({ message: MENSAJES.credenciales, camposInvalidos: true });
      } else if (status === 403) {
        setError({ message: MENSAJES.inactivo, camposInvalidos: false });
      } else {
        setError({ message: MENSAJES.servidor, camposInvalidos: false });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { credentials, submitting, error, handleChange, handleSubmit };
};
