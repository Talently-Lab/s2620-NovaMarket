import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Spinner } from "../components/atoms/Spinner";

export const PrivateRoute = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div
                role="status"
                className="min-h-screen flex flex-col items-center justify-center gap-3 text-primary font-spartan font-bold text-xl"
            >
                <Spinner size={32} className="text-secondary" />
                Cargando sesión...
            </div>
        );
    }

    return user ? <Outlet /> : <Navigate to="/" replace />;
}
