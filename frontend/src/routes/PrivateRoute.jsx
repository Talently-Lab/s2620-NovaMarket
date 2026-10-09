import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-primary font-spartan font-bold text-xl">
                Cargando sesión...
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to='/login' replace />
}