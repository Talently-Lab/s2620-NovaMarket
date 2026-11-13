import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Agregamos useLocation
import { AuthContext } from "../context/AuthContext";
import { LOGIN_MENSAJES } from "../const/authMessages";

export const useLogin = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));

    if (error) {
      setError((prev) => {
        if (!prev) return null;
        const updatedFields = { ...prev.fields, [name]: false };
        if (!updatedFields.email && !updatedFields.password) return null;
        return { ...prev, fields: updatedFields };
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;
    const currentEmail = (formElement.email?.value ?? credentials.email).trim();
    const currentPassword = (formElement.password?.value ?? credentials.password).trim();

    setCredentials({ email: currentEmail, password: currentPassword });

    if (!currentEmail && !currentPassword) {
      setError({
        message: LOGIN_MENSAJES.incompletos,
        fields: { email: true, password: true },
      });
      return;
    }

    if (!currentEmail) {
      setError({
        message: LOGIN_MENSAJES.emailVacio,
        fields: { email: true, password: false },
      });
      return;
    }

    if (!currentPassword) {
      setError({
        message: LOGIN_MENSAJES.passwordVacio,
        fields: { email: false, password: true },
      });
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      const loggedUser = await login({
        email: currentEmail,
        password: currentPassword,
      });

      if (loggedUser?.role?.toUpperCase() === "ADMIN") {
        navigate("/admin", { replace: true });
      } else {
        const origin = location.state?.from?.pathname || "/";
        navigate(origin, { replace: true });
      }
    } catch (err) {
      const status = err?.response?.status;

      if (!err?.response) {
        setError({
          message: LOGIN_MENSAJES.conexion,
          fields: { email: false, password: false },
        });
      } else if (status === 400 || status === 401) {
        setError({
          message: LOGIN_MENSAJES.credenciales,
          fields: { email: true, password: true },
        });
      } else if (status === 403) {
        setError({
          message: LOGIN_MENSAJES.inactivo,
          fields: { email: false, password: false },
        });
      } else {
        setError({
          message: LOGIN_MENSAJES.servidor,
          fields: { email: false, password: false },
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { credentials, submitting, error, handleChange, handleSubmit };
};