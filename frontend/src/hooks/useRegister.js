import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const useRegister = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }

    try {
      setLoading(true);
      const { confirmPassword, ...dataToSend } = formData; 
      
      await register(dataToSend);
      navigate('/'); 
    } catch (err) {
      setError('Hubo un error al registrar tu cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, handleChange, handleSubmit };
};