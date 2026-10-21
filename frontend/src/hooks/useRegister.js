import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MIN_PASSWORD = 8;

export const useRegister = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const limpiar = { [name]: undefined };
    
    if (name === 'password') limpiar.confirmPassword = undefined;
    if (Object.keys(limpiar).some((campo) => fieldErrors[campo])) {
      setFieldErrors({ ...fieldErrors, ...limpiar });
    }
    if (error) setError(null);
  };

  const validar = () => {
    const errores = {};
    if (formData.password.length < MIN_PASSWORD) {
      errores.password = `Usá al menos ${MIN_PASSWORD} caracteres.`;
    }
    if (formData.password !== formData.confirmPassword) {
      errores.confirmPassword = 'Las contraseñas no coinciden.';
    }
    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errores = validar();
    if (Object.keys(errores).length > 0) {
      setFieldErrors(errores);
      return;
    }
    setFieldErrors({});

    try {
      setSubmitting(true);
      const { nombre, email, password } = formData;
      await register({ fullName: nombre, email, password });
      navigate('/');
    } catch (err) {
      const status = err?.response?.status;

      if (!err?.response) {
        setError('No pudimos conectarnos. Intentá de nuevo en unos minutos.');
      } else if (status === 409) {
        setFieldErrors({ email: 'Este email ya tiene una cuenta. Probá iniciar sesión.' });
      } else if (status === 400) {
        setError('Revisá los datos que cargaste e intentá de nuevo.');
      } else {
        setError('Algo salió mal de nuestro lado. Intentá de nuevo en unos minutos.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, fieldErrors, error, submitting, handleChange, handleSubmit };
};
