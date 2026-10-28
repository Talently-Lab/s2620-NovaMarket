import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { REGISTER_MENSAJES } from '../const/authMessages';

const MIN_PASSWORD = 8;

export const useRegister = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const limpiar = { [name]: undefined };
    if (name === 'password') limpiar.confirmPassword = undefined;

    if (Object.keys(limpiar).some((campo) => fieldErrors[campo])) {
      setFieldErrors((prev) => ({ ...prev, ...limpiar }));
    }
    if (error) setError(null);
  };

  const validar = (datos) => {
    const errores = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!datos.nombre) {
      errores.nombre = REGISTER_MENSAJES.nombreVacio;
    }

    if (!datos.email) {
      errores.email = REGISTER_MENSAJES.emailVacio;
    } else if (!emailRegex.test(datos.email)) {
      errores.email = REGISTER_MENSAJES.emailInvalido;
    }

    if (!datos.password) {
      errores.password = REGISTER_MENSAJES.passwordVacio;
    } else if (datos.password.length < MIN_PASSWORD) {
      errores.password = REGISTER_MENSAJES.passwordCorta(MIN_PASSWORD);
    }

    if (!datos.confirmPassword) {
      errores.confirmPassword = REGISTER_MENSAJES.confirmPasswordVacio;
    } else if (datos.password && datos.password !== datos.confirmPassword) {
      errores.confirmPassword = REGISTER_MENSAJES.passwordNoCoincide;
    }

    return errores;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const formElement = e.currentTarget;
    const datosNormalizados = {
      nombre: (formElement.nombre?.value ?? formData.nombre).trim(),
      email: (formElement.email?.value ?? formData.email).trim(),
      password: (formElement.password?.value ?? formData.password).trim(),
      confirmPassword: (formElement.confirmPassword?.value ?? formData.confirmPassword).trim(),
    };

    setFormData(datosNormalizados);

    const errores = validar(datosNormalizados);
    const cantErrores = Object.keys(errores).length;

    if (cantErrores > 0) {
      setFieldErrors(errores);

      if (!datosNormalizados.nombre && !datosNormalizados.email && !datosNormalizados.password) {
        setError(REGISTER_MENSAJES.incompletos);
      } else if (errores.confirmPassword && !errores.password && !errores.email && !errores.nombre) {
        setError(REGISTER_MENSAJES.passwordNoCoincide);
      } else {
        setError('Por favor, revisá los campos marcados en rojo.');
      }

      return;
    }

    setFieldErrors({});

    try {
      setSubmitting(true);
      const { nombre, email, password } = datosNormalizados;
      await register({ fullName: nombre, email, password });
      navigate('/');
    } catch (err) {
      const status = err?.response?.status;

      if (!err?.response) {
        setError(REGISTER_MENSAJES.conexion);
      } else if (status === 409) {
        setFieldErrors({ email: REGISTER_MENSAJES.emailDuplicado });
        setError('El correo electrónico ya se encuentra registrado.');
      } else if (status === 400) {
        setError(REGISTER_MENSAJES.datosInvalidos);
      } else {
        setError(REGISTER_MENSAJES.servidor);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return { formData, fieldErrors, error, submitting, handleChange, handleSubmit };
};