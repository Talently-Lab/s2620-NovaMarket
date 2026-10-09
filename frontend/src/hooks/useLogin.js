import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { login, loading } = useContext(AuthContext);
    const navigate = useNavigate();

    const [credentials, setCredentials] = useState({ email: '', password:'' });
    const [error, setError] = useState(null);

    const handleChange = e => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            await login(credentials);
            navigate('/');
        } catch (error) {
            setError('Credenciales incorrectas');
        }
    };

    return { credentials, loading, error, handleChange, handleSubmit };

}