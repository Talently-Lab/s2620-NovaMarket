import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            
            if (token) {
                try {
                    const userData = await authService.getMe();
                    setUser(userData);
                } catch (error) {
                    console.error('Token inválido o expirado', error);
                    localStorage.removeItem('token');
                    setUser(null);
                }
            }

            setLoading(false);
        };

        checkAuth();
    }, []);


    const login = async credentials => {
        const data = await authService.login(credentials);
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const register = async userData => {
        const data = await authService.register(userData);
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return(
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );

};